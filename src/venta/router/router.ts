import { routerI } from "../../core/interface/router";
import { ListarVentaPage } from "../page/ListarVentaPage";

export const  ventaRouter:routerI[] = [
{
    path:'listar/venta', 
    component:ListarVentaPage
}

]