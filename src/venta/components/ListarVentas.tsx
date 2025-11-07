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
  IconButton,
} from "@mui/material";
import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Tooltip from '@mui/material/Tooltip';

import { porcentajeIdeal } from "../../core/util/porcentajeIdeal";
import { diferenciaLaboratorioYTiempoPrometido } from "../../core/util/diferencia";
import { Buscador } from "./Buscador";
import { buscadorI } from "../interface/buscador";
import { Loader } from "../../core/components/Loader";
import { exportarExcelVenta } from "../utils/exportarExcelVentas";

type OrdenColumna = 
  | "pedido"
  | "producto"
  | "descripcion"
  | "estado"
  | "entregaLaboratorio"
  | "timpoTranscurridoTransporte"
  | "timpoTranscurrido"
  | "tiempoPrometido"
  | "cumplimiento"
  | "porcentajeIdeal";

type DireccionOrden = "asc" | "desc";

export const ListarVentas = () => {
  const [ventas, setVentas] = useState<VentasI[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [buscador, setBuscador] = useState<buscadorI>({});
  const [seguimiento, setSeguimiento] = useState<SeguimientoI[]>([]);
  const [pedido, setPedido] = useState<string>();
  const { closeModal, isOpen, openModal } = modalAccion();
  const [pagina, setPagina] = useState(1);
  const [ordenColumna, setOrdenColumna] = useState<OrdenColumna | null>(null);
  const [direccionOrden, setDireccionOrden] = useState<DireccionOrden>("asc");
  const [descripcionExpandida, setDescripcionExpandida] = useState<number | null>(null);
  const elementosPorPagina = 20;

  // Función para ordenar las ventas
  const ventasOrdenadas = [...ventas].sort((a, b) => {
    if (!ordenColumna) return 0;

    let valorA: any;
    let valorB: any;

    switch (ordenColumna) {
      case "pedido":
        valorA = a.pedido;
        valorB = b.pedido;
        break;
      case "producto":
        valorA = a.producto;
        valorB = b.producto;
        break;
      case "descripcion":
        valorA = a.descripcion;
        valorB = b.descripcion;
        break;
      case "estado":
        valorA = a.estado;
        valorB = b.estado;
        break;
      case "entregaLaboratorio":
        valorA = a.entregaLaboratorio || 0;
        valorB = b.entregaLaboratorio || 0;
        break;
      case "timpoTranscurridoTransporte":
        valorA = a.timpoTranscurridoTransporte || 0;
        valorB = b.timpoTranscurridoTransporte || 0;
        break;
      case "timpoTranscurrido":
        valorA = a.timpoTranscurrido || 0;
        valorB = b.timpoTranscurrido || 0;
        break;
      case "tiempoPrometido":
        valorA = a.tiempoPrometido || 0;
        valorB = b.tiempoPrometido || 0;
        break;
      case "cumplimiento":
        valorA = diferenciaLaboratorioYTiempoPrometido(
          a.timpoTranscurrido,
          a.tiempoPrometido
        );
        valorB = diferenciaLaboratorioYTiempoPrometido(
          b.timpoTranscurrido,
          b.tiempoPrometido
        );
        break;
      case "porcentajeIdeal":
        valorA = porcentajeIdeal(a.timpoTranscurrido, a.tiempoPrometido);
        valorB = porcentajeIdeal(b.timpoTranscurrido, b.tiempoPrometido);
        break;
      default:
        return 0;
    }

    // Comparación
    if (typeof valorA === "string" && typeof valorB === "string") {
      return direccionOrden === "asc"
        ? valorA.localeCompare(valorB)
        : valorB.localeCompare(valorA);
    }

    if (direccionOrden === "asc") {
      return valorA > valorB ? 1 : valorA < valorB ? -1 : 0;
    } else {
      return valorA < valorB ? 1 : valorA > valorB ? -1 : 0;
    }
  });

  const ventasPaginadas = ventasOrdenadas.slice(
    (pagina - 1) * elementosPorPagina,
    pagina * elementosPorPagina
  );
  const totalPaginas = Math.ceil(ventasOrdenadas.length / elementosPorPagina);

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

  // Función para manejar el click en las columnas
  const handleOrdenar = (columna: OrdenColumna) => {
    if (ordenColumna === columna) {
      // Si ya está ordenado por esta columna, cambiar dirección
      setDireccionOrden(direccionOrden === "asc" ? "desc" : "asc");
    } else {
      // Si es una nueva columna, ordenar ascendente
      setOrdenColumna(columna);
      setDireccionOrden("asc");
    }
    setPagina(1); // Volver a la primera página al ordenar
  };

  // Función para alternar la descripción expandida
  const toggleDescripcion = (index: number) => {
    setDescripcionExpandida(descripcionExpandida === index ? null : index);
  };

  // Componente para el encabezado con ordenamiento
  const EncabezadoOrdenable = ({
    columna,
    texto,
  }: {
    columna: OrdenColumna;
    texto: string;
  }) => (
    <TableCell
      sx={{
        fontSize: "0.75rem",
        fontWeight: "bold",
        padding: "6px 12px",
        cursor: "pointer",
        userSelect: "none",
        "&:hover": { backgroundColor: "#e0e0e0" },
      }}
      onClick={() => handleOrdenar(columna)}
    >
      <Box display="flex" alignItems="center" gap={0.5}>
        {texto}
        {ordenColumna === columna && (
          direccionOrden === "asc" ? (
            <ArrowUpwardIcon sx={{ fontSize: "0.875rem" }} />
          ) : (
            <ArrowDownwardIcon sx={{ fontSize: "0.875rem" }} />
          )
        )}
      </Box>
    </TableCell>
  );

  return (
    <Box>
      <Buscador setFilter={setBuscador} />
      <Button onClick={() => exportarExcelVenta(ventas)}>excel</Button>
      <TableContainer sx={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table size="small" sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <EncabezadoOrdenable columna="pedido" texto="pedido" />
              <EncabezadoOrdenable columna="producto" texto="producto" />
              <EncabezadoOrdenable columna="descripcion" texto="descripcion" />
              <EncabezadoOrdenable columna="estado" texto="estado" />
              <EncabezadoOrdenable
                columna="entregaLaboratorio"
                texto="tiempo lab"
              />
              <EncabezadoOrdenable
                columna="timpoTranscurridoTransporte"
                texto="tiempo transporte"
              />
              <EncabezadoOrdenable
                columna="timpoTranscurrido"
                texto="tiempo total prod."
              />
              <EncabezadoOrdenable
                columna="tiempoPrometido"
                texto="tiempo prometido"
              />
              <EncabezadoOrdenable
                columna="cumplimiento"
                texto="Cumplimiento"
              />
             {/* <EncabezadoOrdenable
                columna="porcentajeIdeal"
                texto="% ideal"
              />*/}
              <TableCell
                sx={{
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  padding: "6px 12px",
                }}
              >
                Tracking
              </TableCell>
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
                <TableCell sx={{ 
                  fontSize: "0.75rem", 
                  padding: "6px 12px",
                  maxWidth: "250px"
                }}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.75rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: descripcionExpandida === i ? "normal" : "nowrap",
                        wordBreak: "break-word"
                      }}
                    >
                      {item.descripcion}
                    </Typography>
                    {item.descripcion && item.descripcion.length > 50 && (
                      <Button
                        size="small"
                        sx={{ 
                          fontSize: "0.65rem", 
                          padding: "2px 6px",
                          minWidth: "auto",
                          textTransform: "none",
                          mt: 0.5
                        }}
                        onClick={() => toggleDescripcion(i)}
                      >
                        {descripcionExpandida === i ? "Ver menos" : "Ver más"}
                      </Button>
                    )}
                  </Box>
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
                      ) == 0 ? (
                      <FaArrowRight
                        style={{ color: "#8B8000", fontSize: "1rem" }}
                      />
                    ) : (
                      <FaArrowDown
                        style={{ color: "#16a34a", fontSize: "1rem" }}
                      />
                    )}
                    <Tooltip title = {`${porcentajeIdeal(
                    item.timpoTranscurrido,
                    item.tiempoPrometido
                  )} %`}
                  >
                      <Typography sx={{ fontSize: "0.85rem", fontWeight: 500 }}>
                      {diferenciaLaboratorioYTiempoPrometido(
                        item.timpoTranscurrido,
                        item.tiempoPrometido
                      )}
                      
                    </Typography>
                    </Tooltip>

                  </Box>
                </TableCell>
                {/*<TableCell sx={{ fontSize: "0.75rem", padding: "6px 12px" }}>
                  {porcentajeIdeal(
                    item.timpoTranscurrido,
                    item.tiempoPrometido
                  )}
                  %
                </TableCell>*/}
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