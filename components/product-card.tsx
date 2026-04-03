import Link from "next/link";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group border border-border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow">
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-video bg-card-bg relative overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted">
              No image available
            </div>
          )}
          {product.source && (
            <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-medium bg-black/60 text-white backdrop-blur-sm">
              {product.source === "screenmoove" ? "ScreenMoove" : "Allsee"}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {product.title}
          </h3>
          <p className="mt-2 text-sm text-muted line-clamp-2">
            {product.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            {product.price && product.price !== "" && (
              <span className="text-lg font-bold text-accent">
                {product.price}
              </span>
            )}
            {product.specifications.length > 0 && (
              <span className="text-xs text-muted">
                {product.specifications.length} size
                {product.specifications.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
