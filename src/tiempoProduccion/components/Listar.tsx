import { useEffect, useState } from "react";
import { listarTiempoProduccion } from "../service/tiempoProduccionService";
import { tiempoProduccionI } from "../interface/tiempoProduccion";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Stack,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

import { useNavigate } from "react-router";

export const Listar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<tiempoProduccionI[]>([]);
  const [paginas, setPaginas] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);
  const [limite, setLimite] = useState<number>(10);
  console.log(limite);

  useEffect(() => {
    (async () => {
      try {
        const response = await listarTiempoProduccion(pagina, limite);
        setData(response.data);
        setPaginas(response.paginas);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [limite, pagina]);

  return (
    <Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/tiempo/registrar")}
        sx={{ m: 2 }}
      >
        Registrar
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/tiempo/registrar/excel")}
        sx={{ m: 2 }}
      >
        carga masiva
      </Button>

      <TableContainer>
        <Box
          mt={2}
          mb={2}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          <FormControl size="small" sx={{ width: 120 }}>
            <InputLabel id="items-per-page-label">Items por página</InputLabel>
            <Select
              labelId="items-per-page-label"
              value={limite}
              label="Items por página"
              onChange={(e) => {
                setLimite(e.target.value);
                setPagina(1);
              }}
            >
              {[10, 20, 50, 100].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Sucursal</TableCell>
              <TableCell >Tipo Lente</TableCell>
              <TableCell >Color</TableCell>
              <TableCell >Tratamiento</TableCell>
              <TableCell >Recepción</TableCell>
              <TableCell >Almacén</TableCell>
              <TableCell >Cálculo</TableCell>
              <TableCell >Digital</TableCell>
              <TableCell >Antirreflejo</TableCell>
              <TableCell >Espera montura</TableCell>
              <TableCell >Bisel</TableCell>
              <TableCell >Tinte</TableCell>
              <TableCell >Control Calidad</TableCell>
              <TableCell >Despacho</TableCell>
              <TableCell >Tiemp. Entrega</TableCell>
              <TableCell >Tiemp. Trans</TableCell>
              <TableCell >Tiempo Total</TableCell>
              <TableCell >Estado Ant.</TableCell>
              <TableCell >Lente</TableCell>
              <TableCell >Proceso</TableCell>
              <TableCell >Tipo</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item._id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                }}
              >
                <TableCell>{item.sucursal}</TableCell>
                <TableCell>{item.tipoLente}</TableCell>
                <TableCell >{item.tipoColor}</TableCell>
                <TableCell >{item.tratamiento}</TableCell>
                <TableCell >{item.recepcion}</TableCell>
                <TableCell >{item.almacen}</TableCell>
                <TableCell >{item.calculo}</TableCell>
                <TableCell >{item.digital}</TableCell>
                <TableCell >{item.antireflejo}</TableCell>
                <TableCell >{item.esperaMontura}</TableCell>
                <TableCell >{item.bisel}</TableCell>
                <TableCell >{item.tinte}</TableCell>
                <TableCell >{item.controlCalidad}</TableCell>
                <TableCell >{item.despacho}</TableCell>
                <TableCell >
                  {item.tiempoLogisticaEntrega}
                </TableCell>
                <TableCell >{item.tiempoTransporte}</TableCell>
                <TableCell >
                  {item.recepcion +
                    item.almacen +
                    item.calculo +
                    item.digital +
                    item.antireflejo +
                    item.bisel +
                    item.tinte +
                    item.controlCalidad +
                    item.despacho +
                    item.tiempoLogisticaEntrega +
                    item.tiempoTransporte +
                    item.esperaMontura}
                </TableCell>
                <TableCell >{item.estadoAntireflejo}</TableCell>
                <TableCell >{item.estadoLente}</TableCell>
                <TableCell >{item.estadoProeceso}</TableCell>
                <TableCell >{item.tipo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack mt={2} alignItems="center" spacing={2}>
        <Pagination
          count={paginas}
          page={pagina}
          onChange={(_, value) => setPagina(value)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Stack>
    </Paper>
  );
};
