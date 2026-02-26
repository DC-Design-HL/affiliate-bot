export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg font-bold text-white mb-2">משתלם</p>
        <p className="text-sm mb-4">סקירות מוצרים מאליאקספרס בעברית</p>
        <p className="text-xs leading-relaxed">
          האתר משתמש בקישורי שותפים. רכישה דרך הקישורים שלנו תומכת בהמשך פעילות האתר ללא עלות נוספת עבורכם.
        </p>
        <p className="text-xs mt-4">© {new Date().getFullYear()} משתלם. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
}
