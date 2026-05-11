<script setup lang="ts">
import type { Employee } from '~/types/employee'

const route = useRoute()
const router = useRouter()
const api = useEmployeeApi()

const id = Number(route.params.id)

const { data: employee, error } = await useAsyncData(`employee-${id}`, () => api.getById(id))

if (error.value || !employee.value) {
  await navigateTo('/')
}

const errorMessage = ref('')

async function handleSubmit(data: Employee) {
  try {
    await api.update(data)
    await router.push('/')
  } catch (err: unknown) {
    errorMessage.value = err instanceof Error ? err.message : 'An error occurred.'
  }
}
</script>

<template>
  <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
  <EmployeeForm title="Edit Employee" :initial="employee ?? undefined" @submit="handleSubmit" />
</template>
