<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

// Initialize auth
const { user, isAuthenticated, logout, initAuth } = useAuth();

onMounted(() => {
  initAuth();
});

const handleLogout = () => {
  logout();
};
</script>

<template>
  <div>
    <!-- Query Client from Vue Query (handled by @hebilicious/vue-query-nuxt) -->
    
    <!-- Header -->
    <header class="bg-white dark:bg-gray-900 shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="text-xl font-bold text-gray-900 dark:text-white">
              Блог
            </NuxtLink>
          </div>
          
          <div class="flex items-center gap-4">
            <div v-if="isAuthenticated && user" class="flex items-center gap-3">
              <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ user.username }}
              </span>
              <button
                @click="handleLogout"
                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Выйти
              </button>
            </div>
            
            <NuxtLink
              v-else
              to="/login"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Войти
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <NuxtPage />
  </div>
</template>
