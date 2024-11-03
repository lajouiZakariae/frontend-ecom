import { apiClient } from '@/api-client'
import { UserFormValues } from './types/user-form-values'

export class CustomerService {
    static async getPaginatedAndFilteredCustomers(params: Record<string, unknown>) {
        const { data } = await apiClient.get('users', { params })
        return data
    }

    static async createCustomer(data: UserFormValues) {
        return await apiClient.post('users', data)
    }

    static async getCustomerById(customerId: string) {
        const { data } = await apiClient.get(`users/${customerId}`)
        return data
    }
}
