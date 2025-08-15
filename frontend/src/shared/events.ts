type EventPayload = Record<string, unknown> | undefined;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function emit(eventName: string, payload?: EventPayload) {
  if (!window.dataLayer) window.dataLayer = [];
  window.dataLayer.push({ event: eventName, ...(payload || {}) });
}


