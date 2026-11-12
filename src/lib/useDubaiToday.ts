import { useSyncExternalStore } from "react";
import { dubaiToday } from "./booking";
function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, 60_000);
  window.addEventListener("focus", callback);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("focus", callback);
  };
}
// Stable server snapshot avoids a stale build-date minimum during hydration.
export function useDubaiToday() {
  return useSyncExternalStore(subscribe, dubaiToday, () => "");
}
