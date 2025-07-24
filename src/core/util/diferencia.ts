import moment from "moment";
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
