import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "איך אנחנו סוקרים | משתלם",
  description: "המתודולוgiה המלאה שלנו לבחירת מוצרים מאליאקספרס — איך אנחנו בודקים, משווים ומחליטים מה לממליץ",
  alternates: { canonical: "https://meshtalem.design-dc.com/methodology" },
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link href="/" className="hover:text-[var(--color-primary)] cursor-pointer">ראשי</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-[var(--color-primary)] cursor-pointer">אודות</Link>
            <span>/</span>
            <span className="text-gray-600">איך אנחנו סוקרים</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-bl from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold mb-6">איך אנחנו בוחרים מוצרים?</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            המתודולוגיה המלאה שלנו לבדיקה, השוואה ובחירת המוצרים הכי משתלמים מאליאקספרס. 
            כל סקירה עוברת 6 שלבים קפדניים לפני פרסום.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Overview */}
          <div className="bg-gradient-to-l from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-extrabold mb-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              הרעיון שלנו
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              אליאקספרס מציע מיליוני מוצרים, אבל <strong>איך יודעים מה באמת שווה?</strong> 
              אנחנו עושים את העבודה הקשה: בודקים, משווים, קוראים ביקורות, ומסננים את האשפה כדי למצוא את הזהב.
              <span className="font-semibold text-orange-600"> המטרה: לחסוך לכם זמן וכסף ולהגן עליכם מקניות מאכזבות.</span>
            </p>
          </div>

          {/* The 6-Step Process */}
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold mb-8 text-center">התהליך של 6 השלבים</h2>
            
            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-blue-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0">1</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">בחירת קטגוריה ומחקר ראשוני</h3>
                  <p className="text-gray-700 mb-4">
                    בוחרים קטגוריה רלוונטית (אלקטרוניקה, בית וגן, ספורט וכו') ומזהים מוצרים פופולריים 
                    או כאלה שיש עליהם הרבה שאלות בקהילות ישראליות.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <h4 className="font-bold mb-2">מה אנחנו בודקים בשלב הזה:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      <li>טרנדים בקניות של ישראלים באליאקספרס</li>
                      <li>מוצרים שעולים הרבה בפורומים ובקבוצות פייסבוק</li>
                      <li>מוצרים עם הרבה מכירות אבל דירוגים מעורבים (אתגר מעניין)</li>
                      <li>מוצרים שיש עליהם קשת רחבה של מחירים (כדי למצוא את הכי משתלם)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-green-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0">2</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">בדיקת דירוגי אליאקספרס (הסינון הראשון)</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>הכלל הברזל שלנו:</strong> רק מוצרים עם דירוג של 4.5+ כוכבים ומעל 100 הזמנות עוברים לשלב הבא. 
                    זה מסנן את רוב המוצרים הבעייתיים.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <h4 className="font-bold mb-2 text-green-700">✅ מוצר עובר אם:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• דירוג 4.5 כוכבים ומעלה</li>
                        <li>• לפחות 100 הזמנות (מוכיח פופולריות)</li>
                        <li>• פעילות בביקורות (לא דומם חודשיים)</li>
                        <li>• ביקורות עם תמונות אמיתיות</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <h4 className="font-bold mb-2 text-red-700">❌ מוצר נפסל אם:</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• דירוג מתחת ל-4.5 כוכבים</li>
                        <li>• פחות מ-100 הזמנות</li>
                        <li>• ביקורות שנראות מזויפות</li>
                        <li>• תמונות מוצר לא תואמות ביקורות</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-yellow-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0">3</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">אימות מוכרים ובדיקת אמינות</h3>
                  <p className="text-gray-700 mb-4">
                    לא מספיק שהמוצר טוב — המוכר חייב להיות אמין. בודקים את הפרופיל, שנות הפעילות, 
                    ובעיקר אם יש להם היסטוריה של משלוחים לישראל.
                  </p>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h4 className="font-bold mb-2">פרמטרים לבדיקת מוכר:</h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-semibold">שנות פעילות:</span>
                          <br />מינימום 2 שנים באליאקספרס
                        </div>
                        <div>
                          <span className="font-semibold">דירוג מוכר:</span>
                          <br />95%+ שביעות רצון לקוחות
                        </div>
                        <div>
                          <span className="font-semibold">כמות עוקבים:</span>
                          <br />מעל 1,000 עוקבים בחנות
                        </div>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <h4 className="font-bold mb-2">🇮🇱 בדיקה ישראלית מיוחדת:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                        <li>האם המוכר משלח לישראל (לא כולם משלחים!)</li>
                        <li>זמני משלוח ריאליים לישראל (לא ההבטחות הוורודות)</li>
                        <li>האם יש ביקורות של קונים ישראלים בעבר</li>
                        <li>מה עולה המשלוח לישראל (לפעמים זה הופך עסקה טובה לרעה)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-purple-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0">4</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">צלילה לביקורות השליליות</h3>
                  <p className="text-gray-700 mb-4">
                    <strong>כאן מתחיל העבודה הכי חשובה:</strong> קוראים את כל הביקורות השליליות כדי להבין מה באמת יכול להשתבש. 
                    דירוג גבוה זה טוב, אבל הביקורות הרעות חושפות את האמת.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <h4 className="font-bold mb-3">על מה אנחנו מתמקדים בביקורות השליליות:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h5 className="font-semibold mb-2">בעיות איכות:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>מוצר שבר מהר</li>
                            <li>לא תואם לתיאור</li>
                            <li>גודל/צבע שונה מהמוגדר</li>
                            <li>חומרי גלם זולים</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold mb-2">בעיות משלוח:</h5>
                          <ul className="list-disc list-inside text-gray-700 space-y-1">
                            <li>חבילה לא הגיעה</li>
                            <li>משלוח איטי מהצפוי</li>
                            <li>אריזה לקויה (נזק בדרך)</li>
                            <li>בעיות עם מכס ישראלי</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl p-4">
                      <h4 className="font-bold mb-2">הכלל שלנו לביקורות שליליות:</h4>
                      <p className="text-gray-700 text-sm">
                        אם יש יותר מ-10% ביקורות שליליות שמדווחות על <strong>אותה בעיה</strong> — 
                        זה סימן אדום. אם זה קורה ב-15%+ מהביקורות, המוצר לא עובר לסקירה.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0">5</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">השוואת מחירים ומציאת העסקה הטובה ביותר</h3>
                  <p className="text-gray-700 mb-4">
                    אותו מוצר יכול להימכר במחירים שונים בהרבה אצל מוכרים שונים. 
                    אנחנו מחפשים את הקשר המושלם בין מחיר טוב למוכר אמין.
                  </p>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">💰</div>
                        <h5 className="font-semibold mb-2">השוואת מחירים</h5>
                        <p className="text-xs text-gray-600">בודקים לפחות 5 מוכרים למוצר זהה</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">🚚</div>
                        <h5 className="font-semibold mb-2">עלויות משלוח</h5>
                        <p className="text-xs text-gray-600">מחיר כולל משלוח לישראל — לא רק המוצר</p>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
                        <div className="text-2xl mb-2">⚖️</div>
                        <h5 className="font-semibold mb-2">איזון מחיר-איכות</h5>
                        <p className="text-xs text-gray-600">לא תמיד הזול ביותר הוא הכי משתלם</p>
                      </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                      <h4 className="font-bold mb-2">💡 הטריק שלנו למציאת העסקה הטובה ביותר:</h4>
                      <p className="text-sm text-gray-700">
                        לא בוחרים את הזול ביותר, אלא את <strong>"הכי משתלם"</strong> — 
                        משקל של 70% מחיר + 30% אמינות מוכר. לפעמים מוסיפים 2-3 דולר כדי לקנות ממוכר עם פי 10 יותר ביקורות חיוביות.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-red-500 text-white rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0">6</div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">כתיבת הסקירה ובחירה סופית</h3>
                  <p className="text-gray-700 mb-4">
                    אחרי כל הבדיקות, כותבים סקירה ישרה וכנה. 
                    לא רק רשימה של מוצרים — מדריך שיעזור לכם להחליט בדיוק מה מתאים לכם.
                  </p>
                  <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <h4 className="font-bold mb-3">מה כולל בכל סקירה:</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                        <ul className="space-y-1">
                          <li>✅ <strong>יתרונות ברורים</strong> — מה טוב במוצר</li>
                          <li>✅ <strong>חסרונות כנים</strong> — מה לא מושלם</li>
                          <li>✅ <strong>למי זה מתאים</strong> — פרופיל המשתמש האידיאלי</li>
                          <li>✅ <strong>המלצה ברורה</strong> — כן או לא, בלי עמימות</li>
                        </ul>
                        <ul className="space-y-1">
                          <li>✅ <strong>מחיר מעודכן</strong> — נכון לזמן הסקירה</li>
                          <li>✅ <strong>קישור ישיר</strong> — ללא עקיפים ומניפולציות</li>
                          <li>✅ <strong>אזהרות</strong> — על מה להיזהר בהזמנה</li>
                          <li>✅ <strong>טיפים לקנייה</strong> — איך להזמין בחכמה</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Promise */}
          <div className="bg-gradient-to-l from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-extrabold mb-6 text-center flex items-center justify-center gap-3">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              ההבטחה שלנו לכם
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-lg">🎯 נמליץ רק על מה שהיינו קונים</h3>
                <p className="text-gray-700">
                  לפני שמוצר מגיע לאתר, אנחנו שואלים את עצמנו: "האם הייתי קונה את זה במסמי שלי?" 
                  אם התשובה לא, זה לא מגיע לסקירה.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg">🔄 עדכונים שוטפים</h3>
                <p className="text-gray-700">
                  מוצרים ומחירים משתנים. אנחנו חוזרים ועדכנים סקירות כל 2-3 חודשים 
                  ומסירים המלצות שכבר לא רלוונטיות.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold mb-4">רוצים לראות את התהליך בפעולה?</h2>
            <p className="text-gray-600 mb-6">
              בואו לחקור את הסקירות שלנו ותראו איך התהליך הזה מתורגם למציאת המוצרים הכי משתלמים
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/reviews" className="bg-gradient-to-l from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-bold hover:from-orange-600 hover:to-red-600 transition-colors">
                כל הסקירות
              </Link>
              <Link href="/about" className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                חזרה לעמוד אודות
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}