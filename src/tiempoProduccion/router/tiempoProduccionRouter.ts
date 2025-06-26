import { routerI } from "../../core/interface/router";
import { ListarTiempoProduccionPage } from "../page/ListarTiempoProduccionPage";
import { RegistrarTiempoProduccionPage } from "../page/RegistrarTiempoProduccionPage";

export const  tiempoProduccionRouter:routerI[] = [
{
    path:'tiempo/produccion', 
    component:ListarTiempoProduccionPage
},
{
    path:'tiempo/registrar', 
    component:RegistrarTiempoProduccionPage
}
]