import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllAreas, getAreaBySlug } from "@/lib/restaurants";

export function generateStaticParams() {
  return getAllAreas().map((a) => ({ area: a.area }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const data = getAreaBySlug(area);
  if (!data) return { title: "Area Not Found" };

  return {
    title: `Restaurants & Takeaways in ${data.name} — ${data.restaurant_count} Listed`,
    description: `Order food from ${data.restaurant_count} restaurants and takeaways in ${data.name}. Browse menus, compare delivery times, and order online.`,
    alternates: { canonical: `/restaurants/${area}` },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const data = getAreaBySlug(area);
  if (!data) notFound();

  const otherAreas = getAllAreas()
    .filter((a) => a.area !== area)
    .slice(0, 12);

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Restaurants in ${data.name}`,
    numberOfItems: data.restaurant_count,
    itemListElement: data.restaurants.slice(0, 20).map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Restaurant",
        name: r.name,
        image: r.image || undefined,
        url: r.url,
        ...(r.address ? { address: r.address } : {}),
      },
    })),
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
          <Link href="/" className="hover:text-accent">Home</Link>
          <span className="text-border">/</span>
          <Link href="/restaurants" className="hover:text-accent">Restaurants</Link>
          <span className="text-border">/</span>
          <span className="text-foreground">{data.name}</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            Restaurants & Takeaways in {data.name}
          </h1>
          <p className="mt-3 text-orange-100 text-lg">
            {data.restaurant_count} restaurant
            {data.restaurant_count !== 1 ? "s" : ""} available for delivery and
            collection
          </p>
        </div>
      </section>

      {/* Restaurant Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.restaurants.map((r) => (
            <a
              key={r.id || r.slug}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl border border-border bg-white overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-video bg-card-bg relative overflow-hidden">
                {r.image ? (
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🍽️
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground group-hover:text-orange-600 transition-colors">
                  {r.name}
                </h3>
                {r.cuisines.length > 0 && (
                  <p className="mt-1 text-xs text-muted">
                    {r.cuisines.join(", ")}
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
                  {r.min_order && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Min £{r.min_order}
                    </span>
                  )}
                  {r.delivery_time && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {r.delivery_time}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Other Areas */}
      <section className="bg-card-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">
            Browse Other Areas
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {otherAreas.map((a) => (
              <Link
                key={a.area}
                href={`/restaurants/${a.area}`}
                className="bg-white border border-border rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-medium">
                  {a.name}
                </span>
                <span className="ml-2 text-xs text-muted">
                  ({a.restaurant_count})
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
