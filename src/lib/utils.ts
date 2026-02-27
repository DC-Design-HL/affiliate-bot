const ILS_RATE = 3.7;

export function usdToIls(priceStr: string): string {
  const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
  if (isNaN(num)) return "";
  return Math.round(num * ILS_RATE).toLocaleString("he-IL");
}

export function parseUsdPrice(priceStr: string): number {
  return parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
}

export function formatOrderCount(min: number, max: number): string {
  const count = min + Math.floor(Math.random() * (max - min));
  if (count >= 1000) return `${(count / 1000).toFixed(1).replace(".0", "")}K+`;
  return `${count}+`;
}

export const categoryEmoji: Record<string, string> = {
  electronics: "🎧",
  "home-garden": "🏠",
  gaming: "🎮",
  automotive: "🚗",
  kitchen: "🍳",
  sports: "⚽",
  fashion: "👗",
  "beauty-health": "💄",
  "toys-kids": "🧸",
  tools: "🔧",
};

export const categoryNames: Record<string, string> = {
  electronics: "אלקטרוניקה",
  "home-garden": "בית וגן",
  gaming: "גיימינג",
  automotive: "רכב",
  kitchen: "מטבח",
  sports: "ספורט",
  fashion: "אופנה",
  "beauty-health": "יופי ובריאות",
  "toys-kids": "צעצועים וילדים",
  tools: "כלי עבודה",
};
