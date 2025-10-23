import { useEffect, useState } from "react";
import { asignarTipo, listarRango } from "../service/rangoService";
import { rangoI } from "../interface/rango";

// 🧱 Material UI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  TextField,
  TablePagination,
  Box,
} from "@mui/material";

export const RangoPage = () => {
  const [data, setData] = useState<rangoI[]>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");


  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);

  useEffect(() => {
    (async () => {
      try {
        const response = await listarRango();
        setData(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [reload]);


  const filteredData = data.filter((rango) =>{
    return rango.nombre.toLowerCase().includes(search.toLowerCase())
  }
  );


  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );


  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Gestión de Rangos
      </Typography>

      {/* 🔍 Buscador */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TextField
          label="Buscar por nombre"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {/* 🧾 Tabla */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Nombre</b></TableCell>
              <TableCell><b>Tipo</b></TableCell>
              <TableCell><b>Asignar</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((rango) => (
                <TableRow key={rango._id}>
                  <TableCell>{rango.nombre}</TableCell>
                  <TableCell>{rango.tipo || ""}</TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <InputLabel>Tipo</InputLabel>
                      <Select
                        value={rango.tipo || ""}
                        label="Tipo"
                        onChange={async (e) => {
                          try {
                            const response = await asignarTipo(
                              rango._id,
                              e.target.value as string
                            );
                            if (response.status === 200) {
                              setReload(!reload);
                            }
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        <MenuItem value="LABORATORIO">LABORATORIO</MenuItem>
                        <MenuItem value="STOCK">STOCK</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No hay resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 📄 Paginador */}
        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Paper>
  );
};
