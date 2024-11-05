import { queryOptions } from '@tanstack/react-query'
import { CustomerService } from './service'

export const customerQueryKeys = {
    all: () => ['customers'],
    filtered: (params: Record<string, unknown>) => [...customerQueryKeys.all(), params],
    findById: (categoryId: number) => [...customerQueryKeys.all(), categoryId],
}

export const customerQueryOptions = {
    filtered: (params: Record<string, unknown>) =>
        queryOptions({
            queryKey: customerQueryKeys.filtered(params),
            queryFn: async () => await CustomerService.getPaginatedAndFilteredCustomers(params),
        }),

    findById: (customerId: number) =>
        queryOptions({
            queryKey: customerQueryKeys.findById(customerId),
            queryFn: async () => await CustomerService.getCustomerById(customerId),
        }),
}
