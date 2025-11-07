import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { ContextAutenticacion } from "../context/contextAutenticacion";
import { logDescargaVenta } from "../../logs/logsService";
import { LogsDescargaI } from "../../logs/interface/logs";
import { Notificaciones } from "./Notificaciones";

const drawerWidth = 240;

export function Sidebar() {
  const { logout } = useContext(ContextAutenticacion);
  const [open, setOpen] = useState(false);
  const [fechaDescarga, setFechaDescarga] = useState<LogsDescargaI[]>([]);
  useEffect(() => {
    (async () => {
      const response = await logDescargaVenta();

      setFechaDescarga(response);
    })();
  }, []);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  console.log(fechaDescarga);

  const menuItems = [
    { text: "Ventas", route: "/listar/venta" },
    { text: "Cargar Archivo", route: "/reporte" },
    { text: "Rangos", route: "/listar/rango" },
    { text: "Tiempo produccion", route: "/tiempo/produccion" },
    { text: "Usuarios", route: "/listar/usuarios" },
    {
      text: "Salir",
      action: () => {
        logout();
      },
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            {item.action ? (
              <ListItemButton
                onClick={() => {
                  item.action?.();
                  setOpen(false);
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ) : (
              <ListItemButton
                component={Link}
                to={item.route}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <IconButton
        onClick={handleDrawerToggle}
        sx={{ position: "fixed", top: 16, left: 6, zIndex: 1300 }}
        color="primary"
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}></span>

          <span style={{ color: "#555", fontSize: "0.95rem" }}>
            {fechaDescarga.length > 0
              ? `Actualizado hasta: ${new Date(
                  fechaDescarga[0].fechaDescarga
                ).toLocaleString()}`
              : "Cargando fecha..."}
          </span>
          <Notificaciones />
        </Toolbar>

        <Divider sx={{ mb: 2 }} />

        <Outlet />
      </Box>
    </Box>
  );
}
