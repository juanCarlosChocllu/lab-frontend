import { Box, Button, Typography, Paper, Fade } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useForm } from "react-hook-form";
import { AutenticacionI } from "../interface/autenticacion";
import { autenticacion } from "../service/autenticacionSerive";
import { useContext } from "react";
import { ContextAutenticacion } from "../../core/context/contextAutenticacion";

export const Autenticacion = () => {
  const { register, handleSubmit } = useForm<AutenticacionI>();
  const {setEstadoAutenticacion}= useContext(ContextAutenticacion)
  const onSubmit =async (data: AutenticacionI) => {
    try {
      const response  =  await  autenticacion(data)
      if(response.status==200 ){
        setEstadoAutenticacion(true)
        window.location.href= '/listar/venta'
      }
      
    } catch (error) {
      console.log(error);
      
    }
   
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e3f2fd 30%, #bbdefb 90%)",
        padding: 2,
      }}
    >
      <Fade in timeout={1000}>
        <Paper
          elevation={8}
          sx={{
            padding: 5,
            maxWidth: 420,
            width: "100%",
            borderRadius: 5,
            boxShadow:
              "0 12px 30px rgba(101, 123, 255, 0.25), 0 4px 6px rgba(101, 123, 255, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
              color: "#5c6bc0",
              animation: "pulse 3s infinite",
            }}
          >
            <AccessTimeIcon sx={{ fontSize: 60 }} />
          </Box>

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            fontWeight="700"
            color="#3949ab"
            sx={{ letterSpacing: 1.2, mb: 0.5 }}
          >
            Sistema de Tiempos
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            gutterBottom
            color="#5c6bc0"
            sx={{ mb: 4, opacity: 0.8 }}
          >
            Laboratorio - Iniciar Sesión
          </Typography>

          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                border: "1.5px solid #7986cb",
                borderRadius: 3,
                px: 1,
              }}
            >
              <PersonOutlineIcon sx={{ color: "#7986cb", mr: 1 }} />
              <input
                id="username"
                {...register("username")}
                type="text"
                required
                autoFocus
                placeholder="Usuario"
                style={{
                  border: "none",
                  outline: "none",
                  flexGrow: 1,
                  fontSize: "1rem",
                  padding: "10px 8px",
                  backgroundColor: "transparent",
                  color: "#3949ab",
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                border: "1.5px solid #7986cb",
                borderRadius: 3,
                px: 1,
              }}
            >
              <LockOutlinedIcon sx={{ color: "#7986cb", mr: 1 }} />
              <input
                id="password"
                {...register("password")}
                type="password"
                required
                placeholder="Contraseña"
                style={{
                  border: "none",
                  outline: "none",
                  flexGrow: 1,
                  fontSize: "1rem",
                  padding: "10px 8px",
                  backgroundColor: "transparent",
                  color: "#3949ab",
                }}
              />
            </Box>

            <Button
              type="submit" // Este botón envía el formulario
              variant="contained"
              fullWidth
              sx={{
                mt: 4,
                py: 1.8,
                fontWeight: "700",
                fontSize: "1.15rem",
                borderRadius: 3,
                background: "linear-gradient(90deg, #7986cb 0%, #5c6bc0 100%)",
                boxShadow: "0 6px 20px rgba(92, 107, 192, 0.45)",
                transition: "all 0.35s ease",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #5c6bc0 0%, #3949ab 100%)",
                  boxShadow: "0 8px 30px rgba(57, 73, 171, 0.65)",
                },
              }}
            >
              Entrar
            </Button>
          </form>
        </Paper>
      </Fade>

      <style>{`
        @keyframes pulse {
          0% {opacity: 1;}
          50% {opacity: 0.6;}
          100% {opacity: 1;}
        }
      `}</style>
    </Box>
  );
};
