import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "משתלם - סקירות מוצרים מאליאקספרס",
  description: "סקירות וביקורות מוצרים מאליאקספרס בעברית. מצאו את המוצרים הכי משתלמים עם המלצות אמיתיות.",
  keywords: [
    "אליאקספרס",
    "אליאקספרס ישראל",
    "מוצרים מומלצים אליאקספרס 2026",
    "אליאקספרס משלוח חינם לישראל",
    "דילים אליאקספרס",
    "מכס אליאקספרס ישראל",
    "שווה לקנות באליאקספרס",
    "אליאקספרס ביקורות בעברית",
    "קניות אונליין בזול מסין",
    "סקירות מוצרים אליאקספרס",
    "מוצרים משתלמים",
    "קניות אונליין",
  ],
  metadataBase: new URL("https://meshtalem.design-dc.com"),
  alternates: {
    canonical: "https://meshtalem.design-dc.com",
  },
  openGraph: {
    title: "משתלם - המוצרים הכי משתלמים מאליאקספרס 🛒",
    description: "סקירות מקצועיות בעברית. השוואות מחירים. טיפים לקנייה חכמה.",
    type: "website",
    locale: "he_IL",
    siteName: "משתלם",
    url: "https://meshtalem.design-dc.com",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QKR45VNY2Q"
          strategy="beforeInteractive"
        />
        <Script id="gtag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QKR45VNY2Q');
          `}
        </Script>
        <meta name="google-site-verification" content="rW08eTrQB6759EOcXvVOVwayxqiLI3EWOSuX1stsGTk" />
        <meta name="x-build-id" content="2026-04-10T19:00Z-cache-bust" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect" 
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
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
