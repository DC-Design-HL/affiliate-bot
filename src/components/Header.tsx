"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-[var(--color-primary)] cursor-pointer">
          משתלם
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer">ראשי</Link>
          <Link href="/reviews" className="hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer">סקירות</Link>
          <Link href="/deals" className="hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer">מבצעים</Link>
          <Link href="/about" className="hover:text-[var(--color-primary)] transition-colors duration-200 cursor-pointer">אודות</Link>
        </nav>
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden cursor-pointer p-2 -m-2"
          aria-label="תפריט"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white">
          <div className="flex flex-col px-4 py-3 gap-3 text-sm font-medium text-gray-700">
            <Link href="/" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[var(--color-primary)] cursor-pointer">ראשי</Link>
            <Link href="/reviews" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[var(--color-primary)] cursor-pointer">סקירות</Link>
            <Link href="/deals" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[var(--color-primary)] cursor-pointer">מבצעים</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="py-2 hover:text-[var(--color-primary)] cursor-pointer">אודות</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
