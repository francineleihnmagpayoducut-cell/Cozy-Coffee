<script lang="ts">
  import ChartComponent from "$lib/ChartComponent.svelte";

  export let data: {
    dailySales: { date: string; total: number }[];
    monthlySales: { month: string; total: number }[];
  };
</script>

<div class="p-6 space-y-8">
  <h1 class="text-2xl font-bold">📑 Accounting Reports</h1>

  <!-- Daily Sales Line Chart -->
  <section>
    <h2 class="text-xl font-semibold mb-2">📆 Daily Sales</h2>
    <ChartComponent
      type="line"
      labels={data.dailySales.map((d) => d.date)}
      datasetLabel="Daily Sales"
      data={data.dailySales.map((d) => d.total)}
      color="rgb(75, 192, 192)"
    />
  </section>

  <!-- Monthly Sales Bar Chart -->
  <section>
    <h2 class="text-xl font-semibold mb-2">📅 Monthly Sales</h2>
    <ChartComponent
      type="bar"
      labels={data.monthlySales.map((m) => m.month)}
      datasetLabel="Monthly Sales"
      data={data.monthlySales.map((m) => m.total)}
      color="rgb(54, 162, 235)"
    />
  </section>
</div>
