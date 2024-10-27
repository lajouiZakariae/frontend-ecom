import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useUserFromStore } from '../hooks/use-user-from-store'

interface AuthProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

export const Guest: FC<AuthProps> = ({ children, fallback }) => {
    const user = useUserFromStore()

    if (user) {
        return fallback || <Navigate to="/" />
    }

    return <>{children}</>
}
