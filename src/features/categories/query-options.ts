import { queryOptions } from '@tanstack/react-query'
import { CategoryService } from './service'

export const categoryQueryKeys = {
    all: () => ['categories'],
    filtered: (params: Record<string, unknown>) => [...categoryQueryKeys.all(), params],
    findById: (categoryId: number) => [...categoryQueryKeys.all(), categoryId],
}

export const categoryQueryOptions = {
    filtered: (params: Record<string, unknown>) =>
        queryOptions({
            queryKey: categoryQueryKeys.filtered(params),
            queryFn: async () => await CategoryService.getPaginatedAndFilteredCategories(params),
        }),

    findById: (categoryId: number) =>
        queryOptions({
            queryKey: categoryQueryKeys.findById(categoryId),
            queryFn: async () => await CategoryService.getCategoryById(categoryId),
        }),
}
