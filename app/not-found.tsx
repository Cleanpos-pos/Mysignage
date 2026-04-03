import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-4 text-muted text-lg">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center px-6 py-3 rounded-lg bg-accent text-white font-medium hover:bg-accent-dark transition-colors"
      >
        Back to Products
      </Link>
    </div>
  );
}
