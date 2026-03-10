import type { MetadataRoute } from "next";
import { USE_CASE_ARTICLES } from "@/content/useCases";

const BASE_URL = "https://www.ketly.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/vyon`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const useCaseEntries: MetadataRoute.Sitemap = USE_CASE_ARTICLES.map(
    (article) => ({
      url: `${BASE_URL}/use-cases/${article.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [...staticEntries, ...useCaseEntries];
}

