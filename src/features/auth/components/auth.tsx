import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserFromStore } from '../hooks/use-user-from-store'

interface AuthProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

export const Auth: FC<AuthProps> = ({ children, fallback }) => {
    const user = useUserFromStore()

    console.log(user)

    if (!user) {
        return fallback || <Navigate to="/login" />
    }

    return <>{children}</>
}
