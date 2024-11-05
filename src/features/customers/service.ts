import { apiClient } from '@/api-client'
import { CustomerFormValues } from './types'

export class CustomerService {
    static async getPaginatedAndFilteredCustomers(params: Record<string, unknown>) {
        const { data } = await apiClient.get('users', { params })
        return data
    }

    static async createCustomer(data: CustomerFormValues) {
        return await apiClient.post('users', data)
    }

    static async updateCustomer(id: number, data: CustomerFormValues) {
        return await apiClient.put(`users/${id}`, data)
    }

    static async getCustomerById(customerId: number) {
        const { data } = await apiClient.get(`users/${customerId}`)
        return data
    }

    static async deleteById(id: number) {
        return await apiClient.delete(`users/${id}`)
    }

    static async deleteMany(ids: number[]) {
        return await apiClient.delete('users', { data: { ids } })
    }
}
