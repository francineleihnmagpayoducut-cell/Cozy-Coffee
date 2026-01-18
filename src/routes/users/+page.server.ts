import type { Actions, ServerLoad } from "@sveltejs/kit";

type User = { id: number; name: string; role: string };

export const load: ServerLoad = async ({ cookies }) => {
  // For now, store users in a cookie (or replace with DB later)
  const raw = cookies.get("users");
  const users: User[] = raw ? JSON.parse(raw) : [
    { id: 1, name: "Admin", role: "ADMIN" },
    { id: 2, name: "Cashier", role: "USER" }
  ];

  return { users };
};

export const actions: Actions = {
  add: async ({ request, cookies }) => {
    const form = await request.formData();
    const name = String(form.get("name"));
    const role = String(form.get("role"));

    const raw = cookies.get("users");
    const users: User[] = raw ? JSON.parse(raw) : [];
    const newUser: User = { id: Date.now(), name, role };

    users.push(newUser);
    cookies.set("users", JSON.stringify(users), { path: "/" });

    return { success: true };
  },

  remove: async ({ request, cookies }) => {
    const form = await request.formData();
    const id = Number(form.get("id"));

    const raw = cookies.get("users");
    let users: User[] = raw ? JSON.parse(raw) : [];
    users = users.filter((u) => u.id !== id);

    cookies.set("users", JSON.stringify(users), { path: "/" });
    return { success: true };
  }
};
