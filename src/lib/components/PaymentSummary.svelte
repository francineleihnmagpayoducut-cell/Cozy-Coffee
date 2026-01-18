<script lang="ts">
  export let customerName: string = "";
  export let paymentMethod: string = "";
  export let message: string = "";
</script>

<div class="border rounded p-4 space-y-2 bg-green-50">
  <h2 class="text-lg font-semibold">✅ Payment Confirmation</h2>

  <p><strong>Customer:</strong> {customerName}</p>
  <p><strong>Payment Method:</strong> {paymentMethod}</p>
  <p class="text-green-700 font-medium">{message}</p>
</div>
