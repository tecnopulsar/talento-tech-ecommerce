import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simular delay de red
        setTimeout(() => {
            const result = login(username, password);

            if (result.success) {
                alert(`¡Bienvenido ${username}! Token generado: ${result.token.substring(0, 20)}...`);
                navigate('/admin');
            } else {
                alert(result.message);
            }

            setLoading(false);
        }, 1000);
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '100px auto',
            padding: '2rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #dee2e6'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
                Iniciar Sesión
            </h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
                        Usuario:
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                        required
                        disabled={loading}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
                        Contraseña:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                        required
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        backgroundColor: loading ? '#6c757d' : '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    {loading ? 'Iniciando sesión...' : 'Ingresar'}
                </button>
            </form>

            <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#e9ecef',
                borderRadius: '4px',
                fontSize: '0.9rem',
                color: '#666'
            }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>
                    Credenciales de prueba:
                </p>
                <p style={{ margin: 0 }}>
                    <strong>Usuario:</strong> admin<br />
                    <strong>Contraseña:</strong> admin123
                </p>
            </div>
        </div>
    );
} 