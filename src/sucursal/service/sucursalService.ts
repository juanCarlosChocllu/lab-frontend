import { instance } from "../../core/config/instance";
import { ListarSucursalI } from "../interface/sucursal";

export async function listarSucursal(): Promise<ListarSucursalI[]> {
  try {
    const response = await instance.get("sucursal");
    return response.data;
  } catch (error) {
    throw error;
  }
}