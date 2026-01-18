<script lang="ts">
  export let data: {
    totalSales: number;
    totalCustomers: number;
    lowStock: number;
    transactions: { date: string; amount: number }[];
  };
</script>

<div class="p-6 space-y-8">
  <h1 class="text-2xl font-bold">📊 Admin Dashboard</h1>

  <!-- Summary Cards -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="rounded-lg border p-4 shadow bg-white">
      <h2>🛒 Total Sales</h2>
      <p class="text-2xl font-bold">₱{data.totalSales}</p>
    </div>
    <div class="rounded-lg border p-4 shadow bg-white">
      <h2>👥 Customers</h2>
      <p class="text-2xl font-bold">{data.totalCustomers}</p>
    </div>
    <div class="rounded-lg border p-4 shadow bg-white">
      <h2>⚠️ Low Stock</h2>
      <p class="text-2xl font-bold">{data.lowStock}</p>
    </div>
  </div>

  <!-- Transactions Table -->
  <div class="rounded-lg border p-4 shadow bg-white">
    <h2 class="text-lg font-semibold mb-4">📑 Transactions</h2>
    {#if data.transactions.length === 0}
      <p class="text-gray-500">No transactions yet.</p>
    {:else}
      <table class="w-full border-collapse text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="p-2 text-left">Date</th>
            <th class="p-2 text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {#each data.transactions as tx}
            <tr class="border-b">
              <td class="p-2">{new Date(tx.date).toLocaleString("en-PH")}</td>
              <td class="p-2">₱{tx.amount}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</div>
