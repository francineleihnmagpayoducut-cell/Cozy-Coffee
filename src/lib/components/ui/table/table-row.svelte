<script lang="ts">
  export let className = "";
</script>

<tr class={"border-b last:border-0 " + className}>
  <slot />
</tr>
