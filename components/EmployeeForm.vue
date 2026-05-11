<script setup lang="ts">
import type { Employee } from '~/types/employee'

const props = defineProps<{
  initial?: Partial<Employee>
  title: string
}>()

const emit = defineEmits<{
  submit: [employee: Employee]
}>()

const form = reactive<Employee>({
  id: props.initial?.id ?? 0,
  firstName: props.initial?.firstName ?? '',
  lastName: props.initial?.lastName ?? '',
  email: props.initial?.email ?? '',
  phone: props.initial?.phone ?? '',
  position: props.initial?.position ?? ''
})

const touched = reactive({
  firstName: false,
  lastName: false,
  email: false,
  phone: false,
  position: false
})

const errors = computed(() => ({
  firstName: !form.firstName.trim() ? 'First Name is required.' : '',
  lastName: !form.lastName.trim() ? 'Last Name is required.' : '',
  phone: !form.phone.trim() ? 'Phone is required.' : '',
  email: !form.email.trim()
    ? 'Email is required.'
    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? 'Email is invalid.'
      : '',
  position: !form.position.trim() ? 'Position is required.' : ''
}))

const isFormValid = computed(() => Object.values(errors.value).every(e => !e))

function onSubmit() {
  Object.keys(touched).forEach(k => ((touched as Record<string, boolean>)[k] = true))
  if (!isFormValid.value) return
  emit('submit', { ...form })
}
</script>

<template>
  <h2 class="text-center my-5">{{ title }}</h2>

  <form class="border rounded p-4 w-50 mx-auto" @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="firstName" class="form-label">
        First Name <sup class="text-danger ms-1">*</sup>
      </label>
      <input
        id="firstName"
        v-model="form.firstName"
        type="text"
        class="form-control"
        @blur="touched.firstName = true"
      />
      <div v-if="touched.firstName && errors.firstName" class="mt-2 text-danger">
        {{ errors.firstName }}
      </div>
    </div>

    <div class="mb-3">
      <label for="lastName" class="form-label">
        Last Name <sup class="text-danger ms-1">*</sup>
      </label>
      <input
        id="lastName"
        v-model="form.lastName"
        type="text"
        class="form-control"
        @blur="touched.lastName = true"
      />
      <div v-if="touched.lastName && errors.lastName" class="mt-2 text-danger">
        {{ errors.lastName }}
      </div>
    </div>

    <div class="mb-3">
      <label for="phone" class="form-label">
        Phone <sup class="text-danger ms-1">*</sup>
      </label>
      <input
        id="phone"
        v-model="form.phone"
        type="tel"
        class="form-control"
        @blur="touched.phone = true"
      />
      <div v-if="touched.phone && errors.phone" class="mt-2 text-danger">
        {{ errors.phone }}
      </div>
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">
        Email <sup class="text-danger ms-1">*</sup>
      </label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        class="form-control"
        aria-describedby="emailHelp"
        @blur="touched.email = true"
      />
      <div v-if="touched.email && errors.email" class="mt-2 text-danger">
        {{ errors.email }}
      </div>
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>

    <div class="mb-3">
      <label for="position" class="form-label">
        Position <sup class="text-danger ms-1">*</sup>
      </label>
      <input
        id="position"
        v-model="form.position"
        type="text"
        class="form-control"
        @blur="touched.position = true"
      />
      <div v-if="touched.position && errors.position" class="mt-2 text-danger">
        {{ errors.position }}
      </div>
    </div>

    <div class="row">
      <div class="col-8"></div>
      <div class="col-4">
        <button type="submit" class="btn btn-primary mt-3 w-100" :disabled="!isFormValid">
          Save
        </button>
      </div>
    </div>
  </form>
</template>
