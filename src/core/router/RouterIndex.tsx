import { Route, Routes, BrowserRouter } from "react-router";
import { routerI } from "../interface/router";
import { ventaRouter } from "../../venta/router/router";
import { Sidebar } from "../components/Sidebar";
import { reporteRouter } from "../../reporte/router/reporteRouter";
import { tiempoPrometidoRouter } from "../../tiempoPrometido/routers/tiempoPrometidoRouter";
import { tiempoProduccionRouter } from "../../tiempoProduccion/router/tiempoProduccionRouter";
import { AutenticacionPage } from "../../autenticacion/page/AutenticacionPage";
import { useContext } from "react";
import { ContextAutenticacion } from "../context/contextAutenticacion";
import { usuarioRouter } from "../../usuarios/router/usuarioRouter";
import { rangoRouter } from "../../rango/router/rangoRouter";

const rutas = (rutas: routerI[]) => {
  return rutas.map((item, i) => (
    <Route key={i} path={item.path} element={<item.component />} />
  ));
};

export const RouterIndex = () => {
  const { autenticacion } = useContext(ContextAutenticacion);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/"}
          element={autenticacion ? <Sidebar /> : <AutenticacionPage />}
        >
          {rutas(ventaRouter)}
          {rutas(reporteRouter)}
          {rutas(tiempoPrometidoRouter)}
          {rutas(tiempoProduccionRouter)}
          {rutas(usuarioRouter)}
          {rutas(rangoRouter)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
