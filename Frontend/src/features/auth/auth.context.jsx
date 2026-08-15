import { createContext, useState, useEffect } from "react";
import { login, register, getMe, logout } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    async function handleRegister({ username, email, password }) {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            setUser(data.user)
            return data
        } finally {
            setLoading(false)
        }
    }

    async function handleLogin({ username, email, password }) {
        setLoading(true)
        try {
            const data = await login({ username, email, password })
            setUser(data.user)
            return data
        } finally {
            setLoading(false)
        }
    }

    async function handleGetMe() {
        setLoading(true)
        try {
            const data = await getMe()
            setUser(data.user)
        } catch {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    async function handleLogout() {
        setLoading(true)
        try {
            await logout()
        } finally {
            setUser(null)
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe()
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            loading,
            setLoading,
            handleRegister,
            handleLogin,
            handleLogout,
            handleGetMe
        }}>
            {children}
        </AuthContext.Provider>
    )
}