import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

// Crear el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Verificar token al cargar la aplicación
    useEffect(() => {
        const checkAuth = () => {
            const token = authService.getToken();
            if (token) {
                // Extraer username del token (formato: username_timestamp_random)
                const username = token.split('_')[0];
                setUser(username);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (username, password) => {
        const result = authService.login(username, password);
        if (result.success) {
            setUser(username);
            return { success: true, token: result.token };
        }
        return { success: false, message: result.message };
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.2rem'
            }}>
                Verificando autenticación...
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: isAuthenticated()
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext debe ser usado dentro de un AuthProvider');
    }
    return context;
}; 