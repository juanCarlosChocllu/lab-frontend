import { Route, Routes, BrowserRouter } from "react-router";
import { routerI } from "../interface/router";
import { ventaRouter } from "../../venta/router/router";
import { Sidebar } from "../components/Sidebar";
import { reporteRouter } from "../../reporte/router/reporteRouter";
import { tiempoPrometidoRouter } from "../../tiempoPrometido/routers/tiempoPrometidoRouter";
import { tiempoProduccionRouter } from "../../tiempoProduccion/router/tiempoProduccionRouter";

const rutas = (rutas: routerI[]) => {
  return rutas.map((item, i) => (
    <Route key={i} path={item.path} element={<item.component />} />
  ));
};

export const RouterIndex = () => {
  return (
    <BrowserRouter>

        <Routes>
          <Route path={"/"} element={<Sidebar/>}>
          {rutas(ventaRouter)}
          {rutas(reporteRouter)}
          {rutas(tiempoPrometidoRouter)}
          {rutas(tiempoProduccionRouter)}
          </Route>
        </Routes>
 
    </BrowserRouter>
  );
};
