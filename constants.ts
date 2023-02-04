export const defaultMenuLinks = [
        {
            label: 'about',
            path: '/about',
        },
]

export const userMenuLinks = [
    {
        label: 'profile',
        path: '/profile'
    },    
    {
        label: 'logout',
        path: '/api/auth/logout'
    },
]

export const noUserMenuLinks = [
    {
        label: 'login',
        path: '/api/auth/login'
    }
]


export type headerLinks = {
    path: string,
    label?: string,
    target?: string
}
