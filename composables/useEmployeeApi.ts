import type { Employee } from '~/types/employee'

export function useEmployeeApi() {
  const config = useRuntimeConfig()
  const base = `${config.public.apiBaseUrl}/employee`

  return {
    getAll: () => $fetch<Employee[]>(base),
    getById: (id: number) => $fetch<Employee>(`${base}/${id}`),
    create: (data: Omit<Employee, 'id'>) => $fetch<Employee>(base, { method: 'POST', body: data }),
    update: (data: Employee) => $fetch<Employee>(`${base}/${data.id}`, { method: 'PUT', body: data }),
    remove: (id: number) => $fetch(`${base}/${id}`, { method: 'DELETE' })
  }
}
