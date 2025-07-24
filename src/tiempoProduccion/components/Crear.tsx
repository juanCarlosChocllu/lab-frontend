import { Alert, Button } from "@mui/material";
import { modalAccion } from "../../core/hook/modalAccion";
import { TiempoCombinacionModal } from "../../tiempoCombinacion/modal/TiempoCombinacionModal";
import {  useEffect, useState } from "react";
import { listaCombinacionTiempo } from "../../tiempoCombinacion/service/tiempoCombinacionService";
import { CombinacionTimepoI } from "../../tiempoCombinacion/interface/tiempoCombinacion";
import { listarSucursal } from "../../sucursal/service/sucursalService";
import { ListarSucursalI } from "../../sucursal/interface/sucursal";
import { useForm } from "react-hook-form";
import {
  RegistarTiempoProduccionI,
} from "../interface/tiempoProduccion";
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
    formState: { errors }
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
  },[]);

  const onSubmit = async (data: RegistarTiempoProduccionI) => {
    try {
      const response = await registrarTiempoProduccion(data);
      if(response.status === 201){
        toast.success('Registrado')
      } 
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col mt-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Registrar Tiempos de Producción
      </h2>

      <Button
        onClick={openModal}
        className="mb-10 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded shadow transition"
      >
        Registrar Combinación
      </Button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl bg-white p-10 rounded-2xl shadow-2xl border border-gray-100"
      >
        {/* Ejemplo de campo con diseño limpio */}
        <div>
          <label className="label">Recepción </label>
          <input
            {...register("recepcion", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            type="number"
            className="input"
            step="any"
          />
          {errors.recepcion && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="label">Almacén </label>
          <input
            {...register("almacen", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            type="number"
            className="input"
            step="any"
          />
          {errors.almacen && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="label">Digital </label>
          <input
            {...register("digital", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            type="number"
            className="input"
            step="any"
          />
          {errors.digital && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="label">Bisel </label>
          <input
            {...register("bisel", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            type="number"
            className="input"
            step="any"
          />
          {errors.bisel && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="label">Tinte </label>
          <input
            {...register("tinte", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            type="number"
            className="input"
            step="any"
          />
          {errors.tinte && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="label">Cálculo </label>
          <input
            {...register("calculo", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            type="number"
            className="input"
            step="any"
          />
          {errors.calculo && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="label">Antirreflejo </label>
          <input
            {...register("antireflejo", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            type="number"
            className="input"
            step="any"
          />
          {errors.antireflejo && (
            <Alert severity="error">Ingresa el valor</Alert>
          )}
        </div>

        <div>
          <label className="label">Despacho </label>
          <input
            {...register("despacho", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            type="number"
            className="input"
            step="any"
          />
          {errors.despacho && <Alert severity="error">Ingresa el valor</Alert>}
        </div>

        <div>
          <label className="label">Control de Calidad </label>
          <input
            {...register("controlCalidad", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            type="number"
            className="input"
            step="any"
          />
          {errors.controlCalidad && (
            <Alert severity="error">Ingresa el valor</Alert>
          )}
        </div>

        <div>
          <label className="label">Tiempo Logística Entrega </label>
          <input
            {...register("tiempoLogisticaEntrega", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            type="number"
            className="input"
            step="any"
          />
          {errors.tiempoLogisticaEntrega && (
            <Alert severity="error">Ingresa el valor</Alert>
          )}
        </div>

        <div>
          <label className="label">Tiempo de transporte </label>
          <input
            {...register("tiempoTransporte", {
              valueAsNumber: true,
              min: 0,
              required: true,
            })}
            type="number"
            className="input"
            step="any"
          />
          {errors.tiempoTransporte && (
            <Alert severity="error">Ingresa el valor</Alert>
          )}
        </div>

        {/* Selects bonitos */}
        <div>
          <label className="label">Origen </label>
          <select {...register("tipo", { required: true })} className="input">
            <option value="">Selecciona</option>
            <option value="STOCK">STOCK</option>
            <option value="LABORATORIO">LABORATORIO</option>
          </select>
          {errors.tipo && <Alert severity="error">Seleccione un valor</Alert>}
        </div>

        <div>
          <label className="label">Antirreflejo </label>
          <select
            {...register("estadoAntireflejo", { required: true })}
            className="input"
          >
            <option value="">Selecciona</option>
            <option value="CON ANTIREFLEJO">CON ANTIREFLEJO</option>
            <option value="SIN ANTIREFLEJO">SIN ANTIREFLEJO</option>
          </select>
          {errors.estadoAntireflejo && (
            <Alert severity="error">Seleccione un valor</Alert>
          )}
        </div>

        <div>
          <label className="label">Tipo de Lente </label>
          <select
            {...register("estadoLente", { required: true })}
            className="input"
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
          <label className="label">Biselado </label>
          <select
            {...register("estadoProeceso", { required: true })}
            className="input"
          >
            <option value="">Selecciona</option>
            <option value="CON BISELADO">CON BISELADO</option>
            <option value="SIN BISELADO">SIN BISELADO</option>
          </select>
          {errors.estadoProeceso && (
            <Alert severity="error">Seleccione un valor</Alert>
          )}
        </div>

        <div>
          <label className="label">Combinación </label>
          <select
            {...register("combinacionTiempo", { required: true })}
            className="input"
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
          <label className="label">Empresa </label>
          <select onClick={(e)=>{
            const target = e.target as HTMLSelectElement
             const sucursal= Sucursal.filter((item)=> item.nombre.startsWith(target.value))
              setSucursalFltrada(sucursal)  
            
             
            
            
          }} 
          className="input">
            <option value="">Selecciona la empresa</option>
            <option value="OPTICENTRO">OPTICENTRO</option>
            <option value="ECONOPTICA">ECONOPTICA</option>
            <option value="TU OPTICA">TU OPTICA</option>
            <option value="OFEROPTICA">OFEROPTICA</option>
          </select>
         
        </div>

        <div>
          <label className="label">Sucursal </label>
          <select
            {...register("sucursal", { required: true })}
            className="input"
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

        {/* Botón final */}
        <div className="md:col-span-2 flex justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition font-bold shadow"
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
