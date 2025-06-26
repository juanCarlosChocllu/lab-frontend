export const CrearTiempoPrometido = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-2xl p-6">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ingrese el código
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ej. 1490_VS_BLA_CLA_STK_TAC_SIC"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ingrese el tiempo prometido
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ej. 3 días"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Guardar
        </button>
      </form>
    </div>
  );
};
