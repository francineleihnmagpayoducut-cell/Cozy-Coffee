<script lang="ts">
  import { toast } from "svelte-sonner";

  export let data: {
    products: Record<string, { id: number; name: string; price: number }[]>;
    cart: { id: number; name: string; price: number; qty: number }[];
    subtotal: number;
  };

  let selectedCategory = "all";
  let searchTerm = "";

  const notifyAdd = (msg: string) => toast.success(msg);

  const categoryIcons: Record<string, string> = {
    hot: "☕",
    cold: "🥶",
    pastry: "🥐",
    frappe: "🥤",
    tea: "🍵",
    sandwich: "🥪"
  };

  $: filteredProducts = Object.entries(data.products)
    .filter(([cat]) => selectedCategory === "all" || cat === selectedCategory)
    .flatMap(([_, items]) => items)
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
</script>

<div class="flex h-screen">
  <!-- 📂 Left Sidebar -->
  <aside class="w-64 bg-gray-100 dark:bg-gray-900 p-4">
    <nav>
      <ul class="space-y-2">
        <li><a href="/dashboard" class="block py-2">📊 Dashboard</a></li>
        <li><a href="/pos" class="block py-2">☕ POS</a></li>
        <li><a href="/cart" class="block py-2">🛒 Cart</a></li>
        <li><a href="/checkout" class="block py-2">✅ Checkout</a></li>
        <li><a href="/users" class="block py-2">👥 Manage Users</a></li>
      </ul>
    </nav>
  </aside>

  <!-- 🛍️ Center Products -->
  <main class="flex-1 p-6 overflow-y-auto">
    <h1 class="text-2xl font-bold mb-4">Products</h1>

    <!-- Search -->
    <input
      type="text"
      bind:value={searchTerm}
      placeholder="Search product..."
      class="w-full p-2 border rounded mb-4"
    />

    <!-- Category Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        on:click={() => (selectedCategory = "all")}
        class="px-3 py-1 rounded border"
        class:selected={selectedCategory === "all"}
      >
        🧾 All
      </button>
      {#each Object.keys(data.products) as cat}
        <button
          on:click={() => (selectedCategory = cat)}
          class="px-3 py-1 rounded border capitalize"
          class:selected={selectedCategory === cat}
        >
          {categoryIcons[cat]} {cat}
        </button>
      {/each}
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
      {#each filteredProducts as p}
        <div class="border rounded-lg p-4 shadow bg-white hover:shadow-lg transition">
          <h3 class="font-medium text-lg">{p.name}</h3>
          <p class="text-gray-600 mb-2">₱{p.price}</p>
          <form
            method="post"
            action="?/add"
            class="flex gap-2"
            on:submit={() => notifyAdd(`${p.name} added!`)}
          >
            <input type="hidden" name="id" value={p.id} />
            <input type="hidden" name="name" value={p.name} />
            <input type="hidden" name="price" value={p.price} />
            <input
              type="number"
              name="qty"
              min="1"
              value="1"
              class="w-16 border rounded p-1 text-center"
            />
            <button
              type="submit"
              class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              ➕ Add
            </button>
          </form>
        </div>
      {/each}
    </div>
  </main>

  <!-- 🧾 Right Cart Summary -->
  <aside class="w-80 bg-gray-50 dark:bg-gray-800 p-6 border-l overflow-y-auto">
    <h2 class="text-xl font-semibold mb-4">Your Order</h2>
    {#if data.cart.length === 0}
      <p class="text-gray-500">Cart is empty.</p>
    {:else}
      <ul class="space-y-3">
        {#each data.cart as item}
          <li class="flex justify-between items-center border-b pb-2">
            <div>
              <span class="font-medium">{item.name}</span>
              <span class="text-sm text-gray-500"> × {item.qty}</span>
            </div>
            <div class="flex items-center gap-2">
              <!-- ➖ Decrease -->
              <form method="post" action="?/update">
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="action" value="decrease" />
                <button type="submit" class="px-2 py-1 bg-gray-300 rounded">➖</button>
              </form>

              <!-- ➕ Increase -->
              <form method="post" action="?/update">
                <input type="hidden" name="id" value={item.id} />
                <input type="hidden" name="action" value="increase" />
                <button type="submit" class="px-2 py-1 bg-gray-300 rounded">➕</button>
              </form>

              <!-- ❌ Remove -->
              <form method="post" action="?/remove">
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" class="px-2 py-1 bg-red-600 text-white rounded">❌</button>
              </form>

              <span class="ml-2">₱{item.price * item.qty}</span>
            </div>
          </li>
        {/each}
      </ul>
      <p class="font-bold mt-4">Total: ₱{data.subtotal}</p>
      <a
        href="/checkout"
        class="block mt-4 bg-green-600 text-white text-center px-4 py-2 rounded hover:bg-green-700"
      >
        ✅ Checkout
      </a>
    {/if}
  </aside>
</div>
