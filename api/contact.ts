declare const process: { env: Record<string, string | undefined> };

export const config = { runtime: "edge" };

type ContactPayload = {
  nome?: string;
  email?: string;
  tipo_progetto?: string | null;
  budget?: string | null;
  messaggio?: string | null;
  come_trovato?: string | null;
};

const MAX_LENGTHS = {
  nome: 100,
  email: 254,
  tipo_progetto: 100,
  budget: 100,
  messaggio: 5000,
  come_trovato: 200,
} as const;

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitStore = new Map<string, number[]>();

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const recent = (rateLimitStore.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(ip, recent);
    return false;
  }
  recent.push(now);
  rateLimitStore.set(ip, recent);

  if (rateLimitStore.size > 1000) {
    for (const [key, value] of rateLimitStore) {
      const fresh = value.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (fresh.length === 0) rateLimitStore.delete(key);
      else rateLimitStore.set(key, fresh);
    }
  }
  return true;
};

const getClientIp = (req: Request): string => {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
};

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const isValidEmail = (s: string) =>
  s.length <= MAX_LENGTHS.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const json = (status: number, body: unknown, extraHeaders: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...extraHeaders },
  });

const row = (label: string, value: string | null | undefined) => {
  const display =
    value && value.trim()
      ? escapeHtml(value).replace(/\n/g, "<br />")
      : "—";
  return `
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid #27272a;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#71717a;width:180px;vertical-align:top;font-family:'SF Mono','Menlo',monospace;">${escapeHtml(label)}</td>
      <td style="padding:14px 20px;border-bottom:1px solid #27272a;font-size:15px;color:#fafafa;line-height:1.55;">${display}</td>
    </tr>`;
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return json(415, { ok: false, error: "Unsupported Media Type" });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return json(429, { ok: false, error: "Too many requests" }, { "retry-after": "60" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    return json(503, { ok: false, error: "Notification not configured" });
  }

  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }

  if (!payload || typeof payload !== "object") {
    return json(400, { ok: false, error: "Invalid payload" });
  }

  const nome = (payload.nome || "").trim();
  const email = (payload.email || "").trim();
  const messaggio = (payload.messaggio || "").trim();
  const tipo_progetto = (payload.tipo_progetto || "").trim();
  const budget = (payload.budget || "").trim();
  const come_trovato = (payload.come_trovato || "").trim();

  if (!nome || !email) {
    return json(400, { ok: false, error: "Nome ed email sono obbligatori" });
  }
  if (
    nome.length > MAX_LENGTHS.nome ||
    email.length > MAX_LENGTHS.email ||
    messaggio.length > MAX_LENGTHS.messaggio ||
    tipo_progetto.length > MAX_LENGTHS.tipo_progetto ||
    budget.length > MAX_LENGTHS.budget ||
    come_trovato.length > MAX_LENGTHS.come_trovato
  ) {
    return json(400, { ok: false, error: "Campi troppo lunghi" });
  }
  if (!isValidEmail(email)) {
    return json(400, { ok: false, error: "Email non valida" });
  }

  const safeNome = nome.replace(/[\r\n]+/g, " ");
  const subject = `Nuovo contatto Portfolio - ${safeNome}`;
  const timestamp = new Date().toLocaleString("it-IT", {
    timeZone: "Europe/Rome",
    dateStyle: "long",
    timeStyle: "short",
  });

  const html = `<!doctype html>
<html lang="it">
  <body style="margin:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#fafafa;">
    <div style="max-width:600px;margin:32px auto;background:#18181b;border:1px solid #27272a;border-radius:18px;overflow:hidden;">
      <div style="padding:28px 32px;background:linear-gradient(135deg,#0c1f18 0%,#18181b 100%);border-bottom:1px solid #27272a;">
        <p style="margin:0;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#7cae8e;font-family:'SF Mono','Menlo',monospace;">PIONIO · Portfolio</p>
        <h1 style="margin:10px 0 0 0;font-size:22px;font-weight:500;letter-spacing:-0.01em;color:#fafafa;">Nuovo contatto dal sito</h1>
      </div>
      <table role="presentation" style="width:100%;border-collapse:collapse;background:#18181b;">
        ${row("Nome", nome)}
        ${row("Email", email)}
        ${row("Tipo di progetto", tipo_progetto)}
        ${row("Budget", budget)}
        ${row("Messaggio", messaggio)}
        ${row("Come ti ha trovato", come_trovato)}
        ${row("Ricevuto", timestamp)}
      </table>
      <div style="padding:18px 32px;background:#0a0a0b;color:#52525b;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;font-family:'SF Mono','Menlo',monospace;border-top:1px solid #27272a;">
        Notifica automatica · portfolio_contact
      </div>
    </div>
  </body>
</html>`;

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "PIONIO Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject,
      html,
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text();
    console.error("Resend error", { status: resp.status, detail });
    return json(502, { ok: false, error: "send_failed" });
  }

  return json(200, { ok: true });
}
