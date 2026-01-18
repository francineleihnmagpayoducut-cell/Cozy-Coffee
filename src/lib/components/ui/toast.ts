import { writable } from "svelte/store";

export type ToastType = "success" | "error" | "info";
export type Toast = { message: string; type: ToastType };

export const toasts = writable<Toast[]>([]);

export function showToast(message: string, type: ToastType = "info") {
  toasts.update((all) => [...all, { message, type }]);
  setTimeout(() => {
    toasts.update((all) => all.slice(1));
  }, 3000);
}
