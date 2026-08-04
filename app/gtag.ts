export const GA_MEASUREMENT_ID = "G-X5B2BRF4WY";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(
  action: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, params);
}
