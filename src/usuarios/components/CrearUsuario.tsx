import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { CrearUsuariosI } from "../interface/usuarios";
import { registrarUsuario } from "../service/usuarioService";
import { toast } from "react-toastify";
import { useEstadoReload } from "../../core/hook/zustan";
import { AxiosError } from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const CrearUsuario = () => {
  const [open, setOpen] = useState(false);
  const [errPassword, setErrorPassword] = useState('');
  const { triggerReload } = useEstadoReload();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CrearUsuariosI>();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data: CrearUsuariosI) => {
    try {
      console.log("Datos enviados:", data);
      const response = await registrarUsuario(data);
      if (response.status == 201) {
        triggerReload();
        toast.success("Registrado");
        handleClose();
      }
    } catch (error) {
      console.log(error);

      const e = error as AxiosError<any>;
      console.log(e);

      if (e.status == 409) {
        toast.error(e.response?.data.message);
      } else if (e.status == 400) {
        setErrorPassword(e.response?.data.message[0])

      } else {
        toast.error(e.message);
      }
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Crear Usuario
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Registrar Usuario</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Nombre"
              fullWidth
              margin="normal"
              {...register("nombre", { required: "El nombre es obligatorio" })}
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
            />

            <TextField
              label="Apellidos"
              fullWidth
              margin="normal"
              {...register("apellidos", {
                required: "Los apellidos son obligatorios",
              })}
              error={!!errors.apellidos}
              helperText={errors.apellidos?.message}
            />

            <TextField
              label="Username"
              fullWidth
              margin="normal"
              {...register("username", {
                required: "El nombre de usuario es obligatorio",
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <TextField
              label="Rol"
              select
              fullWidth
              margin="normal"
              defaultValue=""
              {...register("rol", { required: "El rol es obligatorio" })}
              error={!!errors.rol}
              helperText={errors.rol?.message}
            >
              <MenuItem value="Administrador">Administrador</MenuItem>
              <MenuItem value="Usuario">Usuario</MenuItem>
            </TextField>

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
             
            />
 {errPassword && <p>{errPassword}</p>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Registrar
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
