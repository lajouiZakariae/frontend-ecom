import { queryOptions } from '@tanstack/react-query'
import { CustomerService } from './service'

export const customerQueryKeys = {
    all: () => ['customers'],
    filtered: (params: Record<string, unknown>) => [...customerQueryKeys.all(), params],
}

export const customerQueryOptions = {
    filtered: (params: Record<string, unknown>) =>
        queryOptions({
            queryKey: customerQueryKeys.filtered(params),
            queryFn: async () => await CustomerService.getPaginatedAndFilteredCustomers(params),
        }),

    findById: (customerId: number) =>
        queryOptions({
            queryKey: ['customers', customerId],
            queryFn: async () => await CustomerService.getCustomerById(customerId),
        }),
}
