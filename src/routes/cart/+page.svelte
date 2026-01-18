<script lang="ts">
  export let data: {
    cart: { id: number; name: string; price: number; qty: number }[];
    subtotal: number;
  };
</script>

<div class="p-6 max-w-3xl mx-auto">
  <h1 class="text-2xl font-bold mb-4">Cart</h1>

  {#if data.cart.length === 0}
    <p class="text-gray-500">Your cart is empty.</p>
  {:else}
    <table class="w-full border-collapse text-sm">
      <thead>
        <tr class="border-b">
          <th class="text-left p-2">Product</th>
          <th class="text-left p-2">Price</th>
          <th class="text-left p-2">Quantity</th>
          <th class="text-left p-2">Subtotal</th>
          <th class="text-left p-2">Remove</th>
        </tr>
      </thead>
      <tbody>
        {#each data.cart as item}
          <tr class="border-b">
            <td class="p-2">{item.name}</td>
            <td class="p-2">₱{item.price}</td>
            <td class="p-2">
              <form method="post" action="?/dec" class="inline">
                <input type="hidden" name="id" value={item.id} />
                <button class="h-8 w-8 rounded border hover:bg-gray-100" aria-label="Decrease">−</button>
              </form>
              <span class="mx-2">{item.qty}</span>
              <form method="post" action="?/inc" class="inline">
                <input type="hidden" name="id" value={item.id} />
                <button class="h-8 w-8 rounded border hover:bg-gray-100" aria-label="Increase">+</button>
              </form>
            </td>
            <td class="p-2">₱{item.price * item.qty}</td>
            <td class="p-2">
              <form method="post" action="?/remove">
                <input type="hidden" name="id" value={item.id} />
                <button class="text-red-600 hover:underline" aria-label="Remove">✕</button>
              </form>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    <div class="mt-6 p-4 border rounded bg-gray-50 flex justify-between items-center">
      <p class="font-medium">Total: ₱{data.subtotal}</p>
      <a href="/checkout" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Proceed to Checkout
      </a>
    </div>
  {/if}
</div>
