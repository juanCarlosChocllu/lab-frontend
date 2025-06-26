import { useForm } from "react-hook-form"
import { formArchivo } from "../interface/formArchivo"
import { cargarArchivo } from "../service/reporteService"

export const CargarExcel = () => {
    const {register, handleSubmit}=useForm<formArchivo>()
    const onSubmit= async(data:formArchivo)=>{
        try {
        
            
            const response = await cargarArchivo(data.file[0])
            console.log(response);
            
        } catch (error) {
            console.log(error);
            
        }
            
    }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
    <h1 className="text-2xl font-bold mb-6 text-gray-800">Cargar Excel</h1>
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="excelFile" className="block text-sm font-medium text-gray-700 mb-2">Seleccione un archivo</label>
        <input 
        {...register('file')}
          type="file" 
          id="excelFile" 
          accept=".xlsx"
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0
                 file:text-sm file:font-semibold
                 file:bg-blue-100 file:text-blue-700
                 hover:file:bg-blue-200"
        />
      </div>
      <button className="bg-green-600 p-2 rounded-2xl text-white">Cargar</button>
    </form>
  </div>
  
  )
}
