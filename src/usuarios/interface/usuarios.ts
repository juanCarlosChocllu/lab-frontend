export interface UsuariosI {
  _id: string
  flag: string
  nombre: string
  apellidos: string
  username: string
  rol: string
  fecha: string
}

export interface CrearUsuariosI {


  nombre: string
  apellidos: string
  username: string
  rol: string
  password: string
}