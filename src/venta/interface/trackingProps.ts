import { modalI } from "../../core/interface/modal";
import { SeguimientoI } from "./ventas";

export interface TrackingProps extends modalI {
    seguimiento:SeguimientoI[]
    pedido:string
}