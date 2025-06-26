import { instance } from "../../core/config/instance"

export async function cargarArchivo(archivo:File){
    const data ={
        file:archivo
    }
    try {
        const reporte = await instance.post('excel', data,{headers:{'Content-Type': 'multipart/form-data'}})
        return reporte.data
    } catch (error) {
         throw error
    }
}