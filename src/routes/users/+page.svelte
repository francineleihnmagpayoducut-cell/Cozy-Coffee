<script lang="ts">
  import { toast } from "svelte-sonner";

  export let data: {
    users: { id: number; name: string; role: string }[];
  };

  const notify = (msg: string) => toast.success(msg);
</script>

<div class="p-6 max-w-4xl mx-auto space-y-8">
  <h1 class="text-2xl font-bold">👥 Manage Users</h1>

  <!-- Add User Form -->
  <form
    method="post"
    action="?/add"
    class="space-y-4 border rounded p-4 bg-white shadow"
    on:submit={() => notify("User added!")}
  >
    <input type="text" name="name" placeholder="Name" class="w-full border rounded p-2" required />
    <select name="role" class="w-full border rounded p-2">
      <option value="ADMIN">Admin</option>
      <option value="USER">User</option>
    </select>
    <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      ➕ Add User
    </button>
  </form>

  <!-- User List -->
  <table class="w-full border-collapse text-sm">
    <thead class="bg-gray-200">
      <tr>
        <th class="p-2 text-left">Name</th>
        <th class="p-2 text-left">Role</th>
        <th class="p-2 text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each data.users as user}
        <tr class="border-b">
          <td class="p-2">{user.name}</td>
          <td class="p-2">{user.role}</td>
          <td class="p-2">
            <form
              method="post"
              action="?/remove"
              on:submit={() => notify("User removed!")}
            >
              <input type="hidden" name="id" value={user.id} />
              <button type="submit" class="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                ❌ Remove
              </button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
