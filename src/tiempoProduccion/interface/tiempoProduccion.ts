export interface tiempoProduccionI {
  _id?: string;
  recepcion: number;
  almacen: number;
  calculo: number;
  digital: number;
  antireflejo: number;
  bisel: number;
  tinte: number;
  despacho: number;
  controlCalidad: number;
  estadoAntireflejo: string;
  estadoLente: string;
  estadoProeceso: string;
  tiempoLogisticaEntrega: number;
  tipoLente: string;
  tipoColor: string;
  tratamiento: string;
  sucursal: string;
  tipo:string
    tiempoTransporte:number
}


export interface RegistarTiempoProduccionI {

  recepcion: number;

  
  almacen: number;

 
  digital: number;


  bisel: number;


  tinte: number;

estadoAntireflejo :string

  despacho: number;


  controlCalidad: number;

  antireflejo:number

  
  tiempoLogisticaEntrega: number;

 
      calculo:number


  
  tipo: string;


  estadoLente: string;

  estadoProeceso: string;

 
  combinacionTiempo:string;

  tiempoTransporte:number

  sucursal: string;
}
