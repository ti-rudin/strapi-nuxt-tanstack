<script setup lang="ts">
import type { StrapiArticle } from '~/shared-types';

// Get Strapi base URL
const config = useRuntimeConfig();
const STRAPI_URL = config.public.strapi?.url || process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// Use Vue Query for data fetching
const { data: articles, isLoading, isError, error, refetch } = useArticlesQuery();

// Helper function to get full image URL
const getImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
};

// Helper function to get article cover URL
const getArticleCoverUrl = (article: any) => {
  if (!article) return null;
  
  // Try different possible structures
  const cover = article.cover || article.attributes?.cover;
  
  if (!cover) return null;
  
  // Handle direct structure
  if (cover.url) {
    return getImageUrl(cover.url);
  }
  
  // Handle nested structure
  const url = cover.data?.attributes?.url || cover.attributes?.url;
  if (url) {
    return getImageUrl(url);
  }
  
  return null;
};

// Helper to get article attribute
const getArticleAttr = (article: any, attr: string) => {
  if (!article) return '';
  return article[attr] || article.attributes?.[attr] || '';
};

// Format date
const formatDate = (date: string | Date) => {
  if (!date) return '';
  const options: any = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(date).toLocaleDateString("en-US", options);
};
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-5xl font-extrabold mb-10 text-center">
      Nuxt.js and Strapi Integration
    </h1>

    <section aria-labelledby="articles-title" class="space-y-8">
      <h2 id="articles-title" class="text-3xl font-bold">Latest Articles</h2>
      <!-- Loading state -->
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Загрузка статей...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="isError" class="text-red-600 dark:text-red-400 p-4 rounded-md bg-red-50 dark:bg-red-900/20">
        <p class="font-semibold">Ошибка загрузки статей</p>
        <p class="text-sm mt-1">{{ error?.message || 'Неизвестная ошибка' }}</p>
        <button 
          @click="refetch()"
          class="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Повторить
        </button>
      </div>
      <div v-else-if="articles?.data && articles.data.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="(article, index) in articles.data"
          :key="index"
          class="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col"
        >
          <NuxtImg
            v-if="getArticleCoverUrl(article)"
            :src="getArticleCoverUrl(article)!"
            :alt="`Cover image for ${getArticleAttr(article, 'title') || 'Article'}`"
            class="w-full h-52 object-cover"
          />

          <div class="p-6 flex flex-col gap-3">
            <h3
              class="text-2xl font-semibold text-gray-900 dark:text-white leading-snug"
            >
              {{ getArticleAttr(article, 'title') }}
            </h3>

            <p class="text-gray-600 dark:text-gray-300 text-sm italic">
              {{ formatDate(getArticleAttr(article, 'publishedAt')) }}
            </p>
            <p
              class="text-gray-700 dark:text-gray-400 text-base leading-relaxed line-clamp-4"
            >
              {{ getArticleAttr(article, 'content') }}
            </p>
          </div>
        </article>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-12">
        <p class="text-gray-600 dark:text-gray-400 text-lg">Нет доступных статей</p>
      </div>
    </section>
  </main>
</template>

