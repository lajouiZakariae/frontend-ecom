export interface UserFormValues {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirmation: string
}

export interface Customer {
    id: number
    first_name: string
    last_name: string
    email: string
    created_at: string
}
