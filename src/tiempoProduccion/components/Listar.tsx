import { useEffect, useState } from "react";
import { listarTiempoProduccion } from "../service/tiempoProduccionService";
import { tiempoProduccionI } from "../interface/teimpoProduccion";
import {
    Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router";

export const Listar = () => {
    const navigate= useNavigate()
  const [data, setData] = useState<tiempoProduccionI[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await listarTiempoProduccion();
        setData(response);
      } catch (error) {
        console.log(error);
      }
    })();
  },[]);

  return (
   <TableContainer  className="mt-20">
    <Button onClick={()=> navigate("/tiempo/registrar")}>Registrar</Button>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Sucursal</TableCell>
        <TableCell align="right">Tipo de Lente</TableCell>
        <TableCell align="right">Color</TableCell>
        <TableCell align="right">Tratamiento</TableCell>
        <TableCell align="right">Recepción</TableCell>
        <TableCell align="right">Almacén</TableCell>
        <TableCell align="right">Cálculo</TableCell>
        <TableCell align="right">Digital</TableCell>
        <TableCell align="right">Antirreflejo</TableCell>
        <TableCell align="right">Bisel</TableCell>
        <TableCell align="right">Tinte</TableCell>
        <TableCell align="right">Control  Calidad</TableCell>
        <TableCell align="right">Despacho</TableCell>
        <TableCell align="right">Tiemp. Entrega</TableCell>
        <TableCell align="right">Estado Ant.</TableCell>
        <TableCell align="right">Lente</TableCell>
        <TableCell align="right">Proceso</TableCell>
         <TableCell align="right">tipo</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((item) => (
        <TableRow
          key={item._id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">{item.sucursal}</TableCell>
          <TableCell >{item.tipoLente}</TableCell>
          <TableCell >{item.tipoColor}</TableCell>
          <TableCell >{item.tratamiento}</TableCell>
          <TableCell>{item.recepcion}</TableCell>
          <TableCell >{item.almacen}</TableCell>
          <TableCell >{item.calculo}</TableCell>
          <TableCell >{item.digital}</TableCell>
          <TableCell >{item.antireflejo}</TableCell>
          <TableCell >{item.bisel}</TableCell>
          <TableCell >{item.tinte}</TableCell>
          <TableCell >{item.controlCalidad}</TableCell>
          <TableCell>{item.despacho}</TableCell>
          <TableCell >{item.tiempoLogisticaEntrega}</TableCell>
          <TableCell >{item.estadoAntireflejo}</TableCell>
          <TableCell >{item.estadoLente}</TableCell>
          <TableCell>{item.estadoProeceso}</TableCell>
                 <TableCell >{item.tipo}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>

  );
};
