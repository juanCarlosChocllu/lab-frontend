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
  TextField,
} from "@mui/material";

import { useNavigate } from "react-router";

export const Listar = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<tiempoProduccionI[]>([]);
  const [paginas, setPaginas] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);

  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const columnas = [
    "sucursal",
    "tipoLente",
    "tipoColor",
    "tratamiento",
    "recepcion",
    "almacen",
    "calculo",
    "digital",
    "antireflejo",
    "esperaMontura",
    "bisel",
    "tinte",
    "controlCalidad",
    "despacho",
    "tiempoLogisticaEntrega",
    "tiempoTransporte",
    "tiempoTotal",
    "estadoAntireflejo",
    "estadoLente",
    "estadoProeceso",
    "tipo",
  ];

  const fetchData = async () => {
    try {
      const response = await listarTiempoProduccion(pagina, filters);
      setData(response.data);
      setPaginas(response.paginas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagina, filters]);

  const handleFilterChange = (e: any, column: string) => {
    setFilters({ ...filters, [column]: e.target.value });
    setPagina(1);
  };

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
        Carga masiva
      </Button>

      <TableContainer
        sx={{
          width: "100%", // Ocupa todo el ancho disponible
          overflowX: "auto", // Permite scroll horizontal si es necesario
          margin: "auto",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              {columnas.map((col) => (
                <TableCell key={col} sx={{ px: 1, py: 0.5, minWidth: 80 }}>
                  {col}
                  <TextField
                    size="small"
                    variant="standard"
                    placeholder="Buscar"
                    value={filters[col]}
                    onChange={(e) => handleFilterChange(e, col)}
                    sx={{ mt: 0.5, width: "100%" }}
                  />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={item._id}
                sx={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "white" }}
              >
                <TableCell sx={{ px: 1, py: 0.5 }}>{item.sucursal}</TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>{item.tipoLente}</TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>{item.tipoColor}</TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>
                  {item.tratamiento}
                </TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>{item.recepcion}</TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>{item.almacen}</TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>{item.calculo}</TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>{item.digital}</TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>
                  {item.antireflejo}
                </TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>
                  {item.esperaMontura}
                </TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>{item.bisel}</TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>{item.tinte}</TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>
                  {item.controlCalidad}
                </TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>{item.despacho}</TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>
                  {item.tiempoLogisticaEntrega}
                </TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>
                  {item.tiempoTransporte}
                </TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>
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
                <TableCell sx={{ px: 1, py: 0.5 }}>
                  {item.estadoAntireflejo}
                </TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>
                  {item.estadoLente}
                </TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>
                  {item.estadoProeceso}
                </TableCell>
                <TableCell sx={{ px: 1, py: 0.5 }}>{item.tipo}</TableCell>
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
