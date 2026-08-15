import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router'

const Protected = ({ children }) => {

    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#121212',
                color: '#ffffff',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                gap: '1rem'
            }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    border: '3px solid rgba(255, 255, 255, 0.15)',
                    borderTopColor: '#1db954',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }} />
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                <p style={{ color: '#b3b3b3', fontSize: '0.9rem', letterSpacing: '0.5px' }}>Loading Moodify...</p>
            </div>
        )
    }
    
    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}

export default Protected