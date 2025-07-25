export function porcentajeIdeal(
  tiempoLaboratorio: string,
  tiempoPrometido: string
): number {
    let resultado = 0
  const laboratorio = parsearTiempoMinutos(tiempoLaboratorio);
  const prometido = parsearTiempoMinutos(tiempoPrometido);
  if(laboratorio > 0 && prometido > 0) {
    resultado = (laboratorio / prometido) * 100;
  }

  return Number(resultado.toFixed(2));
}

export function parsearTiempoMinutos(tiempoStr: string): number {
  let totalMinutos = 0;
  if (tiempoStr) {
    const diasMatch = tiempoStr.match(/(\d+)\s*dia\(s\)/);
    if (diasMatch) {
      totalMinutos += parseInt(diasMatch[1], 10) * 24 * 60;
    }
    const horasMatch = tiempoStr.match(/(\d+)h/);
    if (horasMatch) {
      totalMinutos += parseInt(horasMatch[1], 10) * 60;
    }
    const minutosMatch = tiempoStr.match(/(\d+)m/);
    if (minutosMatch) {
      totalMinutos += parseInt(minutosMatch[1], 10);
    }
  }
  return totalMinutos;
}
