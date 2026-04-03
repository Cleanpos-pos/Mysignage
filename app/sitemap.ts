import { MetadataRoute } from "next";
import { getAllProducts, getCategories } from "@/lib/products";
import { towns } from "@/lib/towns";

const BASE_URL = "https://my-signage.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();
  const categories = getCategories().filter((c) => c.slug !== "all");

  const productEntries = products.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const categoryEntries = categories.map((c) => ({
    url: `${BASE_URL}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const townEntries = towns.map((t) => ({
    url: `${BASE_URL}/digital-signage-in/${t}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...categoryEntries,
    ...productEntries,
    ...townEntries,
  ];
}
