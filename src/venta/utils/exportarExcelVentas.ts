import { diferenciaLaboratorioYTiempoPrometido } from "../../core/util/diferencia";
import { porcentajeIdeal } from "../../core/util/porcentajeIdeal";
import { VentasI } from "../interface/ventas";
import ExcelJS from "exceljs";


export async function exportarExcelVenta(venta: VentasI[]) {
    const workbook = new ExcelJS.Workbook();
  const worksheetVentas = workbook.addWorksheet("ventas");
  const worksheetTracking = workbook.addWorksheet("Tracking");
  worksheetTracking.columns = [
    { header: "pedido", key: "pedido" },
    { header: "id_venta", key: "id_venta" },
    { header: "tracking", key: "tracking" },
    { header: "sector", key: "sector" },
    { header: "fecha", key: "fecha" },
  ];

  worksheetVentas.columns = [
    { header: "pedido", key: "pedido" },
    { header: "id venta", key: "id_venta" },
    { header: "descripcion", key: "descripcion" },
    { header: "estado", key: "estado" },
    { header: "tiempo laboratorio", key: "laboratorio" },
    { header: "tiempo transporte", key: "tiempoTransporte" },
    { header: "tiempo produccion", key: "tiempoProduccion" },
    { header: "tiempo prometido", key: "tiempoPrometido" },
    { header: "cumplimiento", key: "cumplimiento" },
    { header: "cumplimiento %", key: "cumplimientoPorcentaje" },
    { header: "tracking", key: "tracking" },
    { header: "fechaVenta", key: "fechaVenta" },
  ];

  worksheetVentas.addRows(
    venta.map((data) => ({
      pedido: data.pedido,
      id_venta: data.producto,
      descripcion: data.descripcion,
      estado: data.estado,
      laboratorio: data.entregaLaboratorio,
      tiempoTransporte: data.timpoTranscurridoTransporte,
      tiempoProduccion: data.timpoTranscurrido,
      tiempoPrometido: data.tiempoPrometido,
      cumplimiento: diferenciaLaboratorioYTiempoPrometido(
        data.timpoTranscurrido,
        data.tiempoPrometido
      ),
      cumplimientoPorcentaje: porcentajeIdeal(
        data.timpoTranscurrido,
        data.tiempoPrometido
      ),

      fechaVenta: data.fechaVenta,
    }))
  );

  worksheetTracking.addRows(
    venta.flatMap((item) =>
      item.seguimiento.map((i) => ({
        pedido: item.pedido,
        id_venta: item.producto,
        tracking: i.tracking,
        sector: i.sector,
        fecha: i.fechaTracking,
      }))
    )
  );

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);
  console.log(url);

  const a = document.createElement("a");
  a.href = url;
  a.download = `Ventas.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
