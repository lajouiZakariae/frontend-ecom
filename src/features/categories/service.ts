import { apiClient } from '@/api-client'

export class CategoryService {
    static async getPaginatedAndFilteredCategories(params: Record<string, unknown>) {
        const { data } = await apiClient.get('categories', { params })
        return data
    }

    static async createCategory(data: FormData) {
        return await apiClient.post('categories', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    static async updateCategory(id: number, data: FormData) {
        data.append('_method', 'PUT')

        return await apiClient.post(`categories/${id}`, data)
    }

    static async getCategoryById(customerId: number) {
        const { data } = await apiClient.get(`categories/${customerId}`)
        return data
    }

    static async deleteById(id: number) {
        return await apiClient.delete(`categories/${id}`)
    }

    static async deleteMany(ids: number[]) {
        return await apiClient.delete('categories', { data: { ids } })
    }
}
