import { useAuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';

export default function Admin() {
    const { user } = useAuthContext();
    const currentToken = authService.getToken();

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem'
        }}>
            <h1 style={{ color: '#333', marginBottom: '2rem' }}>
                Panel de Administración
            </h1>

            {/* Información del Token */}
            <div style={{
                backgroundColor: '#e3f2fd',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '2rem',
                border: '1px solid #2196f3'
            }}>
                <h3 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>
                    Información de Autenticación
                </h3>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                    <strong>Usuario:</strong> {user}
                </p>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                    <strong>Token actual:</strong> {currentToken}
                </p>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                    <strong>Estado:</strong> Autenticado ✅
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #dee2e6'
                }}>
                    <h3 style={{ color: '#333', marginBottom: '1rem' }}>
                        Gestión de Productos
                    </h3>
                    <p style={{ color: '#666' }}>
                        Aquí puedes agregar, editar o eliminar productos del catálogo.
                    </p>
                    <button style={{
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '1rem'
                    }}>
                        Gestionar Productos
                    </button>
                </div>

                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #dee2e6'
                }}>
                    <h3 style={{ color: '#333', marginBottom: '1rem' }}>
                        Pedidos
                    </h3>
                    <p style={{ color: '#666' }}>
                        Revisa y gestiona los pedidos de los clientes.
                    </p>
                    <button style={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '1rem'
                    }}>
                        Ver Pedidos
                    </button>
                </div>

                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #dee2e6'
                }}>
                    <h3 style={{ color: '#333', marginBottom: '1rem' }}>
                        Estadísticas
                    </h3>
                    <p style={{ color: '#666' }}>
                        Revisa las estadísticas de ventas y visitas.
                    </p>
                    <button style={{
                        backgroundColor: '#ffc107',
                        color: 'black',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '1rem'
                    }}>
                        Ver Estadísticas
                    </button>
                </div>
            </div>
        </div>
    );
} 