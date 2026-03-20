export const metadata = { title: 'תנאי שימוש - משתלם', alternates: { canonical: "https://meshtalem.design-dc.com/terms" } };

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12" dir="rtl">
      <h1 className="text-3xl font-bold mb-6">תנאי שימוש</h1>
      <p className="text-gray-600 mb-4">עדכון אחרון: פברואר 2026</p>
      
      <section className="space-y-4 text-gray-700">
        <h2 className="text-xl font-semibold mt-6">1. כללי</h2>
        <p>ברוכים הבאים לאתר משתלם (meshtalem.design-dc.com). השימוש באתר זה כפוף לתנאים המפורטים להלן. גלישה באתר מהווה הסכמה לתנאים אלה.</p>
        
        <h2 className="text-xl font-semibold mt-6">2. תוכן האתר</h2>
        <p>האתר מספק סקירות וביקורות מוצרים מאליאקספרס. התוכן מוגש למטרות מידע בלבד ואינו מהווה ייעוץ מקצועי. אנו משתדלים לספק מידע מדויק ועדכני, אך איננו אחראים לשגיאות או אי-דיוקים.</p>
        
        <h2 className="text-xl font-semibold mt-6">3. קישורי שותפים</h2>
        <p>האתר מכיל קישורי שותפים (affiliate links) לאליאקספרס. כאשר אתם רוכשים מוצר דרך קישור שלנו, אנו עשויים לקבל עמלה. זה לא משפיע על המחיר שאתם משלמים.</p>
        
        <h2 className="text-xl font-semibold mt-6">4. קניין רוחני</h2>
        <p>כל התוכן באתר, לרבות טקסטים, תמונות ועיצוב, הם קניינו הרוחני של משתלם. אין לשכפל, להעתיק או להפיץ תוכן מהאתר ללא אישור.</p>
        
        <h2 className="text-xl font-semibold mt-6">5. הגבלת אחריות</h2>
        <p>האתר אינו אחראי לאיכות המוצרים הנמכרים באליאקספרס, לזמני משלוח, או לכל בעיה הקשורה לעסקאות שנעשו דרך הקישורים באתר.</p>
        
        <h2 className="text-xl font-semibold mt-6">6. שינויים בתנאים</h2>
        <p>אנו שומרים לעצמנו את הזכות לעדכן תנאים אלה בכל עת. המשך השימוש באתר לאחר עדכון מהווה הסכמה לתנאים המעודכנים.</p>
        
        <h2 className="text-xl font-semibold mt-6">7. יצירת קשר</h2>
        <p>לשאלות בנוגע לתנאי השימוש, ניתן לפנות אלינו בכתובת: info@design-dc.com</p>
      </section>
      </main>
      <Footer />
    </div>
  );
}
