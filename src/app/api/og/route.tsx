import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const categoryEmoji: Record<string, string> = {
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
  guides: "📚",
};

const categoryNames: Record<string, string> = {
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
  guides: "מדריכים",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "משתלם";
  const category = searchParams.get("category") || "";
  const emoji = categoryEmoji[category] || "🛒";
  const catName = categoryNames[category] || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #ff6b35 0%, #e63946 100%)",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(255,255,255,0.95)",
            borderRadius: "24px",
            padding: "50px 60px",
            maxWidth: "1080px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "64px", marginBottom: "16px", display: "flex" }}>{emoji}</div>
          {catName && (
            <div
              style={{
                fontSize: "24px",
                color: "#e63946",
                fontWeight: 700,
                marginBottom: "12px",
                display: "flex",
              }}
            >
              {catName}
            </div>
          )}
          <div
            style={{
              fontSize: "42px",
              fontWeight: 800,
              color: "#1a1a2e",
              lineHeight: 1.3,
              direction: "rtl",
              display: "flex",
              textAlign: "center",
              maxWidth: "900px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: "22px",
              color: "#666",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>meshtalem.design-dc.com</span>
            <span style={{ color: "#e63946", fontWeight: 700 }}>משתלם</span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
