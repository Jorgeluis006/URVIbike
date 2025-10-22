import { supabase } from './supabaseClient'

// Obtener todos los productos
export async function obtenerProductos() {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error al obtener productos:', error)
    return []
  }
  
  // Convertir los nombres de columnas de snake_case a camelCase
  return data.map(producto => ({
    id: producto.id,
    nombre: producto.nombre,
    categoria: producto.categoria,
    autonomia: producto.autonomia,
    velocidadMax: producto.velocidad_max,
    potencia: producto.potencia,
    precio: producto.precio,
    descripcion: producto.descripcion,
    imagen: producto.imagen,
    disponible: producto.disponible,
    galeria: producto.galeria || []
  }))
}

// Agregar un producto
export async function agregarProducto(producto) {
  const { data, error } = await supabase
    .from('productos')
    .insert([{
      id: producto.id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      autonomia: producto.autonomia,
      velocidad_max: producto.velocidadMax,
      potencia: producto.potencia,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      disponible: producto.disponible ?? true,
      galeria: producto.galeria || []
    }])
    .select()
  
  if (error) {
    console.error('Error al agregar producto:', error)
    return null
  }
  
  return data[0]
}

// Editar un producto
export async function editarProducto(producto) {
  const { data, error } = await supabase
    .from('productos')
    .update({
      nombre: producto.nombre,
      categoria: producto.categoria,
      autonomia: producto.autonomia,
      velocidad_max: producto.velocidadMax,
      potencia: producto.potencia,
      precio: producto.precio,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
      disponible: producto.disponible ?? true,
      galeria: producto.galeria || []
    })
    .eq('id', producto.id)
    .select()
  
  if (error) {
    console.error('Error al editar producto:', error)
    return null
  }
  
  return data[0]
}

// Eliminar un producto
export async function eliminarProducto(id) {
  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error al eliminar producto:', error)
    return false
  }
  
  return true
}

// Inicializar base de datos con productos de ejemplo
export async function inicializarProductos(productosIniciales) {
  // Verificar si ya hay productos
  const { data: productosExistentes } = await supabase
    .from('productos')
    .select('id')
    .limit(1)
  
  // Si ya hay productos, no hacer nada
  if (productosExistentes && productosExistentes.length > 0) {
    return
  }
  
  // Si no hay productos, insertar los iniciales
  const productosParaInsertar = productosIniciales.map(p => ({
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
  }))
  
  const { error } = await supabase
    .from('productos')
    .insert(productosParaInsertar)
  
  if (error) {
    console.error('Error al inicializar productos:', error)
  }
}
