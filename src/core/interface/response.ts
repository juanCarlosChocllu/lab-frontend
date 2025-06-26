import { HttpStatus } from "../enum/httpStatus"

export interface ResponseI<T> {
    paginas:number
    data:T[]
    status:HttpStatus
}