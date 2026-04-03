import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { EnquiryForm } from "@/components/enquiry-form";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.description,
    keywords: product.keywords.split(",").map((k) => k.trim()),
    openGraph: {
      title: product.title,
      description: product.description,
      images: product.image ? [{ url: product.image, alt: product.title }] : [],
      type: "article",
    },
    alternates: { canonical: `/product/${slug}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const brandName =
    product.source === "screenmoove" ? "ScreenMoove" : "Allsee Technologies";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.image,
    brand: { "@type": "Brand", name: brandName },
    ...(product.price && product.price !== ""
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "GBP",
            price: product.price.replace(/[^0-9.]/g, ""),
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
    url: `https://my-signage.com/product/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-muted">
        <ol
          className="flex items-center gap-2"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link href="/" itemProp="item" className="hover:text-accent">
              <span itemProp="name">Products</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li className="text-border">/</li>
          <li
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <span itemProp="name" className="text-foreground">
              {product.title}
            </span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-video bg-card-bg rounded-lg overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted">
                No image available
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-accent/10 text-accent">
                {brandName}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {product.title}
            </h1>
            {product.price && product.price !== "" && (
              <p className="mt-3 text-3xl font-bold text-accent">
                {product.price}
                <span className="text-sm font-normal text-muted ml-2">
                  ex. VAT
                </span>
              </p>
            )}
            <p className="mt-4 text-lg text-muted leading-relaxed">
              {product.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#enquiry"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-dark transition-colors"
              >
                Enquire Now
              </a>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-card-bg transition-colors"
              >
                View on {brandName}
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {product.features.length > 0 && (
        <section className="bg-card-bg py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feat, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg border border-border"
                >
                  <h3 className="font-semibold text-foreground">{feat.title}</h3>
                  {feat.text && (
                    <p className="mt-2 text-sm text-muted">{feat.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specifications */}
      {product.specifications.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-8">Specifications</h2>
          <div className="space-y-8">
            {product.specifications.map((spec, i) => (
              <div key={i}>
                {spec.size && (
                  <h3 className="text-lg font-semibold mb-4 text-accent">
                    {spec.size}
                  </h3>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                    <tbody>
                      {Object.entries(spec.specs).map(([key, value], j) => (
                        <tr
                          key={key}
                          className={j % 2 === 0 ? "bg-card-bg" : "bg-white"}
                        >
                          <td className="px-4 py-3 font-medium text-foreground w-1/3 border-r border-border">
                            {key}
                          </td>
                          <td className="px-4 py-3 text-muted">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Enquiry Form */}
      <section id="enquiry" className="bg-gradient-to-br from-gray-900 to-gray-800 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white">
              Enquire About This Product
            </h2>
            <p className="mt-3 text-gray-400">
              Interested in the {product.title}? Fill in the form below and
              we&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <EnquiryForm productTitle={product.title} productSlug={product.slug} />
        </div>
      </section>
    </>
  );
}
