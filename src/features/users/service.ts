import { apiClient } from '@/api-client';

export class UserService {
    static async getPaginatedAndFilteredUsers(params: Record<string, unknown>) {
        const { data } = await apiClient.get('users', { params });
        return data;
    }
}
