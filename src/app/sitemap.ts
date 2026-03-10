import type { MetadataRoute } from "next";

const BASE_URL = "https://www.ketly.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
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
}

