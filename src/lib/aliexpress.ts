import crypto from "crypto";
import logger from "./logger";

const APP_KEY = process.env.ALIEXPRESS_APP_KEY || "";
const APP_SECRET = process.env.ALIEXPRESS_APP_SECRET || "";
const API_URL = "https://api-sg.aliexpress.com/sync";

interface AffiliateLink {
  promotionUrl: string;
  originalUrl: string;
}

interface ProductDetail {
  productId: string;
  title: string;
  price: string;
  imageUrl: string;
  rating: number;
  orders: number;
  affiliateUrl: string;
}

/**
 * Sign API request using HMAC-SHA256
 */
function signRequest(params: Record<string, string>): string {
  const sorted = Object.keys(params).sort();
  let signStr = "";
  for (const key of sorted) {
    signStr += key + params[key];
  }
  const hmac = crypto.createHmac("sha256", APP_SECRET);
  hmac.update(signStr);
  return hmac.digest("hex").toUpperCase();
}

/**
 * Make API call to AliExpress
 */
async function apiCall(method: string, params: Record<string, string>): Promise<unknown> {
  try {
    const commonParams: Record<string, string> = {
      app_key: APP_KEY,
      method,
      sign_method: "sha256",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      format: "json",
      v: "2.0",
      ...params,
    };

    commonParams.sign = signRequest(commonParams);

    const queryString = Object.entries(commonParams)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");

    const response = await fetch(`${API_URL}?${queryString}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    logger.info("AliExpress API call successful", { method });
    return data;
  } catch (error) {
    logger.error("AliExpress API call failed", { method, error: String(error) });
    throw error;
  }
}

/**
 * Generate affiliate link from a product URL
 */
export async function generateAffiliateLink(productUrl: string): Promise<AffiliateLink | null> {
  try {
    const result = await apiCall(
      "aliexpress.affiliate.link.generate",
      {
        promotion_link_type: "0",
        source_values: productUrl,
        tracking_id: process.env.ALIEXPRESS_AFFILIATE_ID || "",
      }
    ) as Record<string, unknown>;

    const response = result?.aliexpress_affiliate_link_generate_response as Record<string, unknown>;
    const links = response?.resp_result as Record<string, unknown>;
    const data = links?.result as Record<string, unknown>;
    const promotionLinks = data?.promotion_links as Record<string, unknown>;
    const linkList = promotionLinks?.promotion_link as Array<Record<string, string>>;

    if (linkList && linkList.length > 0) {
      return {
        promotionUrl: linkList[0].promotion_link,
        originalUrl: productUrl,
      };
    }

    logger.warn("No affiliate link generated", { productUrl });
    return null;
  } catch (error) {
    logger.error("Failed to generate affiliate link", { productUrl, error: String(error) });
    return null;
  }
}

/**
 * Search for trending/hot products
 */
export async function searchProducts(
  keywords: string,
  category?: string,
  maxResults: number = 10
): Promise<ProductDetail[]> {
  try {
    const params: Record<string, string> = {
      keywords,
      max_sale_price: "10000",
      min_sale_price: "100",
      page_no: "1",
      page_size: String(maxResults),
      sort: "SALE_PRICE_ASC",
      target_currency: "USD",
      target_language: "EN",
      tracking_id: process.env.ALIEXPRESS_AFFILIATE_ID || "",
    };

    if (category) {
      params.category_ids = category;
    }

    const result = await apiCall(
      "aliexpress.affiliate.product.query",
      params
    ) as Record<string, unknown>;

    const response = result?.aliexpress_affiliate_product_query_response as Record<string, unknown>;
    const respResult = response?.resp_result as Record<string, unknown>;
    const data = respResult?.result as Record<string, unknown>;
    const products = data?.products as Record<string, unknown>;
    const productList = products?.product as Array<Record<string, unknown>>;

    if (!productList || productList.length === 0) {
      logger.warn("No products found", { keywords });
      return [];
    }

    return productList.map((p) => ({
      productId: String(p.product_id || ""),
      title: String(p.product_title || ""),
      price: `$${p.target_sale_price || p.target_original_price || "0"}`,
      imageUrl: String(p.product_main_image_url || ""),
      rating: Number(p.evaluate_rate?.toString().replace("%", "")) / 20 || 0,
      orders: Number(p.lastest_volume || 0),
      affiliateUrl: String(p.promotion_link || ""),
    }));
  } catch (error) {
    logger.error("Product search failed", { keywords, error: String(error) });
    return [];
  }
}

/**
 * Get hot/trending products by category
 */
export async function getHotProducts(categoryId?: string): Promise<ProductDetail[]> {
  try {
    const params: Record<string, string> = {
      target_currency: "USD",
      target_language: "EN",
      tracking_id: process.env.ALIEXPRESS_AFFILIATE_ID || "",
      page_no: "1",
      page_size: "10",
    };

    if (categoryId) {
      params.category_ids = categoryId;
    }

    const result = await apiCall(
      "aliexpress.affiliate.hotproduct.query",
      params
    ) as Record<string, unknown>;

    const response = result?.aliexpress_affiliate_hotproduct_query_response as Record<string, unknown>;
    const respResult = response?.resp_result as Record<string, unknown>;
    const data = respResult?.result as Record<string, unknown>;
    const products = data?.products as Record<string, unknown>;
    const productList = products?.product as Array<Record<string, unknown>>;

    if (!productList || productList.length === 0) {
      logger.warn("No hot products found", { categoryId });
      return [];
    }

    return productList.map((p) => ({
      productId: String(p.product_id || ""),
      title: String(p.product_title || ""),
      price: `$${p.target_sale_price || p.target_original_price || "0"}`,
      imageUrl: String(p.product_main_image_url || ""),
      rating: Number(p.evaluate_rate?.toString().replace("%", "")) / 20 || 0,
      orders: Number(p.lastest_volume || 0),
      affiliateUrl: String(p.promotion_link || ""),
    }));
  } catch (error) {
    logger.error("Hot products query failed", { categoryId, error: String(error) });
    return [];
  }
}
