import { routerI } from "../../core/interface/router";
import { ListarTiempoProduccionPage } from "../page/ListarTiempoProduccionPage";
import { RegistrarTiempoProduccionExcelPage } from "../page/RegistrarTiempoProduccionExcelPage";
import { RegistrarTiempoProduccionPage } from "../page/RegistrarTiempoProduccionPage";

export const  tiempoProduccionRouter:routerI[] = [
{
    path:'tiempo/produccion', 
    component:ListarTiempoProduccionPage
},
{
    path:'tiempo/registrar', 
    component:RegistrarTiempoProduccionPage
},
{
    path:'tiempo/registrar/excel', 
    component:RegistrarTiempoProduccionExcelPage
},

]