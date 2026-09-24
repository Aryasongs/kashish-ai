// Kashish AI worker
// Static files (index.html, /about, /leadership, ...) are served automatically from the repo.
// This code only runs when no file matches. It guarantees robots.txt, sitemap.xml and llms.txt
// are always available, even if the files are missing or empty in the deployed assets.

const ROBOTS = "# Kashish AI \u2014 public pages are open to search engines and AI crawlers.\nUser-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: Claude-SearchBot\nAllow: /\n\nUser-agent: Claude-User\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nUser-agent: Applebot-Extended\nAllow: /\n\nSitemap: https://kashishai.com/sitemap.xml\n";
const SITEMAP = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  <url><loc>https://kashishai.com/</loc><priority>1.0</priority></url>\n  <url><loc>https://kashishai.com/about</loc><priority>0.9</priority></url>\n  <url><loc>https://kashishai.com/leadership</loc><priority>0.7</priority></url>\n  <url><loc>https://kashishai.com/domain-acquisition</loc><priority>0.5</priority></url>\n  <url><loc>https://kashishai.com/help</loc><priority>0.6</priority></url>\n</urlset>\n";
const LLMS = "# Kashish AI\n\n> Kashish is an AI companion you can chat with by text, talk to by voice, or just hang out with. It has memory that carries over between conversations, image generation, a code assistant (Codex), plugins, and support for the upcoming Kashish IRIS smart glasses.\n\n## Key facts\n- Plans: Free (chat, voice, image generation with daily limits) and Kashish Pro (unlimited chat and images, priority replies, Kashi 3 / Kashi 4 / Kashi Mars models included).\n- Kashi TY 4.5, the next model, launches 24 October 2026.\n- Kashish IRIS: AI smart glasses with camera, hands-free Kashish AI, calls and notifications. In development, release date not announced. Price $471.99 for your region; pre-book fee $100.\n- Minimum age: 13.\n\n## Links\n- [Home](https://kashishai.com/)\n- [About Kashish AI \u2014 full details](https://kashishai.com/about)\n- [Help Center](https://kashishai.com/help)\n- [Blog](https://blog.kashishai.com)\n- [Leadership \u2014 Gursharn Arya, founder](https://kashishai.com/leadership)\n- [KashishAI.com domain acquisition record](https://kashishai.com/domain-acquisition)\n";

const headers = (type) => ({
  "content-type": type,
  "cache-control": "public, max-age=3600",
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const res = await env.ASSETS.fetch(request);
    if (res.status !== 404) return res;

    switch (url.pathname) {
      case "/robots.txt":
        return new Response(ROBOTS, { headers: headers("text/plain; charset=utf-8") });
      case "/sitemap.xml":
        return new Response(SITEMAP, { headers: headers("application/xml; charset=utf-8") });
      case "/llms.txt":
        return new Response(LLMS, { headers: headers("text/plain; charset=utf-8") });
      default:
        return res;
    }
  },
};
