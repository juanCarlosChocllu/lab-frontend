import { AxiosResponse } from "axios";
import { instance } from "../../core/config/instance";
import { rangoI } from "../interface/rango";

export async function listarRango(): Promise<rangoI[]> {
  try {
    const response = await instance.get("rango");
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function asignarTipo(id:string, tipo:string): Promise<AxiosResponse> {
  try {
    const response = await instance.patch(`rango/${id}/${tipo}`);
    return response;
  } catch (error) {
    throw error;
  }
}
