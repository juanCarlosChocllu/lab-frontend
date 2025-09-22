export interface  contextI{
    autenticacion:boolean|null,
    setEstadoAutenticacion:(estado:boolean)=> void
        logout:()=> void
}