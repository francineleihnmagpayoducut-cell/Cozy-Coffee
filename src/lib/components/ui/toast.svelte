<script lang="ts">
  import { toasts } from "./toast";
</script>

<div class="fixed bottom-4 right-4 space-y-2 z-50">
  {#each $toasts as toast}
    <div
      class={
        "px-4 py-2 rounded shadow text-white " +
        (toast.type === "success"
          ? "bg-green-600"
          : toast.type === "error"
          ? "bg-red-600"
          : "bg-blue-600")
      }
    >
      {toast.message}
    </div>
  {/each}
</div>
