<script lang="ts">
  export let className = "";
</script>

<div
  class={
    "rounded-lg border bg-white shadow-sm " +
    className
  }
>
  <slot />
</div>
