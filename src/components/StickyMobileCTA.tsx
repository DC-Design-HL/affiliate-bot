"use client";

export default function StickyMobileCTA({ affiliateUrl, productName }: { affiliateUrl: string; productName: string }) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white border-t border-gray-200 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <a
        href={affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="cursor-pointer bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-center py-3.5 rounded-lg font-bold transition-colors duration-200 flex items-center justify-center gap-2 w-full shadow-sm"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        לרכישת {productName} באליאקספרס
      </a>
    </div>
  );
}
