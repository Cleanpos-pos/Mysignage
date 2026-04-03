import { Metadata } from "next";
import Link from "next/link";
import { getAllProducts, getCategories } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "My-Signage.com - Premium Digital Signage Solutions & Displays",
  description:
    "Explore 79+ commercial digital signage products. High brightness displays, interactive touch screens, video walls, outdoor signage, digital posters and media players for business.",
  alternates: { canonical: "/" },
};

const STATS = [
  { label: "Products", value: "79+" },
  { label: "Categories", value: "10" },
  { label: "Display Sizes", value: '10"–98"' },
  { label: "Max Brightness", value: "3,500 cd/m\u00B2" },
];

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: "High Brightness",
    text: "Sunlight-readable displays up to 3,500 cd/m\u00B2 for window-facing and outdoor environments",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: "Interactive Touch",
    text: "PCAP and infrared touch screens from 10\" to 86\" with multi-touch support for engaging experiences",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
      </svg>
    ),
    title: "Video Walls",
    text: "DV-LED and ultra-narrow bezel LCD video walls for stunning large-format visual impact",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: "Weatherproof Outdoor",
    text: "IP-rated waterproof displays and A-boards built for year-round outdoor use in any conditions",
  },
];

export default function HomePage() {
  const products = getAllProducts();
  const categories = getCategories();
  const featuredProducts = products.filter((p) => p.image && p.features.length > 3).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800" />
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-blue-100 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
            {products.length} Commercial-Grade Products Available
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Digital Signage
            <br />
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Discover the perfect digital display for your business. From
            high-brightness window displays to interactive kiosks, we have the
            solution you need.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#products"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-blue-700 font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg shadow-blue-900/20"
            >
              Browse Products
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              View Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-10 z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 text-center shadow-lg border border-border"
            >
              <div className="text-2xl sm:text-3xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Solutions for Every Environment
          </h2>
          <p className="mt-3 text-muted text-lg max-w-2xl mx-auto">
            Commercial-grade digital signage designed for demanding applications
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feat) => (
            <div
              key={feat.title}
              className="text-center p-6 rounded-xl bg-card-bg border border-border hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 mx-auto rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4">
                {feat.icon}
              </div>
              <h3 className="font-semibold text-lg">{feat.title}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {feat.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Pills */}
      <section className="bg-card-bg border-y border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug === "all" ? "#products" : `/category/${cat.slug}`}
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-white border border-border text-foreground hover:bg-accent hover:text-white hover:border-accent transition-all shadow-sm hover:shadow-md"
              >
                {cat.name}
                <span className="ml-2 text-xs opacity-60">({cat.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="mt-1 text-muted">Our most popular display solutions</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* All Products */}
      <section
        id="products"
        className="bg-card-bg border-t border-border py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">All Products</h2>
              <p className="mt-1 text-muted">
                Browse our complete range of {products.length} digital signage
                solutions
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Need Help Choosing?
          </h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            With over 79 products across multiple categories, finding the right
            digital signage solution has never been easier. Browse by category or
            explore our full range.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:bg-accent-dark transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
