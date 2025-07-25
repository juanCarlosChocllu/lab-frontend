import moment from "moment";
import { parsearTiempoMinutos } from "./porcentajeIdeal";
export function diferencia(fechaInicio: string, fechaFin: string): string {
  const f1 = moment(fechaInicio);
  const f2 = moment(fechaFin);
  const minutos = f2.diff(f1, "minutes");
  const totalHoras = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;

  return totalHoras > 0
    ? `${totalHoras}h ${minutosRestantes} m`
    : `${minutos} m`;
}

export function diferenciaLaboratorioYTiempoPrometido(
  tiempoLaboratorio: string,
  tiempoPrometido: string
) {
  let tiempo= `${0}m`
  const laboratorio = parsearTiempoMinutos(tiempoLaboratorio);
  const prometido = parsearTiempoMinutos(tiempoPrometido);
  
  const diferencia = Math.abs(laboratorio - prometido);
  const horas = Math.floor(diferencia / 60);
  const minutos = diferencia % 60;
  const horasRestantes = horas % 24;
  const dias = Math.floor(horas / 24);

  if (laboratorio > 0 && prometido > 0) {
    tiempo=  dias > 0
    ? `${dias}dia(s) ${horasRestantes}h ${minutos} m`
    : ` ${horasRestantes}h ${minutos}m`;
  }
  return tiempo
}
