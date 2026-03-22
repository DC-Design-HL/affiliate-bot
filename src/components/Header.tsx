"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="bg-gradient-to-l from-orange-600 to-red-500 text-white text-center text-xs py-1.5 font-medium">
        🔥 משלוח חינם על רוב המוצרים + הגנת קונה מלאה
      </div>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="bg-gradient-to-bl from-orange-500 to-red-500 text-white w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-lg shadow-sm">
            מ
          </div>
          <span className="text-xl font-extrabold text-gray-900">
            משתלם
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { href: "/", label: "ראשי" },
            { href: "/reviews", label: "סקירות" },
            { href: "/deals", label: "🔥 מבצעים" },
            { href: "/about", label: "אודות" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-[var(--color-primary)] hover:bg-orange-50 transition-all duration-200 cursor-pointer"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Search icon */}
          <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors cursor-pointer" aria-label="חיפוש">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

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
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="flex flex-col px-4 py-2">
            {[
              { href: "/", label: "ראשי", icon: "🏠" },
              { href: "/reviews", label: "סקירות", icon: "📋" },
              { href: "/deals", label: "מבצעים", icon: "🔥" },
              { href: "/about", label: "אודות", icon: "ℹ️" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-2 text-gray-700 hover:text-[var(--color-primary)] hover:bg-orange-50 rounded-lg cursor-pointer transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
      {/* Category bar */}
      <div className="border-t border-gray-100 bg-gray-50/80">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 py-2.5 overflow-x-auto scrollbar-hide md:justify-center" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[
              { name: "אלקטרוניקה", slug: "electronics", emoji: "🎧" },
              { name: "בית וגן", slug: "home-garden", emoji: "🏠" },
              { name: "גיימינג", slug: "gaming", emoji: "🎮" },
              { name: "רכב", slug: "automotive", emoji: "🚗" },
              { name: "מטבח", slug: "kitchen", emoji: "🍳" },
              { name: "ספורט", slug: "sports", emoji: "⚽" },
              { name: "אופנה", slug: "fashion", emoji: "👗" },
              { name: "ילדים", slug: "babies", emoji: "👶" },
              { name: "יופי", slug: "beauty", emoji: "💄" },
              { name: "טיולים", slug: "travel", emoji: "✈️" },
            ].map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
