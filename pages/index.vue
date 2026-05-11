<script setup lang="ts">
const api = useEmployeeApi()

const { data, refresh } = await useAsyncData('employees', () => api.getAll())
const employees = computed(() => data.value ?? [])

async function deleteEmployee(id: number) {
  await api.remove(id)
  await refresh()
}
</script>

<template>
  <h2 class="text-center my-5">Employees</h2>

  <div class="card">
    <div class="card-header">
      <p class="fs-4">Overview</p>
    </div>
    <div class="card-body">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.id }}</td>
            <td>{{ employee.firstName }}</td>
            <td>{{ employee.lastName }}</td>
            <td>{{ employee.phone }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.position }}</td>
            <td>
              <div class="d-sm-flex gap-2">
                <NuxtLink :to="`/edit/${employee.id}`" class="btn btn-primary btn-sm">
                  Edit
                </NuxtLink>
                <button class="btn btn-danger btn-sm" @click="deleteEmployee(employee.id)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
