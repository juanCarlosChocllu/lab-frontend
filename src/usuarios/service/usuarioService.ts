import { AxiosResponse } from "axios"
import { instance } from "../../core/config/instance"
import { CrearUsuariosI, UsuariosI } from "../interface/usuarios"

export const usuarioListar =async ():Promise<UsuariosI[]> => {
    try {
        const response = await instance.get('usuarios')
        return response.data
    } catch (error) {
        throw error
    }

}

export const registrarUsuario= async (data:CrearUsuariosI):Promise<AxiosResponse>=>{
    try {
        const response = await instance.post('usuarios', data)
        return response
    } catch (error) {
        throw error
    }
}


export const eliminarUsuario= async (id:string)=>{
    try {
        const response = await instance.delete(`usuarios/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}