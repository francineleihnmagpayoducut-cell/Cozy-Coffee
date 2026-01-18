import type { Actions, ServerLoad } from "@sveltejs/kit";
import { readCartFromCookie, writeCartCookie, computeSubtotal } from "$lib/cart";

export const load: ServerLoad = async ({ cookies }) => {
  const cart = readCartFromCookie(cookies.get("cart"));
  const subtotal = computeSubtotal(cart);
  return { cart, subtotal };
};

export const actions: Actions = {
  submit: async ({ request, cookies }) => {
    const form = await request.formData();
    const customerName = String(form.get("customerName"));
    const contactNumber = String(form.get("contactNumber"));
    const address = String(form.get("address"));
    const paymentMethod = String(form.get("paymentMethod"));

    // ✅ Read current cart + subtotal
    const cart = readCartFromCookie(cookies.get("cart"));
    const subtotal = computeSubtotal(cart);

    // ✅ Update totals
    const currentSales = Number(cookies.get("totalSales") ?? 0);
    const currentCustomers = Number(cookies.get("totalCustomers") ?? 0);
    cookies.set("totalSales", String(currentSales + subtotal), { path: "/" });
    cookies.set("totalCustomers", String(currentCustomers + 1), { path: "/" });

    // ✅ ⬇️ INSERT YOUR TRANSACTION LOGIC HERE
    const raw = cookies.get("transactions");
    const transactions: { date: string; amount: number }[] = raw ? JSON.parse(raw) : [];
    transactions.push({
      date: new Date().toISOString(),
      amount: subtotal
    });
    cookies.set("transactions", JSON.stringify(transactions), { path: "/" });

    // ✅ Clear cart after checkout
    writeCartCookie(cookies.set, []);

    return {
      success: true,
      message: `Order submitted successfully for ${customerName}!`
    };
  }
};
