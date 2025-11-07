import { AxiosResponse } from "axios"
import { instance } from "../../core/config/instance"
import { ResponseI } from "../../core/interface/response"
import { RegistarTiempoProduccionI, tiempoProduccionI } from "../interface/tiempoProduccion"

export async  function   listarTiempoProduccion (pagina:number , filter:any):Promise<ResponseI<tiempoProduccionI>>{
    try {
    const response = await instance.get('tiempo/produccion',{
        params:{
            limite:20,
            pagina,
            ...filter
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


export async function registrarTiempoProduccionExcel(archivo:File):Promise<AxiosResponse> {
   const data ={
        file:archivo
    }
    try {
        const reporte = await instance.post('excel/tiempo/entrega', data,{headers:{'Content-Type': 'multipart/form-data'}})
        return reporte.data
    } catch (error) {
         throw error
    }
}