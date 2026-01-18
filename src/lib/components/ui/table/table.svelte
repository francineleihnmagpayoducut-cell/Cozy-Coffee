<script lang="ts">
  export let className = "";
</script>

<table class={"w-full border-collapse text-sm " + className}>
  <slot />
</table>
