import { FC, PropsWithChildren } from 'react'
import { useSetUserData } from '../hooks/use-set-user-data'
import { useUserQuery } from '../queries/use-user-query'
import { FullScreenLoader } from '@/components/full-screen-loader'

export const AuthenticationInitializer: FC<PropsWithChildren> = ({ children }) => {
    const setUserData = useSetUserData()

    const { data, isPending, isSuccess } = useUserQuery()

    if (isPending) {
        return <FullScreenLoader />
    }

    if (isSuccess && data) {
        setUserData(data)
    }

    return <>{children}</>
}
