import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  if (!event.locals.cart) {
    event.locals.cart = [];
  }
  return resolve(event);
};
