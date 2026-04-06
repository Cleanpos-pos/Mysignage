import { Metadata } from "next";
import Link from "next/link";
import { getAllAreas, getTotalCount } from "@/lib/restaurants";

export const metadata: Metadata = {
  title: "Restaurant & Takeaway Directory | Find Local Food",
  description:
    "Browse restaurants and takeaways across the UK. Find local food delivery in Birmingham, London, Manchester, Leicester and more. 200+ restaurants listed.",
  alternates: { canonical: "/restaurants" },
};

export default function RestaurantsPage() {
  const areas = getAllAreas();
  const counts = getTotalCount();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-500 to-red-600 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Restaurant & Takeaway Directory
          </h1>
          <p className="mt-4 text-lg text-orange-100 max-w-2xl mx-auto">
            Find {counts.restaurants}+ restaurants and takeaways across{" "}
            {counts.areas} UK areas. Order food delivery from your local
            favourites.
          </p>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold mb-8">Browse by Area</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((area) => (
            <Link
              key={area.area}
              href={`/restaurants/${area.area}`}
              className="group block p-6 rounded-xl border border-border bg-white hover:shadow-lg hover:border-orange-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-orange-600 transition-colors">
                    {area.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {area.restaurant_count} restaurant
                    {area.restaurant_count !== 1 ? "s" : ""}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-muted group-hover:text-orange-600 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
