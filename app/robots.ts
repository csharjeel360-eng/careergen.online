import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/"],
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "Google-Extended", "CCBot", "OAI-SearchBot", "PerplexityBot", "Amazonbot", "Anthropic-AI"],
        allow: "/",
      },
    ],
    sitemap: "https://careergen.online/sitemap.xml",
    host: "https://careergen.online",
  };
}
