import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getProductsByCategory } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export function generateStaticParams() {
  return getCategories()
    .filter((c) => c.slug !== "all")
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategories().find((c) => c.slug === slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.name} Displays & Solutions`,
    description: `Browse ${category.count} ${category.name.toLowerCase()} products at My-Signage.com. Commercial-grade digital display solutions from leading manufacturers.`,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategories().find((c) => c.slug === slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  return (
    <>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-muted">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-accent">
              Products
            </Link>
          </li>
          <li className="text-border">/</li>
          <li className="text-foreground">{category.name}</li>
        </ol>
      </nav>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-muted mb-8">
          {products.length} product{products.length !== 1 ? "s" : ""} in this
          category
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {getCategories().map((cat) => (
            <Link
              key={cat.slug}
              href={cat.slug === "all" ? "/" : `/category/${cat.slug}`}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                cat.slug === slug
                  ? "bg-accent text-white border-accent"
                  : "bg-card-bg border-border text-foreground hover:bg-accent hover:text-white hover:border-accent"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
