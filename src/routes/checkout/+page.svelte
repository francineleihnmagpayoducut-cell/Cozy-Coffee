<script lang="ts">
  import { toast } from "svelte-sonner";

  export let data: {
    cart: { id: number; name: string; price: number; qty: number }[];
    subtotal: number;
  };

  let customerName = "";
  let contactNumber = "";
  let address = "";
  let paymentMethod = "Cash";

  const submitOrder = async () => {
    const form = new FormData();
    form.append("customerName", customerName);
    form.append("contactNumber", contactNumber);
    form.append("address", address);
    form.append("paymentMethod", paymentMethod);

    const res = await fetch("?/submit", { method: "POST", body: form });

    if (res.ok) {
      toast.success(`✅ Order submitted successfully! Thank you, ${customerName}.`);
    } else {
      toast.error("❌ Failed to submit order.");
    }
  };

  const printReceipt = () => {
    const receipt = document.getElementById("receipt-section")?.innerHTML;
    const printWindow = window.open("", "", "width=600,height=800");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { text-align: center; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              .total { font-weight: bold; text-align: right; margin-top: 20px; }
            </style>
          </head>
          <body>
            ${receipt}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };
</script>

<div class="p-6 max-w-4xl mx-auto space-y-8">
  <h1 class="text-3xl font-bold">Checkout</h1>

  <!-- 📝 Customer Form (TOP) -->
  <form
    class="space-y-4 border rounded-lg p-6 bg-white shadow"
    on:submit|preventDefault={submitOrder}
  >
    <h2 class="text-xl font-semibold mb-2">Customer Information</h2>
    <input type="text" bind:value={customerName} placeholder="Name" class="w-full border rounded p-2" required />
    <input type="tel" bind:value={contactNumber} placeholder="Contact Number" class="w-full border rounded p-2" required />
    <textarea bind:value={address} placeholder="Address" class="w-full border rounded p-2" rows="3" required></textarea>
    <select bind:value={paymentMethod} class="w-full border rounded p-2">
      <option>Cash</option>
      <option>Credit Card</option>
      <option>GCash</option>
    </select>
    <button type="submit" class="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      ✅ Submit Order
    </button>
  </form>

  <!-- 🛒 Order Summary (BOTTOM) -->
  {#if data.cart.length === 0}
    <p class="text-gray-500">Your cart is empty.</p>
  {:else}
    <div class="border rounded-lg p-6 bg-gray-50 shadow">
      <h2 class="text-xl font-semibold mb-4">Your Order</h2>
      <table class="w-full border-collapse text-sm">
        <thead class="bg-gray-200">
          <tr>
            <th class="p-2 text-left">Product</th>
            <th class="p-2 text-left">Price</th>
            <th class="p-2 text-left">Qty</th>
            <th class="p-2 text-left">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {#each data.cart as item}
            <tr class="border-b">
              <td class="p-2">{item.name}</td>
              <td class="p-2">₱{item.price}</td>
              <td class="p-2">{item.qty}</td>
              <td class="p-2">₱{item.price * item.qty}</td>
            </tr>
          {/each}
        </tbody>
      </table>

      <div class="mt-6 flex justify-between items-center">
        <p class="text-lg font-bold">Total: ₱{data.subtotal}</p>
        <button
          on:click={printReceipt}
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          🖨️ Print Receipt
        </button>
      </div>
    </div>
  {/if}
</div>

<!-- 🧾 Hidden Receipt Section -->
<div id="receipt-section" style="display:none">
  <h1>☕ Café Receipt</h1>
  <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
  <p><strong>Customer:</strong> {customerName}</p>
  <p><strong>Contact:</strong> {contactNumber}</p>
  <p><strong>Payment:</strong> {paymentMethod}</p>
  <table>
    <thead>
      <tr>
        <th>Product</th><th>Price</th><th>Qty</th><th>Subtotal</th>
      </tr>
    </thead>
    <tbody>
      {#each data.cart as item}
        <tr>
          <td>{item.name}</td>
          <td>₱{item.price}</td>
          <td>{item.qty}</td>
          <td>₱{item.price * item.qty}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <p class="total">Total: ₱{data.subtotal}</p>
  <p style="text-align:center; margin-top:20px">Thank you for your order! ☕</p>
</div>
