import { useContext, useEffect, useState } from "react";
import { socket } from "../config/socket";
import { ContextAutenticacion } from "../context/contextAutenticacion";

export const Notificaciones = () => {
  const { autenticacion } = useContext(ContextAutenticacion);
  const [mensaje, setMensaje] = useState<string | null>(null);

  useEffect(() => {
    if (autenticacion) {
      socket.connect();

      socket.on("notificaciones", (msg: string) => {
        setMensaje(msg);
        setTimeout(() => setMensaje(null), 30000);
      });

      return () => {
        socket.off("notificaciones");
        socket.disconnect();
      };
    }
  }, []);

  if (!mensaje) return null;

  return (
    <>
      <style>
        {`
          @keyframes slide-down {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            10% {
              opacity: 1;
              transform: translateY(0);
            }
            90% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(-20px);
            }
          }

          .animate-slide-down {
            animation: slide-down 30s ease-in-out forwards;
          }
        `}
      </style>

      <div className="fixed top-6 right-6 z-50">
        <div className="bg-slate-800 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-down w-80 border border-slate-700">
          <span className="text-yellow-400 text-2xl">🔔</span>
          <p className="text-sm">{mensaje}</p>
        </div>
      </div>
    </>
  );
};
