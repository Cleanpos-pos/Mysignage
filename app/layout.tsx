import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "My-Signage.com - Premium Digital Signage Solutions",
    template: "%s | My-Signage",
  },
  description:
    "Discover premium digital signage solutions at My-Signage.com. Commercial-grade high brightness displays, touch screens, video walls, outdoor signage, digital posters and media players from leading manufacturers.",
  keywords: [
    "digital signage",
    "commercial displays",
    "touch screen displays",
    "video wall",
    "outdoor digital signage",
    "high brightness display",
    "digital menu board",
    "digital poster",
    "LED display",
    "digital signage solutions",
    "My-Signage",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "My-Signage.com",
    url: "https://my-signage.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://my-signage.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "My-Signage.com",
                  url: "https://my-signage.com",
                  description:
                    "Premium digital signage product catalog with 79+ commercial-grade displays",
                },
                {
                  "@type": "Organization",
                  name: "My-Signage.com",
                  url: "https://my-signage.com",
                  telephone: "08081753956",
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+44-808-175-3956",
                    contactType: "sales",
                    availableLanguage: "English",
                  },
                },
              ],
            }),
          }}
        />
        <header className="border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground">
                My-Signage<span className="text-accent">.com</span>
              </span>
            </Link>
            <div className="flex gap-6 text-sm font-medium">
              <Link
                href="/"
                className="text-muted hover:text-foreground transition-colors"
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-muted hover:text-foreground transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/restaurants"
                className="text-muted hover:text-foreground transition-colors"
              >
                Restaurants
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-bold mb-3">My-Signage.com</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Your trusted source for commercial-grade digital signage
                  solutions. Displays, touch screens, video walls, and more.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      All Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/categories"
                      className="hover:text-white transition-colors"
                    >
                      Categories
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Contact Us</h4>
                <p className="text-sm text-gray-400 mb-2">
                  Need help choosing the right display?
                </p>
                <a
                  href="tel:08081753956"
                  className="text-lg font-bold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  0808 175 3956
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} My-Signage.com. All rights
              reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
