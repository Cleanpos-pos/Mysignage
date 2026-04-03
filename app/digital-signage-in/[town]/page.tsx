import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { towns, townSlugToName, popularTowns } from "@/lib/towns";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { EnquiryForm } from "@/components/enquiry-form";

export function generateStaticParams() {
  return towns.map((t) => ({ town: t }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ town: string }>;
}): Promise<Metadata> {
  const { town } = await params;
  if (!towns.includes(town)) return { title: "Not Found" };
  const name = townSlugToName(town);

  return {
    title: `Digital Signage in ${name} — Commercial Displays & Solutions`,
    description: `Find commercial digital signage solutions in ${name}. High brightness window displays, touch screens, video walls, digital posters & menu boards. Free quotes for ${name} businesses.`,
    alternates: { canonical: `/digital-signage-in/${town}` },
    openGraph: {
      title: `Digital Signage in ${name}`,
      description: `Commercial digital signage displays for ${name} businesses. Browse 79+ products and get a free quote.`,
    },
  };
}

export default async function TownPage({
  params,
}: {
  params: Promise<{ town: string }>;
}) {
  const { town } = await params;
  if (!towns.includes(town)) notFound();

  const name = townSlugToName(town);
  const townIndex = towns.indexOf(town);
  const nearbyTowns = towns
    .filter((_, i) => Math.abs(i - townIndex) <= 5 && towns[i] !== town)
    .slice(0, 8);
  const majorCities = popularTowns.filter((t) => t !== town).slice(0, 12);

  const products = getAllProducts();
  const featuredProducts = products
    .filter((p) => p.image && p.features.length > 2)
    .slice(0, 6);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        name: `My-Signage.com — Digital Signage ${name}`,
        description: `Commercial digital signage supplier serving ${name}. High brightness displays, touch screens, video walls, digital posters and menu boards.`,
        url: `https://my-signage.com/digital-signage-in/${town}`,
        telephone: "+44-808-175-3956",
        areaServed: {
          "@type": "City",
          name: name,
          containedInPlace: { "@type": "Country", name: "United Kingdom" },
        },
        serviceType: [
          "Digital Signage Supply",
          "Commercial Display Solutions",
          "Touch Screen Displays",
          "Video Wall Installation",
        ],
      },
      {
        "@type": "Article",
        headline: `Digital Signage in ${name} — Commercial Displays 2026`,
        description: `Find the best digital signage solutions for your ${name} business. Compare high brightness displays, touch screens, video walls and more.`,
        datePublished: "2026-01-15",
        dateModified: "2026-04-03",
        author: { "@type": "Organization", name: "My-Signage.com" },
        publisher: {
          "@type": "Organization",
          name: "My-Signage.com",
          url: "https://my-signage.com",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://my-signage.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Digital Signage By Location",
            item: "https://my-signage.com/digital-signage-in/london",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: name,
            item: `https://my-signage.com/digital-signage-in/${town}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-muted">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground">Digital Signage in {name}</span>
        </div>
      </nav>

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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-blue-100 text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {name}, United Kingdom
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Digital Signage in {name}
            </h1>
            <p className="mt-6 text-lg text-blue-100 leading-relaxed">
              Looking for digital signage in {name}? Browse 79+ commercial-grade
              displays from leading manufacturers. From high brightness window
              displays to interactive touch screens, we supply {name} businesses
              with the perfect digital signage solution.
            </p>
            <p className="mt-3 text-base text-blue-200/60 leading-relaxed">
              Whether you run a restaurant, retail shop, salon, estate agency, or
              corporate office in {name} — we have the right display at the best
              price.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#enquiry"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-blue-700 font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Get a Free Quote in {name}
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16 bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">
            Why {name} Businesses Choose My-Signage.com
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "High Brightness Window Displays",
                text: `Attract walk-in customers to your ${name} storefront with ultra-bright displays up to 3,500 cd/m² — readable even in direct sunlight.`,
              },
              {
                title: "Interactive Touch Screens",
                text: `Engage your ${name} customers with 4K UHD interactive displays from 65" to 98". Perfect for presentations, wayfinding, and self-service.`,
              },
              {
                title: "Digital Menu Boards",
                text: `Update your ${name} restaurant or takeaway menu instantly. Commercial-grade displays designed for 24/7 food service environments.`,
              },
              {
                title: "Freestanding Digital Posters",
                text: `Portable, eye-catching digital posters for your ${name} business. Android-powered with USB plug-and-play content updates.`,
              },
              {
                title: "Video Wall Solutions",
                text: `Create stunning large-format visual impact in your ${name} venue with DV-LED and ultra-narrow bezel LCD video walls.`,
              },
              {
                title: `Serving ${name} & Surrounding Areas`,
                text: `We supply commercial displays to businesses across ${name} and neighbouring areas. UK-wide delivery with expert support on 0808 175 3956.`,
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-border">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Digital Signage Products Available in {name}
          </h2>
          <p className="text-muted mb-8">
            All products are available for delivery to {name} and across the UK.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-dark transition-colors"
            >
              View All {products.length} Products
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry" className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">
              Get a Digital Signage Quote in {name}
            </h2>
            <p className="mt-3 text-gray-400">
              Tell us about your {name} business and we&apos;ll recommend the
              perfect display solution. Free quotes, no obligation.
            </p>
          </div>
          <EnquiryForm
            productTitle={`Digital Signage in ${name}`}
            productSlug={`digital-signage-in-${town}`}
          />
        </div>
      </section>

      {/* Nearby Towns */}
      <section className="py-16 bg-card-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">
            Digital Signage in Nearby Areas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {nearbyTowns.map((t) => (
              <Link
                key={t}
                href={`/digital-signage-in/${t}`}
                className="bg-white border border-border rounded-xl p-4 hover:border-accent/30 hover:shadow-sm transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">
                  Digital Signage in {townSlugToName(t)}
                </span>
              </Link>
            ))}
          </div>

          <h3 className="text-xl font-bold mt-12 mb-4">Major UK Cities</h3>
          <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {majorCities.map((t) => (
              <Link
                key={t}
                href={`/digital-signage-in/${t}`}
                className="bg-white border border-border rounded-xl p-4 hover:border-accent/30 hover:shadow-sm transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">
                  {townSlugToName(t)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
