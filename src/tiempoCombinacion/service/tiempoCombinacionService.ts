import { AxiosResponse } from "axios";
import { instance } from "../../core/config/instance";
import {
  combinacionDataI,
  CombinacionTimepoI,
  RegistrarCombinacionI,
} from "../interface/tiempoCombinacion";

export async function listarTratamiento(): Promise<combinacionDataI[]> {
  try {
    const response = await instance.get("tratamiento");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function listarTipoColor(): Promise<combinacionDataI[]> {
  try {
    const response = await instance.get("tipo/color");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function registrarCombinacion(
  data: RegistrarCombinacionI
): Promise<AxiosResponse> {
  try {
    const response = await instance.post("combinacion/tiempo", data);
    
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function listaCombinacionTiempo(): Promise<CombinacionTimepoI[]> {
  try {
    const response = await instance.get("combinacion/tiempo");
    return response.data;
  } catch (error) {
    throw error;
  }
}

