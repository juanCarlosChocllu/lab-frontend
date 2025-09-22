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
        Registrar excel
      </Button>


      <TableContainer>


        <Box mt={2} mb={2} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
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
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
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
              <TableCell align="right">Control Calidad</TableCell>
              <TableCell align="right">Despacho</TableCell>
              <TableCell align="right">Tiemp. Entrega</TableCell>
              <TableCell align="right">Tiemp. Trans</TableCell>
              <TableCell align="right">Estado Ant.</TableCell>
              <TableCell align="right">Lente</TableCell>
              <TableCell align="right">Proceso</TableCell>
              <TableCell align="right">Tipo</TableCell>
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
                <TableCell align="right">{item.tipoLente}</TableCell>
                <TableCell align="right">{item.tipoColor}</TableCell>
                <TableCell align="right">{item.tratamiento}</TableCell>
                <TableCell align="right">{item.recepcion}</TableCell>
                <TableCell align="right">{item.almacen}</TableCell>
                <TableCell align="right">{item.calculo}</TableCell>
                <TableCell align="right">{item.digital}</TableCell>
                <TableCell align="right">{item.antireflejo}</TableCell>
                <TableCell align="right">{item.bisel}</TableCell>
                <TableCell align="right">{item.tinte}</TableCell>
                <TableCell align="right">{item.controlCalidad}</TableCell>
                <TableCell align="right">{item.despacho}</TableCell>
                <TableCell align="right">
                  {item.tiempoLogisticaEntrega}
                </TableCell>
                <TableCell align="right">{item.tiempoTransporte}</TableCell>
                <TableCell align="right">{item.estadoAntireflejo}</TableCell>
                <TableCell align="right">{item.estadoLente}</TableCell>
                <TableCell align="right">{item.estadoProeceso}</TableCell>
                <TableCell align="right">{item.tipo}</TableCell>
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
