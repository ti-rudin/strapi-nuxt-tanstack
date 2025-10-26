# Типы в проекте

## Быстрый старт

```bash
# Синхронизировать типы из Strapi
npm run synctypes
```

## Структура

```
nuxt-frontend/
├── shared-types/
│   └── index.ts          # Автоматически генерируемые типы
├── scripts/
│   └── synctypes.js      # Скрипт генерации типов
└── .cursorrules-types    # Правила работы с типами
```

## Использование

### Импорт типов

```typescript
import type { StrapiArticle, StrapiCollectionData } from '~/shared-types';
```

### Типизация данных

```typescript
const { data: articles } = await useAsyncData('articles', () =>
  find('articles', { populate: '*' })
) as { data: StrapiCollectionData<StrapiArticle> | null; error: any };
```

### Работа с атрибутами

```typescript
// Получить атрибут статьи
const getArticleAttr = (article: any, attr: string) => {
  if (!article) return '';
  return article[attr] || article.attributes?.[attr] || '';
};

// Использование в шаблоне
{{ getArticleAttr(article, 'title') }}
{{ formatDate(getArticleAttr(article, 'publishedAt')) }}
```

## Добавление нового типа

1. Откройте `scripts/synctypes.js`
2. Найдите функцию `generateTypes()`
3. Добавьте новый интерфейс перед закрывающим backtick:

```javascript
export interface StrapiProduct {
  id: number;
  attributes: {
    name: string;
    price: number;
    description: string;
    image?: StrapiMediaData | null;
    createdAt: string;
    updatedAt: string;
    [key: string]: any;
  };
}
```

4. Запустите `npm run synctypes`
5. Импортируйте и используйте новый тип

## Обновление существующего типа

1. Откройте `scripts/synctypes.js`
2. Найдите нужный интерфейс (например, `StrapiArticleAttributes`)
3. Измените поля
4. Запустите `npm run synctypes`
5. Проверьте результат в `shared-types/index.ts`

## Примеры

### Работа с медиа

```typescript
const getImageUrl = (article: StrapiArticle) => {
  const cover = article.attributes?.cover;
  if (!cover?.attributes?.url) return null;
  return cover.attributes.url;
};
```

### Получение коллекции

```typescript
const articles = await find('articles', { populate: '*' });
// articles.data - массив StrapiArticle
```

### Получение одного объекта

```typescript
const article = await findOne('articles', id);
// article.data - StrapiArticle | null
```

## Vue Query (TanStack Query)

Проект использует Vue Query для продвинутого кэширования и управления состоянием запросов.

### Создание query composable

```typescript
// composables/useArticlesQuery.ts
export const useArticlesQuery = () => {
  const { find } = useStrapi();
  
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => find('articles', { populate: '*' }),
    staleTime: 1000 * 60 * 5, // 5 минут
    gcTime: 1000 * 60 * 30, // 30 минут
    refetchOnWindowFocus: true,
  });
};
```

### Использование в компоненте

```vue
<script setup lang="ts">
const { data, isLoading, isError, error, refetch } = useArticlesQuery();

// Доступны состояния:
// isLoading - идет загрузка
// isError - произошла ошибка  
// error - объект ошибки
// data - данные
// refetch - функция повтора запроса
</script>

<template>
  <div v-if="isLoading">Загрузка...</div>
  <div v-else-if="isError">Ошибка: {{ error.message }}</div>
  <div v-else-if="data">{{ data }}</div>
</template>
```

### Управление кэшем

```typescript
import { useQueryClient } from '@tanstack/vue-query';

const queryClient = useQueryClient();

// Инвалидировать кэш
queryClient.invalidateQueries({ queryKey: ['articles'] });

// Получить данные из кэша
const articles = queryClient.getQueryData(['articles']);
```

## Частые проблемы

### "Property 'X' does not exist"

Скорее всего, нужно обновить тип или использовать `getArticleAttr()` helper

### "Cannot read properties of undefined"

Добавьте проверку на существование объекта:

```typescript
if (!article?.attributes?.title) return '';
```

### Типы не обновляются

Запустите `npm run synctypes` вручную

### Vue Query не подключается

Проверьте, что модуль `@hebilicious/vue-query-nuxt` добавлен в `nuxt.config.ts`


