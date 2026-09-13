// English copy for the service pages that have an English twin, keyed by the Italian slug.
// Prices and timings must match src/lib/prices.ts and src/lib/facts.ts.
export type ServiceCopy = {
    slug: string; // English URL slug
    title: string; // short service name, e.g. "Web design"
    h1: string;
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
    intro: string;
    paragraphs: string[]; // 2–3
    includes: { title: string; description: string }[]; // 5–6
    process: { step: string; title: string; description: string }[]; // steps "01".."05"
    faq: { q: string; a: string }[]; // 4–5, include price and timing questions with the facts above
    pricingNote: string; // one line, e.g. "From €4,000 for a website, from €7,500 with many pages."
    ctaTitle: string;
    ctaCopy: string;
};

export const servicesEn: Record<string, ServiceCopy> = {
    'web-design': {
        slug: 'web-design',
        title: 'Web design',
        h1: 'Freelance web designer in Italy: I design your site, then I code it',
        seoTitle: 'Freelance web designer in Italy, sites from €4,000 | Pionio',
        seoDescription:
            'I design your site, then code it myself, down to the last line. Phone-first, readable by Google from launch day, live in 2–4 weeks.',
        keywords: [
            'freelance web designer',
            'web designer in Italy',
            'hire a freelance web designer',
            'website design and development',
            'independent web designer Europe',
            'web designer who codes',
            'small business website design',
        ],
        intro:
            'I design websites, then I build them in code myself. From the first call to launch day you deal with one person: whoever chose the typeface also writes the page that uses it. A website starts from €4,000 and takes 2–4 weeks from first call to launch.',
        paragraphs: [
            'I work remotely from Bologna with brands, studios and small companies, wherever they are. Every project starts with a conversation about who you are, who visits your site and what you want them to do next. The layout comes out of those answers, shaped around the words and photos you really have.',
            "I design for the phone first, because many visitors will meet your site on a small screen, then I widen it for laptops and large monitors. Type, spacing and colour get the same attention as the code underneath: light pages, clean structure, titles and descriptions Google can read from launch day.",
            'I use AI every day, but I make the calls: it executes, I decide what goes on the page, how it looks and what ships. When the work is done, the code, the domain and the accounts belong to you.',
        ],
        includes: [
            {
                title: 'A visual system',
                description:
                    'Colours, type, icons and spacing rules drawn from your brand and used the same way on every page.',
            },
            {
                title: 'An original layout',
                description:
                    'Wireframes and design built for your content, so nothing gets squeezed into a template made for someone else.',
            },
            {
                title: 'Phone first',
                description: 'Each page designed for a small screen first, then adapted to tablets and desktops.',
            },
            {
                title: 'Light motion',
                description:
                    'Hover states and small transitions that make the site feel alive without slowing it down.',
            },
            {
                title: 'Basic accessibility',
                description:
                    'Readable contrast, sensible text sizes and a semantic structure that follows the WCAG guidelines.',
            },
            {
                title: 'Code, or a Figma file',
                description:
                    'Usually I build the site myself. If you have your own developers, I can hand them an organised Figma file instead.',
            },
        ],
        process: [
            {
                step: '01',
                title: 'First call',
                description:
                    'A free 30-minute call, in English, at an hour that works for Europe. You tell me about the brand, the audience and what is not working today.',
            },
            {
                step: '02',
                title: 'Direction',
                description:
                    'Moodboard, references, type and colour choices. You approve the direction before I design a single page.',
            },
            {
                step: '03',
                title: 'Design',
                description:
                    'The home page first, then the inner pages, in Figma. Short rounds of feedback with clear notes on what changes.',
            },
            {
                step: '04',
                title: 'Build',
                description:
                    'I write the site in code and put it on a preview link you can open on any device. If your team builds it, they get the Figma file with notes.',
            },
            {
                step: '05',
                title: 'Launch and support',
                description:
                    'Publishing, basic SEO checks and a short walkthrough on updating your content. Then 30 days of support after launch.',
            },
        ],
        faq: [
            {
                q: 'How much does a website cost?',
                a: 'A website starts from €4,000. A site with many pages or custom features starts from €7,500. These are starting prices: I fix the real price with you before work starts, and after that it does not move.',
            },
            {
                q: 'How long does it take?',
                a: '2–4 weeks from the first call to launch. What speeds it up most is having texts and photos ready, and feedback that comes back quickly.',
            },
            {
                q: 'Do you work with clients outside Italy?',
                a: 'Yes. I always work remotely, from Bologna. Calls are in English, at hours that work for Europe, and I reply to every enquiry within 24 hours.',
            },
            {
                q: 'Who will I be talking to?',
                a: 'Me. Pionio is one person, so you always talk to whoever is actually designing and building your site, with nobody in between.',
            },
            {
                q: 'What happens after launch?',
                a: '30 days of support are included. The code, the domain and the accounts belong to you, so you can keep working with me or take the site anywhere.',
            },
        ],
        pricingNote: 'From €4,000 for a website, from €7,500 with many pages or custom features.',
        ctaTitle: 'Planning a new website?',
        ctaCopy:
            'Tell me about your brand and what the site needs to do. I reply within 24 hours with a realistic estimate and the next steps. The first call is free.',
    },

    ecommerce: {
        slug: 'shopify-store',
        title: 'Shopify store',
        h1: 'Shopify store design and build: ready to sell, fast on a phone',
        seoTitle: 'Shopify store design and build from €5,000 | Pionio',
        seoDescription:
            'A Shopify store ready to sell: clear product pages, cards, Apple Pay, Google Pay and PayPal, fast on a phone. Built from scratch: from €18,000.',
        keywords: [
            'shopify store design',
            'shopify developer freelance',
            'build a shopify store',
            'shopify web designer Europe',
            'online shop development',
            'ecommerce website design',
            'headless ecommerce',
        ],
        intro:
            'An online shop has one job: take someone who arrived from an ad or from Google all the way to the payment page, with as few reasons to leave as possible. I design and build Shopify stores that do that, starting from €5,000.',
        paragraphs: [
            'I build stores for small brands, makers and shops that want to sell online properly. Before choosing anything I want to know what you sell, to whom, and how many orders you expect. For most shops the answer is Shopify: quick to launch, solid, and easy to run day to day without calling me.',
            "When a shop needs something Shopify can't do well, like an unusual buying flow or very high volumes, I build it from scratch: my own front end, a separate commerce engine and Stripe for payments. That starts from €18,000, and it only makes sense past a certain size.",
            'Whatever the platform, the same things get my attention: product pages that answer questions before they are asked, a short checkout, a clear cart, shipping rules set up correctly, conversion tracking and pages that load fast on a phone.',
        ],
        includes: [
            {
                title: 'Platform choice',
                description:
                    'A look at your catalogue, volumes and margins to decide between Shopify and a store built from scratch.',
            },
            {
                title: 'Product pages',
                description:
                    'Photos, details, shipping, returns and common questions answered on the page, so buyers have fewer reasons to hesitate.',
            },
            {
                title: 'Checkout and payments',
                description:
                    'Card, Apple Pay, Google Pay and PayPal, clear error messages and abandoned cart emails.',
            },
            {
                title: 'SEO for shops',
                description:
                    'Titles, meta descriptions, Product structured data, an up-to-date sitemap and redirects where they are needed.',
            },
            {
                title: 'Fast on a phone',
                description: 'Images in AVIF or WebP, lazy loading and a Core Web Vitals check before launch.',
            },
            {
                title: 'Integrations',
                description:
                    'Google Analytics, Meta Pixel, Klaviyo or Mailchimp, the Google Shopping feed and shipping tools.',
            },
        ],
        process: [
            {
                step: '01',
                title: 'First call',
                description:
                    'A free 30-minute call about your catalogue, prices, margins, customers and where they come from. The technical and design choices follow from this.',
            },
            {
                step: '02',
                title: 'Plan',
                description:
                    'Platform, page map, payment methods and marketing tools. You get a fixed price and a timeline before any work starts.',
            },
            {
                step: '03',
                title: 'Design and build',
                description:
                    'Product pages, cart, checkout and the rest of the site, designed and built together on a preview link.',
            },
            {
                step: '04',
                title: 'Real tests',
                description:
                    'Test purchases with every payment method, a check of every order email, and returns handled from start to finish.',
            },
            {
                step: '05',
                title: 'Launch',
                description:
                    'Going live, watching the first orders and conversions, then 30 days of support to fix whatever real customers turn up.',
            },
        ],
        faq: [
            {
                q: 'How much does a Shopify store cost?',
                a: 'A Shopify store starts from €5,000. An online shop built from scratch starts from €18,000. These are starting prices: the real one depends on products, integrations and custom pages, and I fix it with you before work starts. After that it does not move.',
            },
            {
                q: 'How long does it take?',
                a: 'A Shopify store takes 3–5 weeks, depending on how complex it is. The number of products, the integrations and any custom pages all count.',
            },
            {
                q: 'Shopify or a store built from scratch?',
                a: "For most shops, Shopify. A store built from scratch makes sense when you need a buying experience a theme can't give you, or when Shopify fees start to weigh on your margins.",
            },
            {
                q: 'Can you move my shop from WooCommerce or Magento?',
                a: 'Yes. Products, customers and orders come across in a controlled import, and 301 redirects keep pointing visitors from the old addresses to the new pages.',
            },
            {
                q: 'Do you run ads too?',
                a: "No. I set up the technical side: tracking, the Google Shopping feed and email tools. The campaigns stay with you or whoever handles your marketing.",
            },
        ],
        pricingNote: 'From €5,000 for a Shopify store, from €18,000 for an online shop built from scratch.',
        ctaTitle: 'Ready to sell online?',
        ctaCopy:
            "Tell me what you sell and where you want to take it. I reply within 24 hours with the setup I would use and a clear plan, without selling you tools you don't need.",
    },

    'applicazioni-web': {
        slug: 'web-apps',
        title: 'Web apps',
        h1: 'Web apps and internal tools for the work you still do by hand',
        seoTitle: 'Custom web apps and internal tools from €15,000 | Pionio',
        seoDescription:
            'I turn work you do by hand into a tool people actually use: a prototype first, then the code. Logins, database and backups included. 6–12 weeks.',
        keywords: [
            'custom web app development',
            'internal tools development',
            'freelance web app developer',
            'mvp development',
            'custom dashboard',
            'replace spreadsheets with an app',
            'react developer Europe',
        ],
        intro:
            "A web app is a work tool. It should save hours, cut mistakes and show you data you can't see today. I build them for teams that have outgrown spreadsheets and off-the-shelf software, starting from what you do by hand right now.",
        paragraphs: [
            'The projects vary: a first version of a product to put in front of real users, an internal dashboard that pulls together data scattered across a dozen spreadsheets, a light management tool to replace old software nobody likes using.',
            'Most of the work happens before the code. I need to understand how the people who will use the tool actually work: the three things they repeat a hundred times a day, and how each one could become a click. So every project starts with their routine and ends with them testing the result.',
            'On the technical side I use React and TypeScript, with a back end sized to the project: Supabase to move fast, Node.js or serverless functions when more control is needed. Logins, permissions, the database and backups are part of the first version. No over-engineering, and no shortcuts that break the first time a serious customer shows up.',
        ],
        includes: [
            {
                title: 'Mapping the work',
                description:
                    'I go through the process the tool has to replace and write down every step, including the ones nobody mentions.',
            },
            {
                title: 'A prototype to try',
                description: 'Before any code, a clickable prototype in Figma that the real users can test.',
            },
            {
                title: 'A responsive front end',
                description:
                    'Fast screens with instant feedback on every action and clear handling of errors and empty states.',
            },
            {
                title: 'A solid back end',
                description:
                    'An API, logins and permissions, a relational database where it fits, and backups from the start.',
            },
            {
                title: 'Tests and monitoring',
                description: 'Automated tests on the critical flows and error monitoring in production with Sentry.',
            },
            {
                title: 'Short iterations',
                description:
                    'Regular demos, a preview for every feature, and room to change priorities along the way.',
            },
        ],
        process: [
            {
                step: '01',
                title: 'Discovery',
                description:
                    'A free 30-minute first call, then conversations with the people who will use the tool and a map of how the work gets done today.',
            },
            {
                step: '02',
                title: 'Prototype',
                description:
                    'Wireframes and a clickable Figma prototype, tried by 3–5 real users before I write any code.',
            },
            {
                step: '03',
                title: 'First version',
                description:
                    'The essential features, built and running for real, with logins, database and backups in place.',
            },
            {
                step: '04',
                title: 'Iterations',
                description:
                    'Short feedback cycles, data on how the tool is actually used, priorities reviewed every two weeks.',
            },
            {
                step: '05',
                title: 'Growth',
                description:
                    'As more people use it: performance work, monitoring and tighter security. The first 30 days after launch are covered by support.',
            },
        ],
        faq: [
            {
                q: 'How much does a web app cost?',
                a: 'A first version that people actually use starts from €15,000. That is a starting price: once I understand the work the tool has to do, I fix the real price with you before work starts, and it does not move.',
            },
            {
                q: 'How long does the first version take?',
                a: '6–12 weeks. Anything much shorter usually ends up as a form on a landing page with nothing working behind it.',
            },
            {
                q: 'Do you also handle the back end and the database?',
                a: 'Yes, from the database to the screens. Pionio is one person, so whoever designs the interface also writes the code behind it, and you always talk to that person.',
            },
            {
                q: 'Can you work with my existing team?',
                a: 'Yes. I can join a team that already exists as the front-end or full-stack developer, with calls in English at hours that work for Europe.',
            },
            {
                q: 'Who owns the code?',
                a: 'You do. The code, the domain and the accounts belong to you. After launch you get 30 days of support, and you are free to keep working with me or with anyone else.',
            },
        ],
        pricingNote: 'From €15,000 for a first version people actually use, in 6–12 weeks.',
        ctaTitle: 'Doing something by hand that a tool could do?',
        ctaCopy:
            "Send me a description of the work you do by hand today, even a rough one. I reply within 24 hours, and if it makes sense I'll set up a free 30-minute call.",
    },

    'rifacimento-sito-bologna': {
        slug: 'website-redesign',
        title: 'Website redesign',
        h1: 'Redesign your website without losing what already works',
        seoTitle: 'Website redesign without losing your Google pages | Pionio',
        seoDescription:
            'I rebuild your site without losing the pages Google already knows: audit, content migration, redirects, domain and email sorted. From €5,000.',
        keywords: [
            'website redesign',
            'redesign my website',
            'website redesign without losing SEO',
            'website migration 301 redirects',
            'rebuild an old website',
            'freelance website redesign',
            'website relaunch',
        ],
        intro:
            'An old site works against you: slow on a phone, hard to find on Google, full of information that is out of date. A redesign keeps what still brings in enquiries and rebuilds the rest. It starts from €5,000.',
        paragraphs: [
            'I work with companies, studios and professionals who already have a site and have stopped liking it. I never start from a blank page. First I find out what still works, like the pages that rank, the content people read and the forms that bring in enquiries, and what is holding the site back. The plan comes out of that.',
            'Migration is where most redesigns go wrong: pages moved without redirects, URLs changed at random, years of Google rankings thrown away in an afternoon. Every redesign I deliver starts with an inventory of your current URLs and includes a full map of 301 redirects from old to new, an indexing check after launch and a clean move of domain and email.',
            'It does not matter who built the old site. I recover access to the domain, hosting and mailboxes, and rebuild whatever is missing. By the end, the code, the domain and the accounts belong to you.',
        ],
        includes: [
            {
                title: 'Audit of the current site',
                description:
                    'What ranks, what gets read, where enquiries come from. The rebuild starts knowing what to keep.',
            },
            {
                title: 'URL inventory',
                description:
                    'Every address on the old site listed before anything moves, so no page Google knows gets forgotten.',
            },
            {
                title: 'New design, content migrated',
                description:
                    'A layout rethought for phones and for people reading in a hurry. Good text and photos come across, the rest gets rewritten.',
            },
            {
                title: 'Complete 301 redirects',
                description:
                    'Each old URL points to the right new page, so the rankings the site has built up have somewhere to go.',
            },
            {
                title: 'On-page SEO rebuilt',
                description: 'Titles, meta descriptions, heading structure, sitemap and structured data, page by page.',
            },
            {
                title: 'Domain, email and logins sorted',
                description:
                    'A clean takeover even if someone else built the old site: access recovered, hosting and mailboxes in order.',
            },
        ],
        process: [
            {
                step: '01',
                title: 'Audit',
                description:
                    'It starts with a free 30-minute call. Then a full crawl of the current site, traffic data if you have it, and a list of what works and what has to change.',
            },
            {
                step: '02',
                title: 'Plan and price',
                description:
                    'The new page map, what gets migrated and what gets rewritten, a fixed price and a realistic timeline.',
            },
            {
                step: '03',
                title: 'Design and build',
                description:
                    'The new site takes shape on a preview link you can open whenever you like, on any device.',
            },
            {
                step: '04',
                title: 'Migration and redirects',
                description:
                    'Content moved, 301 redirects live, and a check that Google finds the new site without surprises.',
            },
            {
                step: '05',
                title: 'Launch and follow-up',
                description:
                    'Going live, watching indexing in the weeks after, instructions for updating content and 30 days of support.',
            },
        ],
        faq: [
            {
                q: 'How much does a website redesign cost?',
                a: 'A redesign with content migration and redirects starts from €5,000. That is a starting price: I fix the real one with you before work starts, and after that it does not move.',
            },
            {
                q: 'How long does it take?',
                a: '3–5 weeks, depending on how complex the job is: how many pages there are, how much content moves across and what state the old site is in.',
            },
            {
                q: 'Will I lose my Google rankings?',
                a: 'That is the risk every redesign has to manage, and redirects are how I manage it: every old URL points to the right new page, the new sitemap goes to Google, and I check indexing in the weeks after launch. It is the part I take most care over, because nobody notices it until it goes wrong.',
            },
            {
                q: 'Someone else built my current site. Is that a problem?',
                a: 'No, that is the usual situation. I recover access to the domain, hosting and email, and rebuild whatever is missing.',
            },
            {
                q: 'Do you work with companies outside Italy?',
                a: 'Yes. I work remotely from Bologna, calls are in English at hours that work for Europe, and I reply to every enquiry within 24 hours. You always talk to me, the person doing the work.',
            },
        ],
        pricingNote: 'From €5,000 for a redesign, content migration and redirects included.',
        ctaTitle: 'Does your site need a redesign?',
        ctaCopy:
            'Send me the link to your current site and two lines on what bothers you. I look at it and reply within 24 hours with an honest opinion: sometimes it needs rebuilding, sometimes fixing it is enough.',
    },
};
