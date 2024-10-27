import { FC, PropsWithChildren } from 'react'
import { useSetUserData } from '../hooks/use-set-user-data'
import { useUserQuery } from '../queries/use-user-query'

export const AuthenticationInitializer: FC<PropsWithChildren> = ({
    children,
}) => {
    const setUserData = useSetUserData()

    const { data, isPending, isSuccess } = useUserQuery()

    if (isPending) {
        return <div> Loading...</div>
    }

    if (isSuccess && data) {
        setUserData(data)
    }

    return <>{children}</>
}
