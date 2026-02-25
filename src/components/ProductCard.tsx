import { Product } from "@/lib/content";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" dir="ltr">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
      <span className="text-sm text-gray-500 mr-1">{rating}</span>
    </div>
  );
}

export default function ProductCard({ product, rank }: { product: Product; rank: number }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <span className="bg-orange-100 text-[var(--color-primary)] font-bold text-sm px-3 py-1 rounded-full">
          #{rank}
        </span>
        <span className="text-2xl font-extrabold text-green-600" dir="ltr">
          {product.price}
        </span>
      </div>
      <h3 className="text-lg font-bold">{product.name}</h3>
      <Stars rating={product.rating} />
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white text-center py-3 rounded-lg font-bold transition-colors mt-auto"
      >
        🛒 לרכישה באליאקספרס
      </a>
    </div>
  );
}
