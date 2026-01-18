import type { ServerLoad } from "@sveltejs/kit";

// Helper: group sales by day, week, month
function groupSales(transactions: { date: string; amount: number }[]) {
  const daily: Record<string, number> = {};
  const weekly: Record<string, number> = {};
  const monthly: Record<string, number> = {};

  for (const tx of transactions) {
    const d = new Date(tx.date);

    // Daily key
    const dayKey = d.toLocaleDateString("en-PH");
    daily[dayKey] = (daily[dayKey] ?? 0) + tx.amount;

    // Weekly key (ISO week number)
    const weekKey = `${d.getFullYear()}-W${Math.ceil(
      (d.getDate() - d.getDay() + 1) / 7
    )}`;
    weekly[weekKey] = (weekly[weekKey] ?? 0) + tx.amount;

    // Monthly key
    const monthKey = `${d.getFullYear()}-${d.getMonth() + 1}`;
    monthly[monthKey] = (monthly[monthKey] ?? 0) + tx.amount;
  }

  return {
    dailySales: Object.entries(daily).map(([date, total]) => ({ date, total })),
    weeklySales: Object.entries(weekly).map(([week, total]) => ({ week, total })),
    monthlySales: Object.entries(monthly).map(([month, total]) => ({ month, total }))
  };
}

export const load: ServerLoad = async ({ cookies }) => {
  // Example: transactions stored in cookie (replace with DB later)
  const raw = cookies.get("transactions");
  const transactions: { date: string; amount: number }[] = raw ? JSON.parse(raw) : [];

  const grouped = groupSales(transactions);

  return {
    dailySales: grouped.dailySales,
    weeklySales: grouped.weeklySales,
    monthlySales: grouped.monthlySales
  };
};
