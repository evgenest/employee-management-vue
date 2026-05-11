<template>
  <nav class="navbar bg-primary navbar-expand-sm" data-bs-theme="dark">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/">Employee Management</NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav">
          <NuxtLink class="nav-link" to="/" exact-active-class="active">Home</NuxtLink>
          <NuxtLink class="nav-link" to="/create" active-class="active">Create</NuxtLink>
        </div>
      </div>
    </div>
  </nav>

  <div class="container">
    <NuxtPage />
  </div>
</template>
