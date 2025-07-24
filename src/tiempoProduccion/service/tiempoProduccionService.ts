import { AxiosResponse } from "axios"
import { instance } from "../../core/config/instance"
import { ResponseI } from "../../core/interface/response"
import { RegistarTiempoProduccionI, tiempoProduccionI } from "../interface/tiempoProduccion"

export async  function   listarTiempoProduccion (pagina:number, limite:number):Promise<ResponseI<tiempoProduccionI>>{
    try {
    const response = await instance.get('tiempo/produccion',{
        params:{
            limite,
            pagina
        }
    })
        return response.data
    } catch (error) {
        throw error
    }

}

export async function registrarTiempoProduccion(data:RegistarTiempoProduccionI):Promise<AxiosResponse> {
    try {
        const response = await instance.post('tiempo/produccion', data)
        return response.data
    } catch (error) {
        throw error
    }
}