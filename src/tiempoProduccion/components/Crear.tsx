import { Alert, Button } from "@mui/material";
import { modalAccion } from "../../core/hook/modalAccion";
import { TiempoCombinacionModal } from "../../tiempoCombinacion/modal/TiempoCombinacionModal";
import { useEffect, useState } from "react";
import { listaCombinacionTiempo } from "../../tiempoCombinacion/service/tiempoCombinacionService";
import { CombinacionTimepoI } from "../../tiempoCombinacion/interface/tiempoCombinacion";
import { listarSucursal } from "../../sucursal/service/sucursalService";
import { ListarSucursalI } from "../../sucursal/interface/sucursal";
import { useForm } from "react-hook-form";
import { RegistarTiempoProduccionI } from "../interface/tiempoProduccion";
import { registrarTiempoProduccion } from "../service/tiempoProduccionService";
import { toast } from "react-toastify";

export const Crear = () => {
  const [Combiancion, setCombiancion] = useState<CombinacionTimepoI[]>([]);
  const [Sucursal, setSucursal] = useState<ListarSucursalI[]>([]);

  const [sucursalFltrada, setSucursalFltrada] = useState<ListarSucursalI[]>([]);

  const { closeModal, isOpen, openModal } = modalAccion();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistarTiempoProduccionI>();
  useEffect(() => {
    (async () => {
      try {
        const [combinacion, sucursal] = await Promise.all([
          listaCombinacionTiempo(),
          listarSucursal(),
        ]);
        setSucursal(sucursal);
        setCombiancion(combinacion);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const onSubmit = async (data: RegistarTiempoProduccionI) => {
    try {
      if (data.antireflejo > 0) {
        data.estadoAntireflejo = "CON ANTIREFLEJO";
      } else {
        data.estadoAntireflejo = "SIN ANTIREFLEJO";
      }

      if (data.bisel > 0) {
        data.estadoProeceso = "CON BISELADO";
      } else {
        data.estadoProeceso = "SIN BISELADO";
      }
      
      if (data.estadoLente == 'TERMINADO') {
        data.tipo = "STOCK";
      } else {
        data.tipo = "LABORATORIO";
      }

   
     

      const response = await registrarTiempoProduccion(data);
      if (response.status === 201) {
        toast.success("Registrado");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col mt-10 px-4 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-8 text-center drop-shadow-sm tracking-tight">
        Registrar Tiempos de Producción
      </h2>

      <Button
        onClick={openModal}
        className="mb-10 !bg-green-600 hover:!bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
      >
        + Registrar Combinación
      </Button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl bg-white p-10 rounded-2xl shadow-2xl border border-gray-200"
      >
        {/* Ejemplo de campo con diseño limpio */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Recepción
          </label>
          <input
            {...register("recepcion", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.recepcion && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Almacén
          </label>
          <input
            {...register("almacen", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.almacen && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Espera de montura
          </label>
          <input
            {...register("esperaMontura", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.esperaMontura && (
            <Alert severity="error">Ingresa el valor</Alert>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Digital
          </label>
          <input
            {...register("digital", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.digital && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Bisel
          </label>
          <input
            {...register("bisel", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.bisel && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Tinte
          </label>
          <input
            {...register("tinte", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.tinte && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Cálculo
          </label>
          <input
            {...register("calculo", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.calculo && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Antirreflejo
          </label>
          <input
            {...register("antireflejo", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.antireflejo && (
            <Alert severity="error">Ingresa el valor</Alert>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Despacho
          </label>
          <input
            {...register("despacho", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.despacho && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Control de Calidad
          </label>
          <input
            {...register("controlCalidad", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.controlCalidad && (
            <Alert severity="error">Ingresa el valor</Alert>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Tiempo Logística Entrega
          </label>
          <input
            {...register("tiempoLogisticaEntrega", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.tiempoLogisticaEntrega && (
            <Alert severity="error">Ingresa el valor</Alert>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Tiempo de transporte
          </label>
          <input
            {...register("tiempoTransporte", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            defaultValue={0}
            type="number"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md p-2 shadow-sm transition-all"
            step="any"
          />
          {errors.tiempoTransporte && (
            <Alert severity="error">Ingresa el valor</Alert>
          )}
        </div>

       

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Tipo de Lente
          </label>
          <select
            {...register("estadoLente", { required: true })}
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
          >
            <option value="">Selecciona</option>
            <option value="TERMINADO">TERMINADO</option>
            <option value="SEMI TERMINADO">SEMI TERMINADO</option>
          </select>
          {errors.estadoLente && (
            <Alert severity="error">Seleccione un valor</Alert>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Combinación
          </label>
          <select
            {...register("combinacionTiempo", { required: true })}
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
          >
            <option value="">Selecciona la Combinación</option>
            {Combiancion.map((item) => (
              <option key={item._id} value={item._id}>
                {item.tipoLente} {item.tipoColor} {item.tratamiento}
              </option>
            ))}
          </select>
          {errors.combinacionTiempo && (
            <Alert severity="error">Seleccione un valor</Alert>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Empresa
          </label>
          <select
            onClick={(e) => {
              const target = e.target as HTMLSelectElement;
              const sucursal = Sucursal.filter((item) =>
                item.nombre.startsWith(target.value)
              );
              setSucursalFltrada(sucursal);
            }}
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
          >
            <option value="">Selecciona la empresa</option>
            <option value="OPTICENTRO">OPTICENTRO</option>
            <option value="ECONOPTICA">ECONOPTICA</option>
            <option value="TU OPTICA">TU OPTICA</option>
            <option value="OFEROPTICA">OFEROPTICA</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Sucursal
          </label>
          <select
            {...register("sucursal", { required: true })}
            className="w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all"
          >
            <option value="">Selecciona la Sucursal</option>
            {sucursalFltrada.map((item) => (
              <option key={item._id} value={item._id}>
                {item.nombre}
              </option>
            ))}
          </select>
          {errors.sucursal && (
            <Alert severity="error">Seleccione un valor</Alert>
          )}
        </div>

        <div className="md:col-span-2 lg:col-span-3 flex justify-center mt-10">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-bold shadow-lg transition-all duration-300"
          >
            Guardar
          </button>
        </div>
      </form>

      {isOpen && (
        <TiempoCombinacionModal
          closeModal={closeModal}
          isOpen={isOpen}
          openModal={openModal}
        />
      )}
    </div>
  );
};
