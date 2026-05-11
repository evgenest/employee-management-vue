<script setup lang="ts">
import type { Employee } from '~/types/employee'

const router = useRouter()
const api = useEmployeeApi()
const errorMessage = ref('')

async function handleSubmit(employee: Employee) {
  try {
    await api.create(employee)
    await router.push('/')
  } catch (err: unknown) {
    errorMessage.value = err instanceof Error ? err.message : 'An error occurred.'
  }
}
</script>

<template>
  <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
  <EmployeeForm title="Create Employee" @submit="handleSubmit" />
</template>
