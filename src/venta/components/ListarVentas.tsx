import { listarVentas } from "../services/ventaService";
import { SeguimientoI, VentasI } from "../interface/ventas";
import { useEffect, useState } from "react";
import { modalAccion } from "../../core/hook/modalAccion";
import { SeguimientoModal } from "../modal/SeguimientoModal";

import { HttpStatus } from "../../core/enum/httpStatus";
import TableContainer from "@mui/material/TableContainer";
import {
  Box,
  Button,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

import { porcentajeIdeal } from "../../core/util/porcentajeIdeal";
import { diferenciaLaboratorioYTiempoPrometido } from "../../core/util/diferencia";
import { Buscador } from "./Buscador";
import { buscadorI } from "../interface/buscador";
import { Loader } from "../../core/components/Loader";
import { exportarExcelVenta } from "../utils/exportarExcelVentas";
export const ListarVentas = () => {
  const [ventas, setVentas] = useState<VentasI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [buscador, setBuscador] = useState<buscadorI>({});
  const [seguimiento, setSeguimiento] = useState<SeguimientoI[]>([]);
  const [pedido, setPedido] = useState<string>();
  const { closeModal, isOpen, openModal } = modalAccion();
  const [pagina, setPagina] = useState(1);
  const elementosPorPagina = 20;

  const ventasPaginadas = ventas.slice(
    (pagina - 1) * elementosPorPagina,
    pagina * elementosPorPagina
  );
  const totalPaginas = Math.ceil(ventas.length / elementosPorPagina);

  useEffect(() => {
    ventasResponse();
  }, [buscador]);

  const ventasResponse = async () => {
    try {
      setLoading(true);
      const response = await listarVentas(buscador);

      if (response.status == HttpStatus.OK) {
        setVentas(response.data);

        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const tracking = (seguimiento: SeguimientoI[], pedido: string) => {
    setSeguimiento(seguimiento);
    setPedido(pedido);
    openModal();
  };

  return (
    <Box>
      <Buscador setFilter={setBuscador} />
      <Button
        onClick={()=> exportarExcelVenta(ventas)}
      >excel</Button>
      <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {[
                "pedido",
                "producto",
                "descripcion",
                "estado",
                "tiempo lab",
                "tiempo transporte",
                "tiempo total prod.",
                "tiempo prometido",
                "Cumplimiento",
                "% ideal",
                "Tracking",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    padding: "6px 12px",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {ventasPaginadas.map((item, i) => (
              <TableRow key={i}>
                <TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  {item.pedido}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  {item.producto}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  {item.descripcion}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  {item.estado}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  {item.entregaLaboratorio}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  {item.timpoTranscurridoTransporte}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  {item.timpoTranscurrido}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  {item.tiempoPrometido}
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {porcentajeIdeal(
                      item.timpoTranscurrido,
                      item.tiempoPrometido
                    ) > 100 ? (
                      <FaArrowUp
                        style={{ color: "#dc2626", fontSize: "1rem" }}
                      />
                    ) : porcentajeIdeal(
                      item.timpoTranscurrido,
                      item.tiempoPrometido
                    )  == 0 ? (
                      <FaArrowRight
                        style={{ color: "#8B8000", fontSize: "1rem" }}
                      />
                    ): <FaArrowDown 
                        style={{ color: "#16a34a", fontSize: "1rem" }}
                      /> }
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
                      {diferenciaLaboratorioYTiempoPrometido(
                        item.timpoTranscurrido,
                        item.tiempoPrometido
                      )}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  {porcentajeIdeal(
                    item.timpoTranscurrido,
                    item.tiempoPrometido
                  )}
                  %
                </TableCell>
                <TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  <Button
                    size="small"
                    onClick={() => tracking(item.seguimiento, item.pedido)}
                    variant="outlined"
                  >
                    Tracking
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Stack mt={2} alignItems="center" spacing={2}>
          <Pagination
            count={totalPaginas}
            page={pagina}
            onChange={(_, value) => setPagina(value)}
            color="primary"
            showFirstButton
            showLastButton
          />
        </Stack>
        {isOpen && pedido && (
          <SeguimientoModal
            closeModal={closeModal}
            isOpen={isOpen}
            seguimiento={seguimiento}
            openModal={openModal}
            pedido={pedido}
          />
        )}
      </TableContainer>
      {loading && <Loader />}
    </Box>
  );
};
