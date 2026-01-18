<script lang="ts">
  export let cart: { id: number; name: string; price: number; qty: number }[] = [];

  // Group items by category based on id ranges
  const categories = {
    coffee: cart.filter((item) => item.id >= 1 && item.id <= 10),
    pastries: cart.filter((item) => item.id >= 11 && item.id <= 15),
    drinks: cart.filter((item) => item.id >= 16 && item.id <= 20)
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
</script>

<div class="space-y-6">
  {#if categories.coffee.length}
    <div>
      <h2 class="text-lg font-semibold mb-2">☕ Coffee</h2>
      <ul class="space-y-1">
        {#each categories.coffee as item}
          <li class="flex justify-between">
            <span>{item.name} × {item.qty}</span>
            <span>₱{item.price * item.qty}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  {#if categories.pastries.length}
    <div>
      <h2 class="text-lg font-semibold mb-2">🥐 Pastries</h2>
      <ul class="space-y-1">
        {#each categories.pastries as item}
          <li class="flex justify-between">
            <span>{item.name} × {item.qty}</span>
            <span>₱{item.price * item.qty}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  {#if categories.drinks.length}
    <div>
      <h2 class="text-lg font-semibold mb-2">🍹 Non‑coffee Drinks</h2>
      <ul class="space-y-1">
        {#each categories.drinks as item}
          <li class="flex justify-between">
            <span>{item.name} × {item.qty}</span>
            <span>₱{item.price * item.qty}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}

  <div class="flex justify-between font-bold border-t pt-2">
    <span>Total</span>
    <span>₱{total}</span>
  </div>
</div>
