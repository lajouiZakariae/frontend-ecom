import { apiClient } from '@/api-client'
import { useQuery } from '@tanstack/react-query'

export const useUserQuery = () =>
    useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await apiClient.get('auth-user')
            return data.data
        },
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
