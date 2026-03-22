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
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        צפה ב-{productName} באליאקספרס
      </a>
    </div>
  );
}
