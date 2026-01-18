<script lang="ts">
  export let variant: "default" | "ghost" = "default";
  export let className = "";
  export let type: "button" | "submit" | "reset" = "button";
  export let disabled: boolean = false; // ✅ default so TS doesn't require it
</script>

<button
  type={type}
  disabled={disabled}
  class={
    "inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium " +
    (variant === "default"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "border border-gray-300 text-gray-700 hover:bg-gray-100") +
    " " + className
  }
>
  <slot />
</button>
