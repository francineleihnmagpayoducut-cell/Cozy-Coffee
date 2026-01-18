<script lang="ts">
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  export let type: "line" | "bar" | "pie" | "doughnut" = "line";
  export let labels: string[] = [];
  export let datasetLabel: string = "Data";
  export let data: number[] = [];
  export let color: string = "rgb(75, 192, 192)";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    new Chart(canvas, {
      type,
      data: {
        labels,
        datasets: [
          {
            label: datasetLabel,
            data,
            backgroundColor: color,
            borderColor: color,
            fill: type === "line" ? false : true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true }
        }
      }
    });
  });
</script>

<canvas bind:this={canvas}></canvas>
