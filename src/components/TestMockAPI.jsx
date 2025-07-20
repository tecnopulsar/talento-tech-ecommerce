import React, { useState } from 'react';
import { useProductsContext } from '../context/ProductsContext';

function TestMockAPI() {
    const { products, loading, error, agregarProducto, cargarProductos } = useProductsContext();
    const [testResult, setTestResult] = useState('');
    const [testing, setTesting] = useState(false);

    const testConnection = async () => {
        setTesting(true);
        setTestResult('');

        try {
            // Test 1: Verificar conexión GET
            setTestResult('🔄 Probando conexión GET...\n');

            const response = await fetch('https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson');

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            setTestResult(prev => prev + `✅ GET exitoso: ${data.length} productos encontrados\n`);

            // Test 2: Verificar conexión POST
            setTestResult(prev => prev + '🔄 Probando conexión POST...\n');

            const testProduct = {
                nombre: 'Test Product ' + Date.now(),
                precio: 99.99,
                descripcion: 'Producto de prueba para verificar conexión con MockAPI'
            };

            const postResponse = await fetch('https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: testProduct.nombre,
                    precio: testProduct.precio,
                    descripcion: testProduct.descripcion,
                    marca: 'Wilson',
                    imagen: 'not found',
                    stock: '5'
                }),
            });

            if (!postResponse.ok) {
                throw new Error(`Error POST ${postResponse.status}: ${postResponse.statusText}`);
            }

            const newProduct = await postResponse.json();
            setTestResult(prev => prev + `✅ POST exitoso: Producto creado con ID ${newProduct.id}\n`);

            // Test 3: Verificar conexión DELETE
            setTestResult(prev => prev + '🔄 Probando conexión DELETE...\n');

            const deleteResponse = await fetch(`https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson/${newProduct.id}`, {
                method: 'DELETE',
            });

            if (!deleteResponse.ok) {
                throw new Error(`Error DELETE ${deleteResponse.status}: ${deleteResponse.statusText}`);
            }

            setTestResult(prev => prev + `✅ DELETE exitoso: Producto de prueba eliminado\n`);
            setTestResult(prev => prev + '\n🎉 ¡Todas las pruebas de conexión con MockAPI fueron exitosas!');

            // Recargar productos
            await cargarProductos();

        } catch (error) {
            setTestResult(prev => prev + `❌ Error: ${error.message}`);
        } finally {
            setTesting(false);
        }
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem'
        }}>
            <h2 style={{ color: '#333', marginBottom: '1rem' }}>
                🧪 Prueba de Conexión MockAPI
            </h2>

            <div style={{
                backgroundColor: '#f8f9fa',
                padding: '1rem',
                borderRadius: '4px',
                marginBottom: '1rem'
            }}>
                <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>
                    Estado Actual:
                </h4>
                <p style={{ margin: '0.5rem 0' }}>
                    <strong>Productos cargados:</strong> {loading ? 'Cargando...' : products.length}
                </p>
                <p style={{ margin: '0.5rem 0' }}>
                    <strong>Error:</strong> {error || 'Ninguno'}
                </p>
            </div>

            <button
                onClick={testConnection}
                disabled={testing}
                style={{
                    backgroundColor: testing ? '#6c757d' : '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '4px',
                    cursor: testing ? 'not-allowed' : 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem'
                }}
            >
                {testing ? 'Probando conexión...' : '🧪 Probar Conexión MockAPI'}
            </button>

            {testResult && (
                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '1rem',
                    borderRadius: '4px',
                    border: '1px solid #dee2e6',
                    whiteSpace: 'pre-line',
                    fontFamily: 'monospace',
                    fontSize: '0.9rem'
                }}>
                    <h4 style={{ color: '#333', marginBottom: '0.5rem' }}>
                        Resultado de la Prueba:
                    </h4>
                    {testResult}
                </div>
            )}

            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                backgroundColor: '#e3f2fd',
                borderRadius: '4px',
                border: '1px solid #2196f3'
            }}>
                <h4 style={{ color: '#1976d2', marginBottom: '0.5rem' }}>
                    📋 Información de la API
                </h4>
                <p style={{ color: '#1976d2', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    <strong>URL Base:</strong> https://683c529028a0b0f2fdc6cd58.mockapi.io/api/products/wilson
                </p>
                <p style={{ color: '#1976d2', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    <strong>Métodos soportados:</strong> GET, POST, PUT, DELETE
                </p>
                <p style={{ color: '#1976d2', fontSize: '0.9rem', margin: '0.5rem 0' }}>
                    <strong>Formato:</strong> JSON
                </p>
            </div>
        </div>
    );
}

export default TestMockAPI; 