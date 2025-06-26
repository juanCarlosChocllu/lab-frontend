import { listarVentas } from "../services/ventaService";
import { SeguimientoI, VentasI } from "../interface/ventas";
import { useEffect, useState } from "react";
import { modalAccion } from "../../core/hook/modalAccion";
import { SeguimientoModal } from "../modal/SeguimientoModal";
import { Paginador } from "../../core/components/Paginador";
import { paginador } from "../../core/hook/paginador";
import { ItemsPorPagina } from "../../core/components/ItemsPorPagina";
import { HttpStatus } from "../../core/enum/httpStatus";
import TableContainer from '@mui/material/TableContainer';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
export const ListarVentas = () => {
  const [ventas, setVentas] = useState<VentasI[]>([]);
  const [seguimiento, setSeguimiento] = useState<SeguimientoI[]>([]);
  const [pedido, setPedido] = useState<string>();
  const { closeModal, isOpen, openModal } = modalAccion();
  const { limite, pagina, paginas, setLimite, setPagina, setPaginas } =
    paginador();
  useEffect(() => {
    ventasResponse();
  }, [limite, pagina]);

  const ventasResponse = async () => {
    try {
      const response = await listarVentas(limite, pagina);

      if (response.status == HttpStatus.OK) {
        setVentas(response.data);
        setPaginas(response.paginas);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tracking = (seguimiento: SeguimientoI[], pedido: string) => {
    setSeguimiento(seguimiento);
    setPedido(pedido);
    openModal();
  };
  return (
    <TableContainer  >
      <ItemsPorPagina page={setLimite} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell 
            
              aria-sort="other"
            >
              pedido
            </TableCell>
            <TableCell >
              producto
            </TableCell>
            <TableCell>
              descripcion
            </TableCell>
            <TableCell >
              estado
            </TableCell>
            <TableCell >
              tiempo lab
            </TableCell>
            <TableCell >
              tiempo transporte
            </TableCell>
            <TableCell >
              tiempo total prod.
            </TableCell>

            <TableCell >
              tiempo prometido.
            </TableCell>

            <TableCell >
              % ideal
            </TableCell>
            <TableCell >
              Tracking
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ventas.map((item, i) => (
            <TableRow key={i}>
              <TableCell >{item.pedido}</TableCell >
              <TableCell >{item.producto}</TableCell >
              <TableCell  >{item.descripcion}</TableCell >
              <TableCell  >{item.estado}</TableCell >
              <TableCell  >{item.entregaLaboratorio}</TableCell >
              <TableCell  >{item.timpoTranscurridoTransporte}</TableCell >
              <TableCell  >{item.timpoTranscurrido}</TableCell >
              <TableCell  >{item.tiempoPrometido}</TableCell >
              <TableCell  >{0}</TableCell >

              <TableCell>
                <Button
                  onClick={() => tracking(item.seguimiento, item.pedido)}
                 
                >
                  Tracking
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Paginador
        paginaActual={pagina}
        paginaSeleccionada={setPagina}
        paginas={paginas}
      />
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
  );
};
