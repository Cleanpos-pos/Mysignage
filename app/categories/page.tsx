import { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Product Categories",
  description:
    "Browse Allsee Technologies digital signage products by category: high brightness displays, outdoor screens, touch screens, video walls, digital posters and media players.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  const categories = getCategories().filter((c) => c.slug !== "all");

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="block p-6 rounded-lg border border-border bg-white hover:shadow-lg hover:border-accent transition-all group"
          >
            <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">
              {cat.name}
            </h2>
            <p className="mt-2 text-muted">
              {cat.count} product{cat.count !== 1 ? "s" : ""}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
