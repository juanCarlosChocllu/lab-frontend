import { instance } from "../../core/config/instance";
import { AutenticacionI } from "../interface/autenticacion";

export async function autenticacion(data:AutenticacionI):Promise<{status:number}>{
    try {
        const response = await  instance.post('autenticacion', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export async function verificarAutenticacion():Promise<{autenticacion:boolean}>{
    try {
        const response = await  instance.get('autenticacion/session')
        return response.data
    } catch (error) {
        throw error
    }
}


export async function logoutSession():Promise<{status:number}>{
    try {
        const response = await  instance.get('autenticacion/logout')
        return response.data
    } catch (error) {
        throw error
    }
}
