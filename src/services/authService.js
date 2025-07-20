// Servicio para manejar tokens de autenticación
export const authService = {
    // Generar token simulado
    generateToken: (username) => {
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2);
        return `${username}_${timestamp}_${randomString}`;
    },

    // Guardar token en localStorage
    saveToken: (token) => {
        localStorage.setItem('authToken', token);
    },

    // Obtener token del localStorage
    getToken: () => {
        return localStorage.getItem('authToken');
    },

    // Eliminar token del localStorage
    removeToken: () => {
        localStorage.removeItem('authToken');
    },

    // Verificar si hay token válido
    isAuthenticated: () => {
        const token = localStorage.getItem('authToken');
        return token !== null;
    },

    // Validar credenciales y generar token
    login: (username, password) => {
        if (username === 'admin' && password === 'admin123') {
            const token = authService.generateToken(username);
            authService.saveToken(token);
            return { success: true, token };
        }
        return { success: false, message: 'Credenciales incorrectas' };
    },

    // Cerrar sesión
    logout: () => {
        authService.removeToken();
    }
}; 