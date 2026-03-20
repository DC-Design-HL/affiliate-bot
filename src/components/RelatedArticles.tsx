import Link from 'next/link';
import { ReviewMeta } from '@/lib/content';
import { categoryNames } from '@/lib/utils';

interface RelatedArticlesProps {
  articles: ReviewMeta[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        מאמרים קשורים
      </h3>
      
      <p className="text-sm text-gray-600 mb-6">
        המשיכו לקרוא - מאמרים נוספים שעלולים לעניין אתכם
      </p>

      <div className="grid gap-4">
        {articles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/reviews/${article.slug}`}
            className="group block p-4 border border-gray-100 rounded-lg hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)] text-sm font-bold rounded-full">
                  {index + 1}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h4>
                
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {categoryNames[article.category] || article.category}
                  </span>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    {article.products?.length > 0 && (
                      <>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504 1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                        <span>{article.products.length} מוצרים</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-[var(--color-primary)] transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}