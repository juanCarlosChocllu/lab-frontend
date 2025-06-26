export interface SeguimientoI {
_id:string
tracking:string
sector:string
fechaTracking:string
reproceso:string

}
export interface VentasI {
    estado:string,
    fechaVenta:string
    pedido:string
    producto:string
    descripcion:string
    timpoTranscurrido:string
    seguimiento:SeguimientoI[]
    timpoTranscurridoTransporte:string
    entregaLaboratorio:string
    tiempoPrometido:string
}