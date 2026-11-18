export const WHATSAPP_NUMBER = "916380202766";
export const CONTACT_EMAIL = "hello@neoklyn.com";
export const CAL_URL = "https://cal.com/neoklyn";

/** wa.me link with an optional prefilled message. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
