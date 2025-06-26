import { instance } from "../../core/config/instance"
import { ParmasI } from "../../core/interface/params"
import { ResponseI } from "../../core/interface/response"
import { VentasI } from "../interface/ventas"

export async  function listarVentas (limite:number, pagina:number):Promise<ResponseI<VentasI>>{
    try {
        const params:ParmasI = {
            limite:limite,
            pagina:pagina
        }
        const response  = await instance.get('venta',{
            params
        })

        return response.data
    } catch (error) {
      
        
        throw error
    }
}