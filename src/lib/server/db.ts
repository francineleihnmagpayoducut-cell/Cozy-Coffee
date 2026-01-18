// Replace with your real DB client (Prisma, D1, Drizzle, etc.)
export type Product = { id: number; name: string; price: number };

export async function getProducts(): Promise<Product[]> {
  // Placeholder; swap with a DB query
  return [
    { id: 1, name: "Espresso", price: 120 },
    { id: 2, name: "Cappuccino", price: 150 },
    { id: 3, name: "Latte", price: 140 },
    { id: 4, name: "Americano", price: 100 }
  ];
}
