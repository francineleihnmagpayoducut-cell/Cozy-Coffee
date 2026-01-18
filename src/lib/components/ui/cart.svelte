<script lang="ts">
import { cart } from "$lib/stores/cart";

  import { derived } from 'svelte/store';

  const total = derived(cart, ($cart) =>
    $cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
</script>

<div class="border rounded p-4 bg-gray-50">
  {#if $cart.length === 0}
    <p class="text-gray-500">Cart is empty</p>
  {:else}
    <table class="w-full border-collapse text-sm">
      <thead>
        <tr class="border-b">
          <th class="p-2 text-left">Product</th>
          <th class="p-2 text-left">Price</th>
          <th class="p-2 text-left">Qty</th>
          <th class="p-2 text-left">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {#each $cart as item}
          <tr class="border-b">
            <td class="p-2">{item.name}</td>
            <td class="p-2">₱{item.price}</td>
            <td class="p-2">{item.quantity}</td>
            <td class="p-2">₱{item.price * item.quantity}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <p class="mt-4 font-bold">Total: ₱{$total}</p>
  {/if}
</div>
