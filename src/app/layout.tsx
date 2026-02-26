import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "משתלם - סקירות מוצרים מאליאקספרס",
  description: "סקירות וביקורות מוצרים מאליאקספרס בעברית. מצאו את המוצרים הכי משתלמים עם המלצות אמיתיות.",
  keywords: ["אליאקספרס", "סקירות", "ביקורות", "מוצרים משתלמים", "קניות אונליין"],
  metadataBase: new URL("https://meshtalem.netlify.app"),
  openGraph: {
    title: "משתלם - המוצרים הכי משתלמים מאליאקספרס 🛒",
    description: "סקירות מקצועיות בעברית. השוואות מחירים. טיפים לקנייה חכמה.",
    type: "website",
    locale: "he_IL",
    siteName: "משתלם",
    url: "https://meshtalem.netlify.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "משתלם - המוצרים הכי משתלמים מאליאקספרס",
    description: "סקירות מקצועיות בעברית. מחירים אמיתיים. לינקים אמיתיים.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-heebo antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
