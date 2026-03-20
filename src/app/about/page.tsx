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
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-6">אודות משתלם</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            צוות של ישראלים שקונים באליאקספרס כבר שנים — ועכשיו עוזרים גם לכם לקנות חכם ובביטחון
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="text-3xl font-extrabold text-orange-500 mb-2">25+</div>
            <div className="text-sm text-gray-600">סקירות מקצועיות</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="text-3xl font-extrabold text-orange-500 mb-2">87+</div>
            <div className="text-sm text-gray-600">מוצרים נבדקו</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="text-3xl font-extrabold text-orange-500 mb-2">11</div>
            <div className="text-sm text-gray-600">קטגוריות</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="text-3xl font-extrabold text-orange-500 mb-2">100%</div>
            <div className="text-sm text-gray-600">כנות ושקיפות</div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Who We Are */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-bl from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              מי אנחנו?
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              אנחנו צוות של ישראלים שקונים באליאקספרס כבר שנים ולמדנו איך לזהות מוצרים איכותיים, 
              מוכרים אמינים, ועסקאות שמשתלמות באמת. בעבר כולנו נפלנו בפח של מוצרים זולים שהתבררו כטעות, 
              אבל גם גילינו יהלומים נסתרים שחסכו לנו אלפי שקלים.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              במקום שכל אחד יעשה את אותן הטעויות, החלטנו לחלוק את הניסיון והידע הזה. 
              <strong>משתלם</strong> נולד כדי לעזור לישראלים לקנות חכם, לחסוך זמן וכסף, ולקנות בביטחון.
            </p>
          </div>

          {/* How We Work */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-bl from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              איך אנחנו בוחרים מוצרים?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">מחקר מעמיק</h3>
                  <p className="text-gray-600">בודקים עשרות מוצרים בכל קטגוריה, משווים מפרטים ומחירים</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">השוואה מדוקדקת</h3>
                  <p className="text-gray-600">משווים מוכרים, דירוגים, כמות מכירות ותלונות של קונים</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">בדיקת דירוגים</h3>
                  <p className="text-gray-600">קוראים מאות ביקורות וממליצים רק על מוצרים עם דירוג 4.5+ כוכבים</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">סקירה ישרה</h3>
                  <p className="text-gray-600">כותבים ביקורת מפורטת עם יתרונות, חסרונות, והמלצה ברורה</p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                העקרונות שלנו
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>ממליצים רק על מוצרים שהיינו קונים בעצמנו</li>
                <li>כנות מוחלטת — גם כשיש חסרונות</li>
                <li>מפנים לקישור הזול ביותר שמצאנו</li>
                <li>מעדכנים מחירים וקישורים באופן שוטף</li>
              </ul>
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-bl from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              המתודולוגיה שלנו
            </h2>
            <p className="text-gray-700 mb-4">
              כל סקירה עוברת תהליך קפדני של 6 שלבים לפני פרסום:
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                <div>
                  <span className="font-semibold">בדיקת דירוגי אליאקספרס:</span> רק מוצרים עם 4.5+ כוכבים ומעל 100 הזמנות
                </div>
              </div>
              <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                <div>
                  <span className="font-semibold">אימות מוכרים:</span> בודקים שנות פעילות, מספר עוקבים, וציון שביעות רצון
                </div>
              </div>
              <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                <div>
                  <span className="font-semibold">בדיקת ביקורות שליליות:</span> מזהים בעיות נפוצות וחוזרים ונשנים
                </div>
              </div>
              <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                <div>
                  <span className="font-semibold">השוואת מחירים:</span> משווים ברחבי הפלטפורמה למציאת העסקה הכי טובה
                </div>
              </div>
              <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">✓</div>
                <div>
                  <span className="font-semibold">אימות משלוח לישראל:</span> מוודאים שהמוכר משלח לישראל ובתנאים סבירים
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              רוצים לדעת עוד על התהליך שלנו? 
              <a href="/methodology" className="text-orange-500 hover:text-orange-600 font-medium underline"> קראו את המתודולוגיה המלאה</a>
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm">
            <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-bl from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              צרו קשר
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              יש לכם שאלה? רעיון למוצר שצריך סקירה? או סתם רוצים לשתף משוב?
            </p>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <a href="mailto:info@design-dc.com" className="text-gray-900 font-medium hover:text-orange-500">
                info@design-dc.com
              </a>
            </div>
          </div>

          {/* Affiliate Disclosure */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              גילוי נאות — שקיפות מלאה
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg leading-relaxed">
                <strong>האתר משתמש בקישורי שותפים (affiliate links) של אליאקספרס.</strong>
                כשאתם קונים דרך הקישורים שלנו, אנחנו מקבלים עמלה קטנה מאליאקספרס — 
                <span className="font-bold text-blue-600">ללא עלות נוספת עבורכם.</span>
              </p>
              <div className="bg-white border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">מה זה אומר בפועל?</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>אתם משלמים בדיוק אותו מחיר</strong> — העמלה באה מכיס של אליאקספרס, לא שלכם</li>
                  <li><strong>העמלות מממנות את האתר</strong> — זה מה שמאפשר לנו להמשיך לכתוב סקירות ללא תשלום</li>
                  <li><strong>ההמלצות שלנו תמיד אמיתיות</strong> — אנחנו ממליצים רק על מוצרים שהיינו קונים בעצמנו</li>
                  <li><strong>לא נוותר על האמת בגלל כסף</strong> — גם אם מוצר נותן עמלה גבוהה, אם הוא לא טוב נגיד את זה</li>
                </ul>
              </div>
              <p className="text-sm">
                <strong>זה המודל העסקי שלנו:</strong> אנחנו עוזרים לכם למצוא מוצרים טובים, אתם קונים אותם, 
                ואליאקספרס נותן לנו עמלה קטנה שמחזיקה את האתר. כולם מרוויחים! 🎉
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
