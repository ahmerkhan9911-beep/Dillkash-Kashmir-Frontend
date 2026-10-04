/**
 * Promo code API service for DillKash Kashmir frontend.
 */
import { api } from "./api";

export interface PromoCode {
  id: number;
  code: string;
  discountPercent: number;
  isActive: boolean;
  createdAt: string;
}

export interface ValidatedPromo {
  valid: true;
  code: string;
  discountPercent: number;
}

/** Same rounding as the server (server/src/models/promo-code.model.js → calculateDiscount). */
export function calculateDiscount(originalPrice: number, discountPercent: number) {
  const discountAmount = Math.round((originalPrice * discountPercent) / 100);
  return { discountAmount, finalPrice: Math.max(0, originalPrice - discountAmount) };
}

/* ───────── User ───────── */

/** Validate a promo code (authenticated). Throws with the server's message if invalid. */
export async function validatePromoCode(code: string): Promise<ValidatedPromo> {
  return api<ValidatedPromo>("/promo/validate", {
    method: "POST",
    body: { code },
  });
}

/* ───────── Admin ───────── */

export async function getPromoCodes(): Promise<PromoCode[]> {
  const data = await api<{ promoCodes: PromoCode[] }>("/admin/promo-codes");
  return data.promoCodes;
}

export async function createPromoCode(code: string, discountPercent: number): Promise<PromoCode> {
  const data = await api<{ promoCode: PromoCode }>("/admin/promo-codes", {
    method: "POST",
    body: { code, discountPercent },
  });
  return data.promoCode;
}

export async function setPromoCodeActive(id: number, isActive: boolean): Promise<PromoCode> {
  const data = await api<{ promoCode: PromoCode }>(`/admin/promo-codes/${id}`, {
    method: "PATCH",
    body: { isActive },
  });
  return data.promoCode;
}
