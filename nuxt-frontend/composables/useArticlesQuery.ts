import type { UseQueryReturnType } from '@tanstack/vue-query';
import type { StrapiArticle } from '~/shared-types';

/**
 * Composable для получения списка статей с использованием TanStack Vue Query
 * 
 * @param options - Опции для настройки запроса
 * @returns UseQueryReturnType с данными, состоянием загрузки и ошибками
 * 
 * @example
 * ```vue
 * const { data, isLoading, isError, error } = useArticlesQuery();
 * ```
 */
export const useArticlesQuery = (options?: {
  enabled?: boolean;
  staleTime?: number;
  refetchOnWindowFocus?: boolean;
}): UseQueryReturnType<any, Error> => {
  const { find } = useStrapi();
  
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const data = await find('articles', {
        populate: '*',
      });
      return data;
    },
    staleTime: options?.staleTime ?? 1000 * 60 * 5, // 5 минут по умолчанию
    gcTime: 1000 * 60 * 10, // время хранения в кэше
    refetchOnWindowFocus: options?.refetchOnWindowFocus ?? true,
    refetchOnMount: false, // Не делать refetch при монтировании компонента
    enabled: options?.enabled ?? true,
  });
};
