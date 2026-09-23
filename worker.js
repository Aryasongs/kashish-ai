export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (
      url.pathname === "/domain-acquisition" ||
      url.pathname === "/domain-acquisition/"
    ) {
      url.pathname = "/domain-acquisition.html";
    }

    return env.ASSETS.fetch(new Request(url, request));
  }
};
