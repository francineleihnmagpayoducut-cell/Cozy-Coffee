import type { Actions, ServerLoad } from "@sveltejs/kit";
import { readCartFromCookie, writeCartCookie, computeSubtotal, type CartItem } from "$lib/cart";

export const load: ServerLoad = async ({ cookies }) => {
  const cart = readCartFromCookie(cookies.get("cart"));
  const subtotal = computeSubtotal(cart);

  // Expanded product list
  const products = {
    hot: [
      { id: 1, name: "Espresso", price: 100 },
      { id: 2, name: "Latte", price: 150 },
      { id: 3, name: "Cappuccino", price: 120 },
      { id: 4, name: "Mocha", price: 140 },
      { id: 5, name: "Flat White", price: 130 }
    ],
    cold: [
      { id: 6, name: "Iced Americano", price: 110 },
      { id: 7, name: "Iced Latte", price: 150 },
      { id: 8, name: "Iced Mocha", price: 160 },
      { id: 9, name: "Cold Brew", price: 170 }
    ],
    pastry: [
      { id: 10, name: "Croissant", price: 80 },
      { id: 11, name: "Chocolate Chip Cookie", price: 75 },
      { id: 12, name: "Blueberry Muffin", price: 90 },
      { id: 13, name: "Cinnamon Roll", price: 95 }
    ],
    frappe: [
      { id: 14, name: "Caramel Frappe", price: 180 },
      { id: 15, name: "Mocha Frappe", price: 185 },
      { id: 16, name: "Vanilla Frappe", price: 175 }
    ],
    tea: [
      { id: 17, name: "Green Tea", price: 100 },
      { id: 18, name: "Black Tea", price: 95 },
      { id: 19, name: "Milk Tea", price: 120 }
    ],
    sandwich: [
      { id: 20, name: "Ham & Cheese Sandwich", price: 150 },
      { id: 21, name: "Chicken Sandwich", price: 160 },
      { id: 22, name: "Tuna Sandwich", price: 155 }
    ]
  };

  return { products, cart, subtotal };
};

export const actions: Actions = {
  add: async ({ request, cookies }) => {
    const form = await request.formData();
    const id = Number(form.get("id"));
    const name = String(form.get("name"));
    const price = Number(form.get("price"));
    const qty = Number(form.get("qty") ?? 1);

    let cart = readCartFromCookie(cookies.get("cart"));
    const existing = cart.find((i) => i.id === id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id, name, price, qty } as CartItem);
    }

    writeCartCookie(cookies.set, cart);
    return { success: true };
  }
};
