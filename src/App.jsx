import React, { useState } from 'react';
import data from './data/motos.js';

const TABS = {
  INICIO: 'inicio',
  BICICLETAS: 'bicicletas',
  SCOOTERS: 'scooters',
  CARACTERISTICAS: 'caracteristicas',
  CONTACTO: 'contacto',
  DETALLE: 'detalle',
  ADMIN: 'admin',
};

function Header({ active, onChange, isAdmin, onContactoClick, onSearch, searchTerm }) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    onSearch('');
  };

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleNavClick = (tab) => {
    if (tab === 'contacto') {
      onContactoClick();
    } else {
      onChange(tab);
    }
    setMenuAbierto(false); // Cerrar menú después de hacer clic
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="brand">
          <img src="/img/Logo-URVY-2-blanco.png" alt="Logo URVY" className="brand-logo" />
        </div>
        
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar productos..."
            value={localSearchTerm}
            onChange={handleSearch}
          />
          {localSearchTerm && (
            <button className="search-clear" onClick={clearSearch}>✕</button>
          )}
          <div className="search-icon">🔍</div>
        </div>
        
        {/* Botón hamburguesa para móvil */}
        <button className="menu-hamburguesa" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {/* Navegación desktop */}
        <nav className="nav nav-desktop">
          <button className={active === TABS.INICIO ? 'active' : ''} onClick={() => onChange(TABS.INICIO)}>Inicio</button>
          <button className={active === TABS.BICICLETAS ? 'active' : ''} onClick={() => onChange(TABS.BICICLETAS)}>Bicicletas</button>
          <button className={active === TABS.SCOOTERS ? 'active' : ''} onClick={() => onChange(TABS.SCOOTERS)}>Scooters</button>
          <button className={active === TABS.CARACTERISTICAS ? 'active' : ''} onClick={() => onChange(TABS.CARACTERISTICAS)}>Características</button>
          <button onClick={onContactoClick}>Contacto</button>
          <button className={`${active === TABS.ADMIN ? 'active' : ''} btn-admin`} onClick={() => onChange(TABS.ADMIN)}>
            🔧 Admin {isAdmin && <span className="admin-badge">●</span>}
          </button>
        </nav>
      </div>
      
      {/* Menú móvil desplegable */}
      <nav className={`nav nav-mobile ${menuAbierto ? 'nav-mobile-abierto' : ''}`}>
        <button className={active === TABS.INICIO ? 'active' : ''} onClick={() => handleNavClick(TABS.INICIO)}>
          🏠 Inicio
        </button>
        <button className={active === TABS.BICICLETAS ? 'active' : ''} onClick={() => handleNavClick(TABS.BICICLETAS)}>
          🚲 Bicicletas
        </button>
        <button className={active === TABS.SCOOTERS ? 'active' : ''} onClick={() => handleNavClick(TABS.SCOOTERS)}>
          🛴 Scooters
        </button>
        <button className={active === TABS.CARACTERISTICAS ? 'active' : ''} onClick={() => handleNavClick(TABS.CARACTERISTICAS)}>
          ⚡ Características
        </button>
        <button onClick={() => handleNavClick('contacto')}>
          📞 Contacto
        </button>
        <button className={`${active === TABS.ADMIN ? 'active' : ''} btn-admin`} onClick={() => handleNavClick(TABS.ADMIN)}>
          🔧 Admin {isAdmin && <span className="admin-badge">●</span>}
        </button>
      </nav>
    </header>
  );
}

function Inicio({ onNavigate }) {
  const [imagenActual, setImagenActual] = useState(0);
  const [imgError, setImgError] = useState(false);
  const carruselImagenes = data.hero.carrusel || [data.hero.imagen];

  // Carrusel automático
  React.useEffect(() => {
    const intervalo = setInterval(() => {
      setImagenActual((prev) => (prev + 1) % carruselImagenes.length);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(intervalo);
  }, [carruselImagenes.length]);

  const irAImagen = (index) => {
    setImagenActual(index);
  };

  return (
    <>
      <section className="hero-full">
        {!imgError ? (
          <div className="carrusel-container">
            <img
              src={carruselImagenes[imagenActual]}
              alt={`Hero ${imagenActual + 1}`}
              className="hero-img-full"
              onError={() => setImgError(true)}
            />

            {/* Indicadores */}
            <div className="carrusel-indicadores">
              {carruselImagenes.map((_, index) => (
                <button
                  key={index}
                  className={`indicador ${index === imagenActual ? 'activo' : ''}`}
                  onClick={() => irAImagen(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="hero-img-fallback">No se pudo cargar la imagen</div>
        )}
      </section>
      
      <section className="categorias-section">
        <h2>Descubre nuestros modelos</h2>
        <div className="categorias-grid">
          {data.categorias.map((cat) => (
            <div key={cat.id} className="categoria-card" onClick={() => onNavigate(cat.id === 'bicicletas' ? TABS.BICICLETAS : TABS.SCOOTERS)}>
              <div className="categoria-img-wrapper">
                <img src={cat.imagen} alt={cat.nombre} />
              </div>
              <div className="categoria-info">
                <h3>{cat.nombre}</h3>
                <p>{cat.descripcion}</p>
                <span className="categoria-link">Ver productos →</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Modelos({ categoria, onProductClick, productos }) {
  const modelosFiltrados = categoria 
    ? productos.filter(m => m.categoria === categoria)
    : productos;

  // Obtener info de la categoría
  let categoriaInfo = null;
  if (categoria) {
    const catMap = {
      bicicleta: { nombre: 'Bicicletas', descripcion: 'Bicicletas eléctricas urbanas' },
      scooter: { nombre: 'Scooters', descripcion: 'Scooters eléctricos potentes' }
    };
    categoriaInfo = catMap[categoria] || null;
  }

  return (
    <section>
      {categoriaInfo && (
        <div className="categoria-titulo">
          <h2>{categoriaInfo.nombre}</h2>
          <p>{categoriaInfo.descripcion}</p>
        </div>
      )}
      <div className="productos-grid">
        {modelosFiltrados.map((m) => (
          <article key={m.id} className="card" onClick={() => onProductClick(m.id)}>
            {m.imagen && (
              <img
                src={m.imagen}
                alt={m.nombre}
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            )}
            <div className="card-body">
              <h3>{m.nombre}</h3>
              <div className="precio-tarjeta">{m.precio}</div>
              <button className="btn-ver-mas">Ver más →</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Caracteristicas({ onChange }) {
  // Iconos e imágenes para cada característica
  const caracteristicasData = {
    'Cero emisiones': { 
      icono: '🌱', 
      imagen: '/img/carrusel1 (2).png',
      descripcion: 'Contribuye al cuidado del medio ambiente con cero emisiones contaminantes'
    },
    'Bajo mantenimiento': { 
      icono: '🔧', 
      imagen: '/img/carrusel1 (5).png',
      descripcion: 'Menos piezas móviles significan menor desgaste y menores costos de mantenimiento'
    },
    'Carga rápida': { 
      icono: '⚡', 
      imagen: '/img/carrusel1 (7).png',
      descripcion: 'Tecnología de carga rápida para que nunca te quedes sin energía'
    },
    'Conectividad': { 
      icono: '📱', 
      imagen: '/img/carrusel1 (9).png',
      descripcion: 'Conecta tu dispositivo y controla tu vehículo desde tu smartphone'
    }
  };

  const handleCategoryClick = (categoria) => {
    onChange(categoria);
    window.scrollTo(0, 0);
  };

  return (
    <section className="features">
      <div className="features-container">
        <h2 className="features-title">¿Por qué elegir movilidad eléctrica?</h2>
        <p className="features-subtitle">Descubre las ventajas que te ofrecen nuestros vehículos eléctricos</p>
        
        <div className="features-grid">
          {data.caracteristicas.map((c, idx) => {
            const featData = caracteristicasData[c.titulo] || { 
              icono: '✨', 
              imagen: '/img/carrusel1 (1).jpg',
              descripcion: c.descripcion
            };
            
            return (
              <div className="feature-card" key={idx}>
                <div className="feature-image">
                  <img src={featData.imagen} alt={c.titulo} />
                  <div className="feature-icon">
                    {featData.icono}
                  </div>
                </div>
                <div className="feature-content">
                  <h3>{c.titulo}</h3>
                  <p>{featData.descripcion}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="features-cta">
          <h3>¿Listo para hacer el cambio?</h3>
          <p>Explora nuestra gama completa de vehículos eléctricos</p>
          <div className="cta-buttons">
            <button className="btn-cta primary" onClick={() => handleCategoryClick(TABS.BICICLETAS)}>
              Ver Bicicletas
            </button>
            <button className="btn-cta secondary" onClick={() => handleCategoryClick(TABS.SCOOTERS)}>
              Ver Scooters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetalleProducto({ productoId, onBack, onProductClick, productos }) {
  const [imagenActual, setImagenActual] = useState(0);
  const [mostrarModalPago, setMostrarModalPago] = useState(false);
  const producto = productos.find(m => m.id === productoId);
  
  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  // Galería: usa todas las imágenes
  const galeria = producto.galeria && producto.galeria.length > 0 ? producto.galeria : [producto.imagen];
  const productosSimilares = productos
    .filter(m => m.categoria === producto.categoria && m.id !== producto.id)
    .slice(0, 3);

  return (
    <section className="detalle-producto">
      <button className="btn-volver" onClick={onBack}>← Volver</button>
      
      <div className="detalle-contenido">
        <div className="detalle-imagen">
          <img src={galeria[imagenActual]} alt={producto.nombre} className="imagen-principal" />
          <div className="galeria-miniaturas">
            {galeria.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`${producto.nombre} vista ${index + 1}`}
                className={`miniatura ${index === imagenActual ? 'activa' : ''}`}
                onClick={() => setImagenActual(index)}
              />
            ))}
          </div>
        </div>
        
        <div className="detalle-info">
          <h1>{producto.nombre}</h1>
          <p className="detalle-descripcion">{producto.descripcion}</p>
          
          <div className="detalle-specs">
            <h3>Especificaciones</h3>
            <ul>
              <li><strong>Autonomía:</strong> {producto.autonomia} km</li>
              <li><strong>Velocidad máxima:</strong> {producto.velocidadMax} km/h</li>
              <li><strong>Potencia:</strong> {producto.potencia} kW</li>
            </ul>
          </div>
          
          <div className="detalle-disponibilidad">
            {producto.disponible !== false ? (
              <span className="disponible">✓ Disponible</span>
            ) : (
              <span className="no-disponible">✗ No disponible</span>
            )}
          </div>
          
          <div className="detalle-precio">
            <span className="precio-grande">{producto.precio}</span>
          </div>
          
          <button className="btn-forma-pago" onClick={() => setMostrarModalPago(true)}>Ver formas de pago</button>
        </div>
      </div>
      
      {productosSimilares.length > 0 && (
        <div className="productos-similares">
          <h2>Productos similares</h2>
          <div className="productos-grid">
            {productosSimilares.map((m) => (
              <article key={m.id} className="card" onClick={() => onProductClick(m.id)}>
                {m.imagen && (
                  <img
                    src={m.imagen}
                    alt={m.nombre}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                  />
                )}
                <div className="card-body">
                  <h3>{m.nombre}</h3>
                  <div className="precio-tarjeta">{m.precio}</div>
                  <button className="btn-ver-mas">Ver más →</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      
      {/* Modal de Formas de Pago */}
      {mostrarModalPago && (
        <div className="modal-overlay" onClick={() => setMostrarModalPago(false)}>
          <div className="modal-pago" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>💳 Formas de Pago</h2>
              <button className="btn-cerrar-modal" onClick={() => setMostrarModalPago(false)}>✕</button>
            </div>
            
            <div className="modal-body-pago">
              <div className="pago-info">
                <h3>📱 Proceso de Pago por QR</h3>
                <p>Para procesar tu compra, sigue estos sencillos pasos:</p>
                
                <div className="whatsapp-contact">
                  <div className="contact-instruction">
                    <h4>💬 Escríbenos para generar tu QR de pago</h4>
                    <p>Contacta a este número de WhatsApp y proporciona la siguiente información:</p>
                  </div>
                  
                  <div className="numero-whatsapp-principal">
                    <div className="whatsapp-number">
                      <span className="whatsapp-icon">📱</span>
                      <strong>3162967105</strong>
                    </div>
                    <a 
                      href="https://wa.me/573162967105" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-whatsapp"
                    >
                      Abrir WhatsApp
                    </a>
                  </div>
                </div>
                
                <div className="requisitos-info">
                  <h4>� Información requerida:</h4>
                  <div className="requisitos-lista">
                    <div className="requisito-item">
                      <span className="requisito-icon">🏷️</span>
                      <div>
                        <strong>Nombre del producto</strong>
                        <p>Especifica qué bicicleta o scooter te interesa</p>
                      </div>
                    </div>
                    <div className="requisito-item">
                      <span className="requisito-icon">🎨</span>
                      <div>
                        <strong>Color preferido</strong>
                        <p>Indica el color que deseas para tu vehículo</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="proceso-pago">
                  <h4>⚡ Proceso rápido:</h4>
                  <ol className="pasos-pago">
                    <li>
                      <strong>Contacta por WhatsApp</strong>
                      <span>Escribe al 3162967105</span>
                    </li>
                    <li>
                      <strong>Proporciona información</strong>
                      <span>Nombre del producto y color</span>
                    </li>
                    <li>
                      <strong>Recibe tu QR</strong>
                      <span>Te enviaremos el código QR personalizado</span>
                    </li>
                    <li>
                      <strong>Realiza el pago</strong>
                      <span>Escanea y paga desde tu app bancaria</span>
                    </li>
                  </ol>
                </div>
                
                <div className="garantia-info">
                  <div className="garantia-badge">
                    <span className="garantia-icon">🛡️</span>
                    <div>
                      <strong>Pago 100% Seguro</strong>
                      <p>Transacciones protegidas y verificadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cerrar" onClick={() => setMostrarModalPago(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function LoginAdmin({ onLogin, onCerrar }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(password);
    
    if (success) {
      setPassword('');
      setError('');
    } else {
      setError('Contraseña incorrecta');
      setPassword('');
    }
  };

  return (
    <div className="modal-overlay" onClick={onCerrar}>
      <div className="modal-login" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🔐 Acceso Administrador</h2>
          <button className="btn-cerrar-modal" onClick={onCerrar}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa la contraseña"
              autoFocus
              className={error ? 'input-error' : ''}
            />
            {error && <p className="error-message">{error}</p>}
          </div>
          
          <div className="login-actions">
            <button type="submit" className="btn-login">
              🔓 Ingresar
            </button>
            <button type="button" className="btn-cancelar" onClick={onCerrar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Admin({ productos, onAgregarProducto, onEditarProducto, onEliminarProducto, onCerrarSesion }) {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: 'bicicleta',
    autonomia: '',
    velocidadMax: '',
    potencia: '',
    precio: '',
    descripcion: '',
    imagenes: [''], // array de inputs
    disponible: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Procesar URLs de imágenes
    const galeria = formData.imagenes
      .map(url => url.trim())
      .filter(url => url.length > 0);
    const nuevoProducto = {
      ...formData,
      id: editando?.id || `prod-${Date.now()}`,
      autonomia: Number(formData.autonomia),
      velocidadMax: Number(formData.velocidadMax),
      potencia: Number(formData.potencia),
      imagen: galeria[0] || '',
      galeria,
    };

    if (editando) {
      onEditarProducto(nuevoProducto);
    } else {
      onAgregarProducto(nuevoProducto);
    }

    // Resetear formulario
    setFormData({
      nombre: '',
      categoria: 'bicicleta',
      autonomia: '',
      velocidadMax: '',
      potencia: '',
      precio: '',
      descripcion: '',
      imagenes: [''],
      disponible: true,
    });
    setMostrarForm(false);
    setEditando(null);
  };

  const handleEditar = (producto) => {
    setFormData({
      nombre: producto.nombre,
      categoria: producto.categoria,
      autonomia: producto.autonomia.toString(),
      velocidadMax: producto.velocidadMax.toString(),
      potencia: producto.potencia.toString(),
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagenes: producto.galeria && producto.galeria.length > 0 ? producto.galeria : [producto.imagen || ''],
      disponible: producto.disponible,
    });
    setEditando(producto);
    setMostrarForm(true);
  };

  const handleCancelar = () => {
    setMostrarForm(false);
    setEditando(null);
    setFormData({
      nombre: '',
      categoria: 'bicicleta',
      autonomia: '',
      velocidadMax: '',
      potencia: '',
      precio: '',
      descripcion: '',
      imagenes: '',
      disponible: true,
    });
  };

  return (
    <section className="admin-panel">
      <div className="admin-header">
        <div>
          <h2>🔧 Panel de Administración</h2>
          <p className="admin-desc">Gestiona los productos de tu catálogo</p>
        </div>
        <button className="btn-cerrar-sesion" onClick={onCerrarSesion}>
          🚪 Cerrar Sesión
        </button>
      </div>

      <button 
        className="btn-nuevo-producto" 
        onClick={() => setMostrarForm(!mostrarForm)}
      >
        {mostrarForm ? '❌ Cancelar' : '➕ Nuevo Producto'}
      </button>

      {mostrarForm && (
        <form className="form-producto" onSubmit={handleSubmit}>
          <h3>{editando ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}</h3>
          
          <div className="form-group">
            <label>Nombre del Producto *</label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              placeholder="Ej: Urban E-Bike Pro"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Categoría *</label>
              <select
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              >
                <option value="bicicleta">Bicicleta</option>
                <option value="scooter">Scooter</option>
              </select>
            </div>

            <div className="form-group">
              <label>Precio *</label>
              <input
                type="text"
                required
                value={formData.precio}
                onChange={(e) => setFormData({...formData, precio: e.target.value})}
                placeholder="Ej: €1.299"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Autonomía (km) *</label>
              <input
                type="number"
                required
                value={formData.autonomia}
                onChange={(e) => setFormData({...formData, autonomia: e.target.value})}
                placeholder="Ej: 120"
              />
            </div>

            <div className="form-group">
              <label>Velocidad Máx (km/h) *</label>
              <input
                type="number"
                required
                value={formData.velocidadMax}
                onChange={(e) => setFormData({...formData, velocidadMax: e.target.value})}
                placeholder="Ej: 25"
              />
            </div>

            <div className="form-group">
              <label>Potencia (kW) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.potencia}
                onChange={(e) => setFormData({...formData, potencia: e.target.value})}
                placeholder="Ej: 0.25"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Descripción *</label>
            <textarea
              required
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              placeholder="Describe las características del producto..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Imágenes del producto</label>
            {formData.imagenes.map((img, idx) => (
              <div key={idx} style={{display:'flex',alignItems:'center',marginBottom:'4px'}}>
                <input
                  type="text"
                  value={img}
                  onChange={e => {
                    const nuevas = [...formData.imagenes];
                    nuevas[idx] = e.target.value;
                    setFormData({...formData, imagenes: nuevas});
                  }}
                  placeholder={`URL de imagen #${idx+1}`}
                  style={{flex:1}}
                />
                <button type="button" onClick={() => {
                  const nuevas = formData.imagenes.filter((_,i) => i !== idx);
                  setFormData({...formData, imagenes: nuevas.length ? nuevas : ['']});
                }} style={{marginLeft:'4px'}}>🗑️</button>
              </div>
            ))}
            <button type="button" onClick={() => setFormData({...formData, imagenes: [...formData.imagenes, '']})} style={{marginTop:'4px'}}>➕ Agregar imagen</button>
            <small>La primera será la principal. Puedes agregar/quitar casillas.</small>
          </div>

          <div className="form-group">
            <label>¿Disponible?</label>
            <select
              value={formData.disponible}
              onChange={e => setFormData({ ...formData, disponible: e.target.value === 'true' })}
            >
              <option value="true">Disponible</option>
              <option value="false">No disponible</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-guardar">
              {editando ? '💾 Guardar Cambios' : '➕ Agregar Producto'}
            </button>
            <button type="button" className="btn-cancelar" onClick={handleCancelar}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="admin-lista">
        <h3>📦 Productos Actuales ({productos.length})</h3>
        <div className="tabla-productos">
          {productos.map((producto) => (
            <div key={producto.id} className="producto-item">
              <div className="producto-info">
                {/* Mostrar todas las imágenes de la galería como miniaturas */}
                {producto.galeria && producto.galeria.length > 0 ? (
                  <div className="admin-galeria-thumbs">
                    {producto.galeria.map((img, idx) => (
                      <img key={idx} src={img} alt={producto.nombre + ' img ' + (idx+1)} className="producto-thumb" />
                    ))}
                  </div>
                ) : (
                  producto.imagen && <img src={producto.imagen} alt={producto.nombre} className="producto-thumb" />
                )}
                <div>
                  <h4>{producto.nombre}</h4>
                  <p className="producto-categoria">
                    {producto.categoria === 'bicicleta' ? '🚲 Bicicleta' : '🛴 Scooter'}
                  </p>
                  <p className="producto-specs">
                    {producto.autonomia}km • {producto.velocidadMax}km/h • {producto.potencia}kW • {producto.precio}
                  </p>
                </div>
              </div>
              <div className="producto-acciones">
                <button className="btn-editar" onClick={() => handleEditar(producto)}>
                  ✏️ Editar
                </button>
                <button 
                  className="btn-eliminar" 
                  onClick={() => {
                    if (window.confirm(`¿Eliminar "${producto.nombre}"?`)) {
                      onEliminarProducto(producto.id);
                    }
                  }}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacto() {
  // Esta función ya no se usa, el contacto ahora es un modal global
  return (
    <section className="contact">
      <h2>Contacto</h2>
      <p>¿Tienes dudas? Escríbenos a <a href="mailto:info@mmotos.com">info@mmotos.com</a>.</p>
      <p>Este sitio usa datos locales, no se envía nada a servidores externos.</p>
    </section>
  );
}

function Footer({ onChange, onContactoClick }) {
  return (
    <footer className="footer-app">
      <div className="footer-content">
        {/* Sección principal del footer */}
        <div className="footer-main">
          <div className="footer-section footer-brand-section">
            <div className="footer-logo">
              <img src="/img/Logo-URVY-2-blanco.png" alt="Logo URVY" className="footer-logo-img" />
              <h3>Mmotos</h3>
            </div>
            <p className="footer-description">
              Líderes en movilidad eléctrica sostenible. Ofrecemos las mejores bicicletas y scooters eléctricos para transformar tu forma de moverte por la ciudad.
            </p>
            <div className="footer-certifications">
              <span className="cert-badge">🌱 Eco-Friendly</span>
              <span className="cert-badge">⚡ Tecnología Avanzada</span>
            </div>
          </div>

          <div className="footer-section">
            <h4>Productos</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={() => { onChange(TABS.BICICLETAS); window.scrollTo(0, 0); }}>Bicicletas Eléctricas</a></li>
              <li><a href="#" onClick={() => { onChange(TABS.SCOOTERS); window.scrollTo(0, 0); }}>Scooters Eléctricos</a></li>
              <li><a href="#" onClick={() => { onChange(TABS.CARACTERISTICAS); window.scrollTo(0, 0); }}>Características</a></li>
              <li><a href="#" onClick={() => { onChange(TABS.INICIO); window.scrollTo(0, 0); }}>Ver Todo</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Soporte</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={() => { onContactoClick(); }}>Contacto</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contacto</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Bogotá, Colombia</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <span>+57 316 296 7105</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>info@mmotos.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🕒</span>
                <span>Lun-Vie: 9:00-18:00</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4>Síguenos</h4>
            <div className="footer-social">
              <a href="#" className="social-link" title="WhatsApp">
                <span className="social-icon">📱</span>
                WhatsApp
              </a>
              <a href="#" className="social-link" title="Instagram">
                <span className="social-icon">📸</span>
                Instagram
              </a>
              <a href="#" className="social-link" title="Facebook">
                <span className="social-icon">👥</span>
                Facebook
              </a>
              <a href="#" className="social-link" title="YouTube">
                <span className="social-icon">🎥</span>
                YouTube
              </a>
            </div>
            <div className="newsletter">
              <h5>Newsletter</h5>
              <p>Recibe ofertas exclusivas</p>
              <div className="newsletter-form">
                <input type="email" placeholder="tu@email.com" />
                <button type="button">✓</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-legal">
              <span>&copy; 2025 Mmotos. Todos los derechos reservados.</span>
              <div className="legal-links">
                <a href="#">Política de Privacidad</a>
                <a href="#">Términos de Uso</a>
                <a href="#">Cookies</a>
              </div>
            </div>
            <div className="footer-credits">
              <span>Hecho con <span style={{color:'#ff6b6b'}}>♥</span> para un futuro más verde</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [tab, setTab] = useState(TABS.INICIO);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mostrarLoginAdmin, setMostrarLoginAdmin] = useState(false);
  const [mostrarModalContacto, setMostrarModalContacto] = useState(false);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar productos desde Supabase al iniciar
  React.useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const { supabase } = await import('./supabaseClient');
      const { data: productosDB, error } = await supabase
        .from('productos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      if (productosDB && productosDB.length > 0) {
        // Convertir de snake_case a camelCase
        const productosFormateados = productosDB.map(p => ({
          id: p.id,
          nombre: p.nombre,
          categoria: p.categoria,
          autonomia: p.autonomia,
          velocidadMax: p.velocidad_max,
          potencia: p.potencia,
          precio: p.precio,
          descripcion: p.descripcion,
          imagen: p.imagen,
          disponible: p.disponible,
          galeria: p.galeria || []
        }));
        setProductos(productosFormateados);
      } else {
        // Si no hay productos, inicializar con los datos de ejemplo
        await inicializarProductosIniciales();
      }
    } catch (error) {
      console.error('Error al cargar productos:', error);
      // Si hay error, usar datos locales como fallback
      setProductos(data.modelos);
    } finally {
      setCargando(false);
    }
  };

  const inicializarProductosIniciales = async () => {
    try {
      const { supabase } = await import('./supabaseClient');
      const productosParaInsertar = data.modelos.map(p => ({
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria,
        autonomia: p.autonomia,
        velocidad_max: p.velocidadMax,
        potencia: p.potencia,
        precio: p.precio,
        descripcion: p.descripcion,
        imagen: p.imagen,
        disponible: p.disponible ?? true,
        galeria: p.galeria || []
      }));

      const { error } = await supabase
        .from('productos')
        .insert(productosParaInsertar);

      if (error) throw error;
      
      // Recargar productos después de inicializar
      await cargarProductos();
    } catch (error) {
      console.error('Error al inicializar productos:', error);
      setProductos(data.modelos);
    }
  };

  const handleAgregarProducto = async (nuevoProducto) => {
    try {
      const { supabase } = await import('./supabaseClient');
      const productoParaInsertar = {
        id: nuevoProducto.id,
        nombre: nuevoProducto.nombre,
        categoria: nuevoProducto.categoria,
        autonomia: nuevoProducto.autonomia,
        velocidad_max: nuevoProducto.velocidadMax,
        potencia: nuevoProducto.potencia,
        precio: nuevoProducto.precio,
        descripcion: nuevoProducto.descripcion,
        imagen: nuevoProducto.imagen,
        disponible: nuevoProducto.disponible ?? true,
        galeria: nuevoProducto.galeria || []
      };

      const { error } = await supabase
        .from('productos')
        .insert([productoParaInsertar]);

      if (error) throw error;
      
      // Recargar productos
      await cargarProductos();
    } catch (error) {
      console.error('Error al agregar producto:', error);
      alert('Error al agregar el producto');
    }
  };

  const handleEditarProducto = async (productoEditado) => {
    try {
      const { supabase } = await import('./supabaseClient');
      const { error } = await supabase
        .from('productos')
        .update({
          nombre: productoEditado.nombre,
          categoria: productoEditado.categoria,
          autonomia: productoEditado.autonomia,
          velocidad_max: productoEditado.velocidadMax,
          potencia: productoEditado.potencia,
          precio: productoEditado.precio,
          descripcion: productoEditado.descripcion,
          imagen: productoEditado.imagen,
          disponible: productoEditado.disponible ?? true,
          galeria: productoEditado.galeria || []
        })
        .eq('id', productoEditado.id);

      if (error) throw error;
      
      // Recargar productos
      await cargarProductos();
    } catch (error) {
      console.error('Error al editar producto:', error);
      alert('Error al editar el producto');
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      const { supabase } = await import('./supabaseClient');
      const { error } = await supabase
        .from('productos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Recargar productos
      await cargarProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar el producto');
    }
  };

  const handleProductClick = (productoId) => {
    setProductoSeleccionado(productoId);
    setTab(TABS.DETALLE);
  };

  const handleVolver = () => {
    setProductoSeleccionado(null);
    setTab(TABS.INICIO);
  };

  const handleTabChange = (newTab) => {
    if (newTab === TABS.ADMIN) {
      if (!isAdmin) {
        setMostrarLoginAdmin(true);
        return;
      }
    }
    setTab(newTab);
  };

  const handleLoginAdmin = (password) => {
    // Contraseña por defecto: "aleja12" (puedes cambiarla)
    const PASSWORD_ADMIN = "aleja12";
    
    if (password === PASSWORD_ADMIN) {
      setIsAdmin(true);
      setMostrarLoginAdmin(false);
      setTab(TABS.ADMIN);
      return true;
    }
    return false;
  };

  const handleCerrarSesion = () => {
    setIsAdmin(false);
    setTab(TABS.INICIO);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Si hay término de búsqueda, ir a la vista de productos filtrados
    if (term.trim()) {
      setTab('BUSQUEDA'); // Nuevo tab para resultados de búsqueda
    }
  };

  // Filtrar productos por búsqueda
  const productosFiltrados = searchTerm 
    ? productos.filter(producto => 
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productos;

  // Crear un objeto de datos actualizado con los productos del estado
  const datosActualizados = {
    ...data,
    modelos: productos,
  };

  let content;
  switch (tab) {
    case TABS.BICICLETAS:
      content = <Modelos categoria="bicicleta" onProductClick={handleProductClick} productos={productos} />;
      break;
    case TABS.SCOOTERS:
      content = <Modelos categoria="scooter" onProductClick={handleProductClick} productos={productos} />;
      break;
    case TABS.CARACTERISTICAS:
      content = <Caracteristicas onChange={setTab} />;
      break;
    case 'BUSQUEDA':
      content = (
        <div>
          <h2>Resultados de búsqueda: "{searchTerm}"</h2>
          {productosFiltrados.length > 0 ? (
            <Modelos categoria={null} onProductClick={handleProductClick} productos={productosFiltrados} />
          ) : (
            <div className="no-resultados">
              <p>No se encontraron productos que coincidan con "{searchTerm}"</p>
              <button onClick={() => {setSearchTerm(''); setTab(TABS.INICIO);}}>Ver todos los productos</button>
            </div>
          )}
        </div>
      );
      break;
    case TABS.ADMIN:
      content = isAdmin ? (
        <Admin 
          productos={productos}
          onAgregarProducto={handleAgregarProducto}
          onEditarProducto={handleEditarProducto}
          onEliminarProducto={handleEliminarProducto}
          onCerrarSesion={handleCerrarSesion}
        />
      ) : (
        <div>Acceso denegado</div>
      );
      break;
    case TABS.DETALLE:
      content = <DetalleProducto productoId={productoSeleccionado} onBack={handleVolver} onProductClick={handleProductClick} productos={productos} />;
      break;
    case TABS.INICIO:
    default:
      content = <Inicio onNavigate={setTab} />;
  }

  return (
    <div className="app">
      <Header 
        active={tab} 
        onChange={handleTabChange} 
        isAdmin={isAdmin} 
        onContactoClick={() => setMostrarModalContacto(true)}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />
      {/* El carrusel debe ir fuera del container para ancho completo */}
      {tab === TABS.INICIO && (
        <>
          <Inicio onNavigate={setTab} />
        </>
      )}
      {tab !== TABS.INICIO && (
        <main className="container">
          {content}
        </main>
      )}
      <Footer 
        onChange={handleTabChange}
        onContactoClick={() => setMostrarModalContacto(true)}
      />
      {mostrarLoginAdmin && (
        <LoginAdmin 
          onLogin={handleLoginAdmin} 
          onCerrar={() => setMostrarLoginAdmin(false)} 
        />
      )}
      
      {/* Modal de Contacto Global */}
      {mostrarModalContacto && (
        <div className="modal-overlay" onClick={() => setMostrarModalContacto(false)}>
          <div className="modal-contacto" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📞 Contacto Directo</h2>
              <button className="btn-cerrar-modal" onClick={() => setMostrarModalContacto(false)}>✕</button>
            </div>
            
            <div className="modal-body-contacto">
              <div className="contacto-persona">
                <div className="avatar-contacto">👩‍💼</div>
                <h3>Mónica Rodríguez</h3>
                <p>Asesora de ventas</p>
                
                <div className="numero-contacto">
                  <strong>📱 3162967105</strong>
                </div>
                
                <div className="horarios-atencion">
                  <h4>🕒 Horarios de atención:</h4>
                  <ul>
                    <li>Lunes a Viernes: 8:00 AM - 6:00 PM</li>
                    <li>Sábados: 9:00 AM - 4:00 PM</li>
                    <li>Domingos: Cerrado</li>
                  </ul>
                </div>
                
                <div className="servicios-contacto">
                  <h4>💬 Servicios disponibles:</h4>
                  <ul>
                    <li>✅ Asesoría personalizada</li>
                    <li>✅ Información de productos</li>
                    <li>✅ Cotizaciones</li>
                    <li>✅ Soporte técnico</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn-cerrar" onClick={() => setMostrarModalContacto(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
