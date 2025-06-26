import { instance } from "../../core/config/instance"
import { RegistarTiempoProduccionI, tiempoProduccionI } from "../interface/teimpoProduccion"

export async  function   listarTiempoProduccion ():Promise<tiempoProduccionI[]>{
    try {
    const response = await instance.get('tiempo/produccion')
        return response.data
    } catch (error) {
        throw error
    }

}

export async function registrarTiempoProduccion(data:RegistarTiempoProduccionI) {
    try {
        const response = await instance.post('tiempo/produccion', data)
        return response.data
    } catch (error) {
        throw error
    }
}