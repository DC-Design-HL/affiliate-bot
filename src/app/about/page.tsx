import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "אודות | משתלם",
  description: "אודות אתר משתלם — סקירות מוצרים מאליאקספרס בעברית",
  alternates: { canonical: "https://meshtalem.design-dc.com/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold mb-6">אודות משתלם</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            ברוכים הבאים ל<strong>משתלם</strong> — האתר שעוזר לישראלים לקנות חכם באליאקספרס.
          </p>
          <p>
            אנחנו סוקרים מוצרים, משווים מחירים, ובודקים מה באמת שווה את הכסף. 
            במקום לבזבז שעות על חיפוש, אנחנו עושים את העבודה בשבילכם.
          </p>

          <h2>איך אנחנו עובדים?</h2>
          <ul>
            <li>בודקים עשרות מוצרים בכל קטגוריה</li>
            <li>קוראים מאות ביקורות של קונים אמיתיים</li>
            <li>משווים מחירים, מפרטים, ודירוגים</li>
            <li>בוחרים רק את הכי משתלמים</li>
          </ul>

          <h2>גילוי נאות</h2>
          <p>
            האתר משתמש בקישורי שותפים (affiliate links) של אליאקספרס. 
            כשאתם קונים דרך הקישורים שלנו, אנחנו מקבלים עמלה קטנה — 
            <strong>ללא עלות נוספת עבורכם</strong>.
          </p>
          <p>
            העמלות האלה מממנות את האתר ומאפשרות לנו להמשיך לסקור מוצרים. 
            ההמלצות שלנו תמיד מבוססות על איכות ותמורה למחיר, לא על גובה העמלה.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
