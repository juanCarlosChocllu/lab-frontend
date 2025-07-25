import { instance } from "../../core/config/instance"
import { ResponseI } from "../../core/interface/response"
import { buscadorI } from "../interface/buscador"
import { VentasI } from "../interface/ventas"

export async  function listarVentas (buscador:buscadorI):Promise<ResponseI<VentasI>>{
    try {
        console.log(buscador);
       
        const response  = await instance.post('venta/listar', buscador)
        return response.data
    } catch (error) {
      
        
        throw error
    }
}