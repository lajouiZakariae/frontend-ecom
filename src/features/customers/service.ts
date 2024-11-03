import { apiClient } from '@/api-client'
import { UserFormValues } from './types'

export class CustomerService {
    static async getPaginatedAndFilteredCustomers(params: Record<string, unknown>) {
        const { data } = await apiClient.get('users', { params })
        return data
    }

    static async createCustomer(data: UserFormValues) {
        return await apiClient.post('users', data)
    }

    static async updateCustomer(id: number, data: UserFormValues) {
        return await apiClient.put(`users/${id}`, data)
    }

    static async getCustomerById(customerId: number) {
        const { data } = await apiClient.get(`users/${customerId}`)
        return data
    }
}
