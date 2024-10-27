import { UserDto } from '../dto/user-dto'
import { apiClient } from '@/api-client'

export class AuthApi {
    static async login(credentials: {
        email: string
        password: string
    }): Promise<UserDto> {
        const { data } = await apiClient.post('login', credentials)

        const user = data.data

        const userToken = data.meta.token

        const userModel = new UserDto(
            user.id,
            user.first_name,
            user.last_name,
            user.email,
            user.email_verified_at,
            userToken
        )

        return userModel
    }

    static async logout(): Promise<void> {
        await apiClient.post('logout')
    }
}
