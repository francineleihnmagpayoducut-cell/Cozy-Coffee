import type { Actions, ServerLoad } from "@sveltejs/kit";
import { readCartFromCookie, writeCartCookie, computeSubtotal } from "$lib/cart";

export const load: ServerLoad = async ({ cookies }) => {
  // Read cart from cookie
  const cart = readCartFromCookie(cookies.get("cart"));
  const subtotal = computeSubtotal(cart);

  return { cart, subtotal };
};

export const actions: Actions = {
  inc: async ({ request, cookies }) => {
    const form = await request.formData();
    const id = Number(form.get("id"));

    const cart = readCartFromCookie(cookies.get("cart"));
    const item = cart.find((i) => i.id === id);
    if (item) item.qty += 1;

    writeCartCookie(cookies.set, cart);
    return { success: true };
  },

  dec: async ({ request, cookies }) => {
    const form = await request.formData();
    const id = Number(form.get("id"));

    const cart = readCartFromCookie(cookies.get("cart"));
    const item = cart.find((i) => i.id === id);
    if (item) item.qty = Math.max(1, item.qty - 1);

    writeCartCookie(cookies.set, cart);
    return { success: true };
  },

  remove: async ({ request, cookies }) => {
    const form = await request.formData();
    const id = Number(form.get("id"));

    let cart = readCartFromCookie(cookies.get("cart"));
    cart = cart.filter((i) => i.id !== id);

    writeCartCookie(cookies.set, cart);
    return { success: true };
  }
};
