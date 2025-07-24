import {
  Modal,
  Box,
  Typography,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { modalI } from "../../core/interface/modal";
import {
  combinacionDataI,
  RegistrarCombinacionI,
} from "../interface/tiempoCombinacion";
import { useEffect, useState } from "react";
import {
  listarTipoColor,
  listarTratamiento,
  registrarCombinacion,
} from "../service/tiempoCombinacionService";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export const TiempoCombinacionModal = ({ closeModal, isOpen }: modalI) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegistrarCombinacionI>();

  const [tratamiento, setTratamiento] = useState<combinacionDataI[]>([]);
  const [tipoColor, setTipoColor] = useState<combinacionDataI[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const [trata, tipoL] = await Promise.all([
          listarTratamiento(),
          listarTipoColor(),
        ]);
        setTratamiento(trata);
        setTipoColor(tipoL);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []); 

  const onSubmit = async(data: RegistrarCombinacionI) => {
    try {
     const response = await   registrarCombinacion(data)
    if(response.status == 201){
      toast.success('Registrado')
    }
    } catch (error) {
        const e = error as AxiosError
        if(e.status === 409){
          toast.error('Conflicto')
        }
    }
  };

  return (
    <Modal open={isOpen} onClose={closeModal} aria-labelledby="modal-title">
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Tiempo de Combinación
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="select1-label">TIPO LENTE</InputLabel>
            <Select labelId="select1-label" defaultValue="" {...register("tipoLente")}>
              <MenuItem value="VISION SENCILLA">VISION SENCILLA</MenuItem>
              <MenuItem value="CUALQUIER LENTE">CUALQUIER LENTE</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="select2-label">TIPO COLOR</InputLabel>
            <Select labelId="select2-label" defaultValue="" {...register("tipoColor")}>
              <MenuItem value="">Seleccione una opción</MenuItem>
              {tipoColor.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="select3-label">TRATAMIENTO</InputLabel>
            <Select labelId="select3-label" defaultValue="" {...register("tratamiento")}>
              <MenuItem value="">Seleccione una opción</MenuItem>
              {tratamiento.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" variant="outlined" fullWidth sx={{ mb: 2 }}>
            Guardar
          </Button>
        </form>

        <Button onClick={closeModal} variant="outlined" fullWidth>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};
