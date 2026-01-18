import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies }) => {
  const totalSales = Number(cookies.get("totalSales") ?? 0);
  const totalCustomers = Number(cookies.get("totalCustomers") ?? 0);
  const lowStock = 3;

  const raw = cookies.get("transactions");
  const transactions: { date: string; amount: number }[] = raw ? JSON.parse(raw) : [];

  return { totalSales, totalCustomers, lowStock, transactions };
};
