import Link from "next/link";

const categories = [
  { name: "אלקטרוניקה", slug: "electronics" },
  { name: "בית וגן", slug: "home-garden" },
  { name: "גיימינג", slug: "gaming" },
  { name: "רכב", slug: "automotive" },
  { name: "מטבח", slug: "kitchen" },
  { name: "ספורט", slug: "sports" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Trust bar */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
            <span className="text-gray-300 font-medium">הגנת קונה מלאה</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25m-2.25 0h-2.25m4.5 0V6a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v3.75m0 0h-4.5" /></svg>
            <span className="text-gray-300 font-medium">משלוח חינם</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
            <span className="text-gray-300 font-medium">דירוגים אמיתיים</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
            <span className="text-gray-300 font-medium">מחירים הכי זולים</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-bl from-orange-500 to-red-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-sm">
                מ
              </div>
              <span className="text-lg font-extrabold text-white">משתלם</span>
            </div>
            <p className="text-sm leading-relaxed">
              סקירות מקצועיות בעברית למוצרים מאליאקספרס.
              אנחנו בודקים, משווים ועוזרים לכם לקנות חכם.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">קטגוריות</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="text-sm hover:text-[var(--color-primary)] transition-colors cursor-pointer"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-4">קישורים</h3>
            <div className="flex flex-col gap-2">
              <Link href="/reviews" className="text-sm hover:text-[var(--color-primary)] transition-colors cursor-pointer">כל הסקירות</Link>
              <Link href="/deals" className="text-sm hover:text-[var(--color-primary)] transition-colors cursor-pointer">מבצעים חמים</Link>
              <Link href="/about" className="text-sm hover:text-[var(--color-primary)] transition-colors cursor-pointer">אודות</Link>
              <Link href="/methodology" className="text-sm hover:text-[var(--color-primary)] transition-colors cursor-pointer">איך אנחנו סוקרים</Link>
            </div>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-white font-bold mb-4">יצירת קשר ומידע</h3>
            <div className="flex flex-col gap-2">
              <a href="mailto:info@design-dc.com" className="text-sm hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                צרו קשר
              </a>
              <Link href="/privacy" className="text-sm hover:text-[var(--color-primary)] transition-colors cursor-pointer">מדיניות פרטיות</Link>
              <Link href="/terms" className="text-sm hover:text-[var(--color-primary)] transition-colors cursor-pointer">תנאי שימוש</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-400 leading-relaxed mb-3">
            האתר משתמש בקישורי שותפים. רכישה דרך הקישורים שלנו תומכת בהמשך פעילות האתר ללא עלות נוספת עבורכם.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-gray-500">
            <span>© 2026 משתלם — כל הזכויות שמורות</span>
            <span className="hidden md:inline">•</span>
            <span>האתר משתמש בקישורי שותפים</span>
            <span className="hidden md:inline">•</span>
            <a href="mailto:info@design-dc.com" className="hover:text-white transition-colors">info@design-dc.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
