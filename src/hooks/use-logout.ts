import { AuthApi } from '@/features/auth/api/auth-service'
import { useMutation } from '@tanstack/react-query'

export const useLogout = () => {
    const { mutateAsync: logoutAsync, isPending } = useMutation({
        mutationFn: AuthApi.logout,
    })

    return { logoutAsync, isPending }
}
