export default function Cart({ carrito, onRemoveItem, onIncreaseQuantity, onDecreaseQuantity, onClearCart, onGuardarCarrito, onCargarCarrito }) {
  const total = carrito.reduce((sum, item) => sum + (parseFloat(item.precio || 0) * item.cantidad), 0);

  const handleGuardarCarrito = () => {
    const result = onGuardarCarrito();
    alert(result.message);
  };

  const handleCargarCarrito = () => {
    const result = onCargarCarrito();
    alert(result.message);
  };

  return (
    <div style={{
      backgroundColor: '#f8f9fa',
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #dee2e6'
    }}>
      <h2>Carrito</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: '1px solid #e9ecef'
            }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                <div>${item.precio} x {item.cantidad}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => onDecreaseQuantity(item.id)}
                  style={{
                    backgroundColor: '#ffc107',
                    color: 'black',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  -
                </button>
                <span style={{ minWidth: '20px', textAlign: 'center' }}>
                  {item.cantidad}
                </span>
                <button
                  onClick={() => onIncreaseQuantity(item.id)}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >
                  X
                </button>
              </div>
            </div>
          ))}

          <div style={{
            borderTop: '1px solid #dee2e6',
            paddingTop: '1rem',
            marginTop: '1rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              <span>Total:</span>
              <span>${total}</span>
            </div>

            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <button
                onClick={handleGuardarCarrito}
                style={{
                  backgroundColor: '#17a2b8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                💾 Guardar
              </button>
              <button
                onClick={handleCargarCarrito}
                style={{
                  backgroundColor: '#6f42c1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                📂 Cargar
              </button>
            </div>

            <button
              onClick={onClearCart}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                width: '100%',
                cursor: 'pointer'
              }}
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}
