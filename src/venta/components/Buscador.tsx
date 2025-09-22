import { useState, useEffect } from "react";
import Select from "react-select";
import { ListarSucursalI } from "../../sucursal/interface/sucursal";
import { listarSucursal } from "../../sucursal/service/sucursalService";
import { buscadorI } from "../interface/buscador";
import { Paper } from "@mui/material";

export const Buscador = ({
  setFilter
}: {
  setFilter: (value: buscadorI) => void
}) => {
  const date = new Date();
  const fechaFormateada = date.toISOString().slice(0, 10);

  const [sucursal, setSucursal] = useState<ListarSucursalI[]>([]);
  const [empresa, setEmpresa] = useState<string>();
  const [sucursalFiltrada, setSucursalFiltrada] = useState<ListarSucursalI[]>(
    []
  );
  const [sucursalesSeleccionadas, setSucursalesSeleccionadas] = useState<any[]>(
    []
  );
  const [fechaInicio, setFechaInicio] = useState<string>(fechaFormateada);
  const [fechaFin, setFechaFin] = useState<string>(fechaFormateada);

  useEffect(() => {
    listarSucu();
  }, []);




  const listarSucu = async () => {
    try {
      const response = await listarSucursal();
      setSucursal(response);
    } catch (error) {
      console.log(error);
    }
  };
 

  const onClick = () => {
   
    
    if(empresa){
    const sucursales: string[] = [];
     
    if (sucursalesSeleccionadas.length < 1) {
      sucursales.push(...sucursalFiltrada.map((item) => item._id));
    }
    if (sucursalesSeleccionadas.length > 0) {
      sucursales.push(...sucursalesSeleccionadas.map((item) => item.value));
    }
    if (empresa === 'TODAS') {
      sucursales.push(...sucursal.map((item) => item._id));
    }
    const filter: buscadorI = {
      fechaFin: fechaFin,
      fechaInicio: fechaInicio,
      sucursal: sucursales,
    };
    setFilter(filter);
    }
  };

 
  const onChangeEmpres = (e: any) => {
    setEmpresa(e.target.value)
    if (e.target.value !== "TODAS") {
      setSucursalFiltrada(
        sucursal.filter((item) =>
          item.nombre.startsWith(e.target.value)
        )
      );
      setSucursalesSeleccionadas([]);
    } else {
      setSucursalesSeleccionadas([]);
      setSucursalFiltrada([]);
    }
  }
  return (
    <Paper className="p-6 bg-white rounded-xl shadow-md mb-8 border border-gray-200">
      <h2 className="text-xl font-semibold mb-6 text-blue-700 flex items-center gap-2">
        🔍 Filtros de Búsqueda
      </h2>

      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="empresa"
          >
            Empresa
          </label>
          <select
            id="empresa"
            defaultValue=""
            className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2"
            onChange={(e) => onChangeEmpres(e)}
          >
            <option value="">Selecciona la empresa</option>
            <option value="TODAS">TODAS</option>
            <option value="OPTICENTRO">OPTICENTRO</option>
            <option value="ECONOPTICA">ECONOPTICA</option>
            <option value="TU OPTICA">TU OPTICA</option>
            <option value="OFEROPTICA">OFEROPTICA</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Sucursal
          </label>
          <Select
            isMulti
            options={sucursalFiltrada.map((item) => {
              return { value: item._id, label: item.nombre };
            })}
            value={sucursalesSeleccionadas}
            onChange={(selected) => setSucursalesSeleccionadas([...selected])}
            className="text-sm"
            classNamePrefix="select"
            placeholder="Selecciona sucursales"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="fechaInicio"
          >
            Fecha inicio
          </label>
          <input
            id="fechaInicio"
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1 text-gray-700"
            htmlFor="fechaFin"
          >
            Fecha fin
          </label>
          <input
            id="fechaFin"
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 px-3 py-2"
          />
        </div>

        <div className="col-span-full sm:col-span-1 mt-2">
          <button
            type="button"
            onClick={() => onClick()}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            Buscar
          </button>
        </div>
      </form>
    </Paper>
  );
};
