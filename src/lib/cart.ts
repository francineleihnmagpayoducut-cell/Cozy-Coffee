export type CartItem = { id: number; name: string; price: number; qty: number };

export function readCartFromCookie(cookieValue: string | undefined): CartItem[] {
  if (!cookieValue) return [];
  try {
    return JSON.parse(cookieValue) as CartItem[];
  } catch {
    return [];
  }
}

export function writeCartCookie(setCookie: (name: string, value: string, options: any) => void, cart: CartItem[]) {
  setCookie("cart", JSON.stringify(cart), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7
  });
}

export function computeSubtotal(cart: CartItem[]): number {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}
