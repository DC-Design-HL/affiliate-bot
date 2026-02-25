import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-[var(--color-primary)]">
          💰 משתלם
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-[var(--color-primary)]">ראשי</Link>
          <Link href="/reviews" className="hover:text-[var(--color-primary)]">סקירות</Link>
          <Link href="/deals" className="hover:text-[var(--color-primary)]">מבצעים</Link>
          <Link href="/about" className="hover:text-[var(--color-primary)]">אודות</Link>
        </nav>
      </div>
    </header>
  );
}
