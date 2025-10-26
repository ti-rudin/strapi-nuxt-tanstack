# TanStack Vue Query в проекте

## Обзор

Проект использует TanStack Vue Query (@hebilicious/vue-query-nuxt) для управления состоянием асинхронных данных. Это позволяет:

- Автоматическое кэширование данных
- Фоновое обновление (stale-while-revalidate)
- Автоматический refetch при фокусе окна
- Индикаторы загрузки и обработка ошибок
- SSR поддержка из коробки

## Инициализация

Модуль `@hebilicious/vue-query-nuxt` автоматически настраивает Vue Query для Nuxt 3 с поддержкой SSR.

## Использование

### Базовый пример

```typescript
import { useArticlesQuery } from '~/composables/useArticlesQuery';

// В компоненте
const { data, isLoading, isError, error, refetch } = useArticlesQuery();
```

### Доступные состояния

```typescript
const {
  data,           // Данные от сервера
  isLoading,       // Первая загрузка
  isFetching,     // Загрузка (включая background refetch)
  isError,        // Есть ошибка
  error,          // Объект ошибки
  refetch,        // Функция для повторной загрузки
  isRefetching,   // Идет повторная загрузка
} = useArticlesQuery();
```

### В шаблоне

```vue
<template>
  <!-- Loading -->
  <div v-if="isLoading">Загрузка...</div>
  
  <!-- Error -->
  <div v-if="isError">
    Ошибка: {{ error?.message }}
    <button @click="refetch()">Повторить</button>
  </div>
  
  <!-- Success -->
  <div v-else>
    {{ data?.data }}
  </div>
</template>
```

## Создание новых queries

### Добавление нового composable

Создайте файл в `composables/use{Entity}Query.ts`:

```typescript
import { useQuery } from '@tanstack/vue-query';
import type { UseQueryReturnType } from '@tanstack/vue-query';

export const useYourEntityQuery = (options?: {
  enabled?: boolean;
  staleTime?: number;
}): UseQueryReturnType<any, Error> => {
  const { find } = useStrapi();
  
  return useQuery({
    queryKey: ['your-entity'],
    queryFn: async () => {
      return await find('your-entity', { populate: '*' });
    },
    staleTime: options?.staleTime ?? 1000 * 60 * 5,
    enabled: options?.enabled ?? true,
  });
};
```

### Использование с параметрами

```typescript
export const useArticleByIdQuery = (id: string) => {
  const { findOne } = useStrapi();
  
  return useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      return await findOne('articles', id, { populate: '*' });
    },
    enabled: !!id, // Не выполнять запрос если нет id
  });
};
```

## Настройка кэширования

### Опции по умолчанию (в useArticlesQuery)

```typescript
{
  staleTime: 1000 * 60 * 5,        // 5 минут - данные свежие
  gcTime: 1000 * 60 * 10,          // 10 минут - хранение в кэше
  refetchOnWindowFocus: true,      // Refetch при фокусе окна
  refetchOnMount: false,            // Не refetch при монтировании
}
```

### Переопределение опций

```typescript
const { data } = useArticlesQuery({
  staleTime: 1000 * 60 * 2, // 2 минуты
  refetchOnWindowFocus: false, // Отключить auto-refetch
});
```

## Работа с мутациями

Для изменений данных (POST, PUT, DELETE) используйте `useMutation`:

```typescript
import { useMutation, useQueryClient } from '@tanstack/vue-query';

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  const { create } = useStrapi();
  
  return useMutation({
    mutationFn: async (articleData: any) => {
      return await create('articles', articleData);
    },
    onSuccess: () => {
      // Инвалидировать кэш после успешного создания
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

// Использование
const { mutate, isPending } = useCreateArticle();

mutate({ title: 'New Article', content: '...' });
```

## Инвалидация кэша

После мутаций нужно обновить кэш:

```typescript
const queryClient = useQueryClient();

// Инвалидировать все articles queries
queryClient.invalidateQueries({ queryKey: ['articles'] });

// Инвалидировать конкретную query
queryClient.invalidateQueries({ queryKey: ['article', id] });

// Принудительный refetch
queryClient.refetchQueries({ queryKey: ['articles'] });
```

## Infinite Scroll (бесконечная прокрутка)

Для пагинации используйте `useInfiniteQuery`:

```typescript
export const useArticlesInfinite = () => {
  const { find } = useStrapi();
  
  return useInfiniteQuery({
    queryKey: ['articles-infinite'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await find('articles', {
        pagination: { page: pageParam, pageSize: 10 },
        populate: '*',
      });
      return res;
    },
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.meta?.pagination?.page || 1;
      const totalPages = lastPage?.meta?.pagination?.pageCount || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
```

## SSR особенности

Nuxt автоматически дегидратирует/гидратирует состояние Vue Query для SSR. Убедитесь что:

1. Query выполняется в `setup` или при инициализации компонента
2. Используйте `server: false` опцию если не хотите выполнять query на сервере
3. Кэш синхронизируется между сервером и клиентом автоматически

## Отладка

### DevTools (опционально)

Для визуализации состояния кэша установите:

```bash
npm install @tanstack/vue-query-devtools
```

Добавьте в `nuxt.config.ts`:

```typescript
modules: [
  '@hebilicious/vue-query-nuxt',
],
vueQuery: {
  devtools: { enabled: true }
}
```

### Логирование

```typescript
const { data } = useArticlesQuery();

watchEffect(() => {
  console.log('Articles data:', data.value);
});
```

## Частые ошибки

### "Query function must return a Promise"

Убедитесь что `queryFn` возвращает Promise:

```typescript
queryFn: async () => {
  return await find('articles', { populate: '*' }); // ✅ Async function
}

// Неправильно:
queryFn: () => find('articles', { populate: '*' }); // ❌ Нет return
```

### Infinite loop

Проверьте что `queryKey` стабильны:

```typescript
// Плохо - создается новый массив на каждом рендере
queryKey: ['articles', filters]

// Хорошо - используйте computed или стабильную переменную
queryKey: ['articles', computed(() => filters.value)]
```

## Best Practices

1. **Используйте composables** для переиспользования логики
2. **Типизируйте данные** через `shared-types`
3. **Настраивайте staleTime** под ваши нужды
4. **Инвалидируйте кэш** после мутаций
5. **Используйте conditional queries** с `enabled: false`
6. **Обрабатывайте ошибки** через `isError` и `error`

## Миграция с useAsyncData

Если нужно мигрировать существующий код:

**Было:**
```typescript
const { data } = await useAsyncData('articles', () => find('articles'));
```

**Стало:**
```typescript
const { data } = useArticlesQuery();
```

Vue Query предоставляет больше контроля над кэшированием и состояниями загрузки.

