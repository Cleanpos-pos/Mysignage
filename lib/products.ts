import productsData from "@/data/products.json";

export interface Product {
  slug: string;
  url: string;
  title: string;
  description: string;
  keywords: string;
  image: string;
  images: string[];
  price?: string;
  source?: string;
  features: { title: string; text: string }[];
  specifications: { size: string; specs: Record<string, string> }[];
}

export function getAllProducts(): Product[] {
  return productsData as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return (productsData as Product[]).find((p) => p.slug === slug);
}

const categoryDefs = [
  { name: "All Products", slug: "all", filter: () => true },
  { name: "Digital Signage", slug: "digital-signage", filter: (p: Product) => /signage|commercial.*display|advertising/i.test(p.title + p.slug) },
  { name: "High Brightness", slug: "high-brightness", filter: (p: Product) => /high.?bright|sunlight|3500cd|700cd|1000cd|window.?display/i.test(p.title + p.description) },
  { name: "Touch Screen", slug: "touch-screen", filter: (p: Product) => /touch/i.test(p.title) },
  { name: "Interactive Displays", slug: "interactive", filter: (p: Product) => /interactive/i.test(p.title + p.slug) },
  { name: "Digital Posters", slug: "digital-poster", filter: (p: Product) => /poster|freestanding/i.test(p.title) },
  { name: "Video Walls", slug: "video-wall", filter: (p: Product) => /video.?wall/i.test(p.title + p.slug) },
  { name: "Outdoor Displays", slug: "outdoor", filter: (p: Product) => /outdoor/i.test(p.title + p.slug) },
  { name: "Menu Boards", slug: "menu-board", filter: (p: Product) => /menu.?board|menu/i.test(p.title) },
  { name: "Self Service Kiosks", slug: "kiosk", filter: (p: Product) => /kiosk|self.?service|self.?order/i.test(p.title + p.slug) },
  { name: "Media Players", slug: "media-player", filter: (p: Product) => /media.?player/i.test(p.title + p.slug) },
];

export function getCategories(): { name: string; slug: string; count: number }[] {
  const products = getAllProducts();
  return categoryDefs
    .map((c) => ({
      name: c.name,
      slug: c.slug,
      count: c.slug === "all" ? products.length : products.filter(c.filter).length,
    }))
    .filter((c) => c.count > 0);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const products = getAllProducts();
  if (categorySlug === "all") return products;
  const def = categoryDefs.find((c) => c.slug === categorySlug);
  return def ? products.filter(def.filter) : products;
}
