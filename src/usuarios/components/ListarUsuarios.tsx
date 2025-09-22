import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { eliminarUsuario, usuarioListar } from "../service/usuarioService";
import { UsuariosI } from "../interface/usuarios";

export const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UsuariosI[]>([]);

  useEffect(() => {
    listar();
  }, []);

  const listar = async () => {
    try {
      const response = await usuarioListar();
      setUsuarios(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Lista de Usuarios
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="tabla de usuarios">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Apellidos</strong>
              </TableCell>
              <TableCell>
                <strong>Username</strong>
              </TableCell>
              <TableCell>
                <strong>Rol</strong>
              </TableCell>
              <TableCell>
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario, index) => (
              <TableRow key={index}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellidos}</TableCell>
                <TableCell>{usuario.username}</TableCell>
                <TableCell>{usuario.rol}</TableCell>
                <TableCell>
                  <Button
                    onClick={async () => {
                      eliminarUsuario(usuario._id);
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
