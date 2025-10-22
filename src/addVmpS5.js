import { supabase } from './supabaseClient'

async function agregarVmpS5() {
  const producto = {
    id: 'vmp-s5',
    nombre: 'VMP S5',
    categoria: 'scooter',
    potencia: 350,
    velocidad_max: 38,
    autonomia: 40,
    precio: 'Consultar',
    descripcion: `Batería: 48v Ácido de plomo extraíble\nLímite de peso: 100 Kg\nLlanta: Sellomatic 2.75-10\nTiempo de carga: 6-8 Hrs\nLargo: 145 CM - Alto: 98 CM - Ancho: 37 CM`,
    imagen: 'https://drive.google.com/uc?export=view&id=14jbDgt2T4tZ5-Gx0181-a29dKWHh9-Ii',
    disponible: true,
    galeria: [
      'https://drive.google.com/uc?export=view&id=14jbDgt2T4tZ5-Gx0181-a29dKWHh9-Ii',
      'https://drive.google.com/uc?export=view&id=1mX-N4vs0VEXHTqjprUPOJCNF1vb0xyy9',
      'https://drive.google.com/uc?export=view&id=1Us-u1i2Xr2yr_ogRumqFDupv8KvPwEhC',
      'https://drive.google.com/uc?export=view&id=1-ZhVlJxkRDkgcnxPLG19paqHqGbnvEA4'
    ]
  }
  const { error } = await supabase.from('productos').insert([producto])
  if (error) {
    console.error('Error al agregar VMP S5:', error)
  } else {
    console.log('Producto VMP S5 agregado correctamente')
  }
}

async function actualizarCategoriaVmpS5() {
  const { error } = await supabase
    .from('productos')
    .update({ categoria: 'bicicleta' })
    .eq('id', 'vmp-s5')
  if (error) {
    console.error('Error al actualizar la categoría:', error)
  } else {
    console.log('Categoría actualizada a bicicleta')
  }
}

agregarVmpS5()
actualizarCategoriaVmpS5()
