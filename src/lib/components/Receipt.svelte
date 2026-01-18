<script lang="ts">
  export let customerName: string = "";
  export let paymentMethod: string = "";
  export let cart: { id: number; name: string; price: number; qty: number }[] = [];
  export let subtotal: number = 0;
  export let discount: number = 0;
  export let tax: number = 0;
  export let total: number = 0;

  function printReceipt() {
    window.print();
  }
</script>

<div class="border rounded p-4 bg-white shadow-md w-80 font-mono">
  <h2 class="text-center text-lg font-bold mb-2">☕ My Coffee Shop</h2>
  <p class="text-center text-sm mb-4">Dinalupihan, Bataan</p>

  <p><strong>Customer:</strong> {customerName}</p>
  <p><strong>Payment:</strong> {paymentMethod}</p>
  <hr class="my-2" />

  <ul class="space-y-1">
    {#each cart as item}
      <li class="flex justify-between">
        <span>{item.name} × {item.qty}</span>
        <span>₱{item.price * item.qty}</span>
      </li>
    {/each}
  </ul>

  <hr class="my-2" />
  <p>Subtotal: ₱{subtotal}</p>
  {#if discount > 0}
    <p>Discount: −₱{discount}</p>
  {/if}
  <p>Tax: ₱{tax}</p>
  <p class="font-bold">Total: ₱{total}</p>

  <hr class="my-2" />
  <p class="text-center text-sm">Thank you for your purchase!</p>

  <button
    on:click={printReceipt}
    class="mt-4 w-full px-3 py-2 rounded bg-gray-800 text-white hover:bg-black"
  >
    🖨️ Print Receipt
  </button>
</div>
