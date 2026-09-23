import type { BlogPost } from './blog';

// Articles written in English for clients outside Italy (D2 of the SEO plan of 13/09/2026: the Italian posts are
// about the Italian market and are not translated). Prices come from prices.ts and timings from facts.ts; the
// market figures come from MERCATO-prezzi-2026-09-13.md, with their sources named in the text.
export const postsEn: BlogPost[] = [
    {
        slug: 'hiring-a-web-designer-in-italy',
        title: 'Hiring a web designer in Italy: prices and what to expect',
        seoTitle: 'Hiring a Web Designer in Italy: Prices and What to Expect (2026) | Pionio',
        seoDescription:
            'What an independent web designer in Italy costs in 2026, how it compares with the UK, the Netherlands, Germany and the US, and how the work runs in English.',
        excerpt:
            'Starting prices, day rates in the UK, the Netherlands, Germany and the US, and how a project with a designer in Italy runs: calls, time zones, a fixed price, what happens after launch.',
        keywords: [
            'hire web designer italy',
            'web designer italy price',
            'freelance web designer europe',
            'website cost 2026',
            'shopify store price',
        ],
        datePublished: '2026-09-23',
        dateModified: '2026-09-23',
        readingMinutes: 6,
        category: 'Pricing guide',
        sections: [
            {
                type: 'p',
                text: 'If you are in London, Amsterdam or New York and you are looking at a designer in Italy, you want three things straight. What it costs. How it compares with what you would pay at home. Whether the work will run smoothly in English. These are the numbers I use, and where they come from.',
            },
            { type: 'h2', text: 'What I charge' },
            {
                type: 'p',
                text: 'Starting prices for clients outside Italy. The final price and the delivery date are fixed in writing before any work begins.',
            },
            {
                type: 'ul',
                items: [
                    'A new website, five to ten pages: from €4,000. Two to four weeks from the first call to launch.',
                    'A larger site, with many pages or features: from €7,500.',
                    'A Shopify store: from €5,000. Three to five weeks.',
                    'A store built from scratch, without Shopify: from €18,000.',
                    'A redesign, with the move of the old content and the redirects: from €5,000. Three to five weeks.',
                    'A small web app or internal tool: from €15,000. Six to twelve weeks.',
                    'An SEO audit: from €1,200.',
                ],
            },
            { type: 'h2', text: 'What the same work costs elsewhere' },
            {
                type: 'p',
                text: 'A website is mostly days of work, so the fairest comparison is the day rate of an experienced freelancer. The most solid figures I found, all from 2025 and 2026:',
            },
            {
                type: 'ul',
                items: [
                    'United Kingdom: contract web developers, median £488 a day (IT Jobs Watch, six months to September 2026).',
                    'Netherlands: freelance web developers, €73 an hour, about €584 a day (Knab, a survey of more than 20,000 self-employed people).',
                    'Germany: freelance developers, €94 an hour, about €750 a day (freelancermap, 3,210 respondents).',
                    'United States: web design agencies charge $100 to $149 an hour (Clutch).',
                ],
            },
            {
                type: 'p',
                text: 'Priced by the project, most independent designers in the US, the UK and Canada sit between $2,500 and $5,000 for a whole site, and more than half between $2,500 and $9,999 (Web Designer Academy, 2025). That survey is small, and many of those sites start from a template. I draw each site before I build it.',
            },
            { type: 'h2', text: 'Why the price is fixed' },
            {
                type: 'p',
                text: 'I quote a price and a date before starting, and they do not move unless the work does. If you add a section halfway through, I tell you what it costs before I build it. After launch, 30 days of fixes are included.',
            },
            { type: 'h2', text: 'How the work runs in English' },
            {
                type: 'ul',
                items: [
                    'Calls in English, on European hours. From Bologna I share the whole working day with London and Amsterdam, and your morning if you are on the US East Coast.',
                    'One person from the first drawing to the last line of code. You talk to whoever builds the site.',
                    'I reply within 24 hours.',
                    'One site at a time. While I work on yours, I am not juggling ten others.',
                ],
            },
            { type: 'h2', text: 'What to check before hiring anyone, me included' },
            {
                type: 'ol',
                items: [
                    'Ask to see a live project, not only screenshots, and open it on your phone.',
                    'Ask what happens after launch: who fixes things, for how long, at what cost.',
                    'Ask who will own the domain and the accounts. It should be you.',
                    'Ask for the price and the date in writing before any work starts.',
                ],
            },
            {
                type: 'callout',
                title: 'A real example',
                text: 'Smoky Candle is my own brand of soy candles. In September 2026 I rebuilt its shop around a 3D candle you open, light and blow out, with a working Stripe checkout. The case study, with the numbers, is at pionio.it/en/projects/smoky-candle.',
            },
        ],
    },
    {
        slug: '3d-product-on-a-phone',
        title: 'A 3D product on a phone: what it costs and what breaks',
        seoTitle: 'A 3D Product on a Phone: What It Costs and What Breaks | Pionio',
        seoDescription:
            'Notes from putting a WebGL candle on an online shop: the speed it costs, why it shook on iPhone, what Safari does differently, sound, and the fixes that worked.',
        excerpt:
            'I put a WebGL candle on my own shop. What it cost in speed, what broke on iPhone, and how I fixed each thing.',
        keywords: [
            'webgl on mobile',
            'three.js iphone performance',
            'react three fiber scroll',
            '3d product page',
            'web audio safari',
        ],
        datePublished: '2026-09-23',
        dateModified: '2026-09-23',
        readingMinutes: 7,
        category: 'From the workshop',
        sections: [
            {
                type: 'p',
                text: 'In September 2026 I rebuilt the shop of Smoky Candle, my own brand of soy candles, around a 3D candle. You open its box, unscrew the cap, light it and blow it out, and it stays with you down the page. Most of the work went into making it right on a phone. These are the notes.',
            },
            { type: 'h2', text: 'What it costs in speed' },
            {
                type: 'p',
                text: 'The old static page scored 92 for performance in the Lighthouse mobile test. With the 3D, a first run over a slow connection came in at 59. After the fixes below it sits around 78 in the lab. Accessibility, best practices and SEO are at 100.',
            },
            {
                type: 'p',
                text: 'Most of that cost is the engine. three.js and the scene weigh about 250 KB compressed, and preparing the scene takes around half a second of a phone’s processor. That does not go away. What you can choose is when it happens.',
            },
            {
                type: 'ul',
                items: [
                    'Load the 3D after the page. Text and buttons arrive first and work straight away, then the candle fades in.',
                    'Check what your helpers bring along. A ready-made lighting component carried readers for HDR and EXR images I never used. Replacing it, and two other small helpers, with a few lines of my own took the 3D file from about 280 to about 257 KB compressed.',
                ],
            },
            { type: 'h2', text: 'Why the candle shook on iPhone' },
            {
                type: 'p',
                text: 'The candle lived in a canvas fixed to the screen, and on every frame it read where each section of the page was and followed it. On iOS the page scrolls on one thread and the drawing happens on another, so the candle always landed one frame late. At 60 frames per second, it still shook.',
            },
            {
                type: 'p',
                text: 'The fix was to stop following. On phones the canvas now sits inside the section it belongs to, and Safari scrolls it with the page like any other element. Two details made it work:',
            },
            {
                type: 'ul',
                items: [
                    'The canvas has the same size in every section. Resizing a WebGL canvas empties it for a frame, and you see the flash.',
                    'It moves to the next section before that section comes on screen, and leaves a still photo of the candle in the one it leaves.',
                ],
            },
            { type: 'h2', text: 'What Safari does differently' },
            {
                type: 'ul',
                items: [
                    'It ignores filters on a 2D canvas. I turned the logo on the box grey with a canvas filter, and on iPhone it came out gold. Now the grey logo is an image made in advance.',
                    'Building that image in the browser was slow anyway: a 4096-pixel texture, processed pixel by pixel. On a phone the box arrived after the candle and snapped onto it. A ready image loads far sooner, and the candle only fades in once everything is there.',
                ],
            },
            { type: 'h2', text: 'Sound needs a real tap' },
            {
                type: 'p',
                text: 'The candle crackles, the box pops, the cap clicks. All of it is generated with the Web Audio API, with no audio files. But browsers only play sound after a real gesture: a tap, a click, a key. Scrolling does not count, with a finger or with a wheel.',
            },
            {
                type: 'ul',
                items: [
                    'Try to unlock the audio on every gesture until it works, not only on the first one. On a phone the first touch is usually the start of a scroll, and that one does not count.',
                    'On Safari, play a silent sound inside the gesture. That is what opens the audio.',
                    'Keep a visible button to turn the sound on. Someone who only scrolls has no other way in.',
                ],
            },
            { type: 'h2', text: 'Follow the scroll with a spring, but never the position' },
            {
                type: 'p',
                text: 'A mouse wheel scrolls in steps of about 100 pixels. If a rotation or a closing lid follows the scroll exactly, each step becomes a jump. I let those values chase the scroll with a spring of about a tenth of a second. The position of the candle on the page never gets a spring: that would bring the shaking back.',
            },
            {
                type: 'callout',
                title: 'The case study',
                text: 'Screenshots, numbers and the whole story of Smoky Candle are at pionio.it/en/projects/smoky-candle.',
            },
        ],
    },
];
