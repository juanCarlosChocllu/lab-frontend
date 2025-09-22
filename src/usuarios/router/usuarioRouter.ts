import { routerI } from "../../core/interface/router";
import { UsuarioPage } from "../page/UsuarioPage";

export const  usuarioRouter:routerI[] = [
{
    path:'listar/usuarios', 
    component:UsuarioPage
}

]