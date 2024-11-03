import { apiClient } from '@/api-client'

export class AuthApi {
    static async login(credentials: { email: string; password: string }) {
        const { data } = await apiClient.post('login', credentials)

        return data
    }

    static async logout(): Promise<void> {
        await apiClient.post('logout')
    }
}
