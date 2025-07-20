import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Admin() {
    const { user, token } = useAuthContext();

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem'
        }}>
            <h1 style={{ color: '#333', marginBottom: '2rem' }}>
                🛡️ Panel de Administración
            </h1>

            <div style={{
                backgroundColor: '#f8f9fa',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                marginBottom: '2rem'
            }}>
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>
                    Información del Usuario
                </h3>
                <p><strong>Usuario:</strong> {user}</p>
                <p><strong>Token:</strong> {token}</p>
                <p><strong>Estado:</strong> <span style={{ color: '#28a745' }}>✅ Autenticado</span></p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <Link to="/gestion-productos" style={{
                    display: 'block',
                    padding: '1.5rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                }}>
                    📦 Gestionar Productos
                </Link>

                <Link to="/test-mockapi" style={{
                    display: 'block',
                    padding: '1.5rem',
                    backgroundColor: '#28a745',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                }}>
                    🧪 Probar MockAPI
                </Link>
            </div>

            <div style={{
                backgroundColor: '#e3f2fd',
                padding: '1rem',
                borderRadius: '4px',
                border: '1px solid #2196f3'
            }}>
                <h4 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>
                    🔧 Funciones Disponibles
                </h4>
                <ul style={{ color: '#1976d2', fontSize: '0.9rem' }}>
                    <li><strong>Gestionar Productos:</strong> Agregar, editar y eliminar productos</li>
                    <li><strong>Probar MockAPI:</strong> Verificar conexión con la API</li>
                    <li><strong>Ver Carrito:</strong> Gestionar productos en el carrito</li>
                </ul>
            </div>
        </div>
    );
} 