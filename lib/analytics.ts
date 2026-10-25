import { track } from "@vercel/analytics";

/**
 * Event tracking utility for TechUP Digital.
 * Supports Vercel Analytics with local console fallback in development.
 *
 * SPEC EVENTS (Section 14):
 * - quote_submit
 * - whatsapp_click
 * - booking_click
 * - instagram_click
 * - reel_play
 */

export type AnalyticsEvent =
  | "quote_submit"
  | "whatsapp_click"
  | "booking_click"
  | "instagram_click"
  | "reel_play";

export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean | null | undefined>
) {
  try {
    if (typeof window !== "undefined") {
      // Send to Vercel Analytics
      track(event, properties);

      // Helpful development logger
      if (process.env.NODE_ENV === "development") {
        console.log(`[ANALYTICS] Event: ${event}`, properties || {});
      }
    }
  } catch (err) {
    // Fail silently in non-supported environments
    console.debug(`[ANALYTICS ERROR] Could not track ${event}:`, err);
  }
}
