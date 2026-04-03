"use client";

import { useState, type FormEvent } from "react";

export function EnquiryForm({
  productTitle,
  productSlug,
}: {
  productTitle: string;
  productSlug: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 text-center border border-white/10">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white">Thank You!</h3>
        <p className="mt-3 text-gray-300">
          Your enquiry about the <strong>{productTitle}</strong> has been
          received. We&apos;ll be in touch within 24 hours.
        </p>
        <p className="mt-4 text-gray-400">
          Need it sooner? Call us on{" "}
          <a href="tel:08081753956" className="text-blue-400 font-semibold hover:underline">
            0808 175 3956
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 space-y-6"
    >
      <input type="hidden" name="product" value={productSlug} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="John Smith"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Your company"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="john@company.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="07XXX XXXXXX"
          />
        </div>
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-2">
          Quantity Required
        </label>
        <select
          id="quantity"
          name="quantity"
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        >
          <option value="1" className="bg-gray-800">1 unit</option>
          <option value="2-5" className="bg-gray-800">2-5 units</option>
          <option value="6-10" className="bg-gray-800">6-10 units</option>
          <option value="10+" className="bg-gray-800">10+ units</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          placeholder={`I'm interested in the ${productTitle}. Please provide more details...`}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
        >
          Send Enquiry
        </button>
        <p className="text-sm text-gray-400">
          Or call us now:{" "}
          <a href="tel:08081753956" className="text-blue-400 font-semibold hover:underline">
            0808 175 3956
          </a>
        </p>
      </div>
    </form>
  );
}
