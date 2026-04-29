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

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const isValidEmail = (s: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    return new Response(
      JSON.stringify({ ok: false, error: "Notification not configured" }),
      { status: 503, headers: { "content-type": "application/json" } },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const nome = (payload.nome || "").trim();
  const email = (payload.email || "").trim();

  if (!nome || !email) {
    return new Response(
      JSON.stringify({ ok: false, error: "Nome ed email sono obbligatori" }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }
  if (!isValidEmail(email)) {
    return new Response(
      JSON.stringify({ ok: false, error: "Email non valida" }),
      { status: 400, headers: { "content-type": "application/json" } },
    );
  }

  const subject = `Nuovo contatto Portfolio - ${nome}`;
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
        ${row("Nome", payload.nome)}
        ${row("Email", payload.email)}
        ${row("Tipo di progetto", payload.tipo_progetto ?? null)}
        ${row("Budget", payload.budget ?? null)}
        ${row("Messaggio", payload.messaggio ?? null)}
        ${row("Come ti ha trovato", payload.come_trovato ?? null)}
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
    return new Response(
      JSON.stringify({ ok: false, status: resp.status, detail }),
      { status: 502, headers: { "content-type": "application/json" } },
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
