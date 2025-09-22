import { ReactNode, useEffect, useState } from "react";
import { ContextAutenticacion } from "./contextAutenticacion";
import {
  logoutSession,
  verificarAutenticacion,
} from "../../autenticacion/service/autenticacionSerive";

export const ProviderAutenticaicon = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isAutenticacion, setIsAutenticacion] = useState<boolean>(false);
  const setEstadoAutenticacion = (estado: boolean) => {
    setIsAutenticacion(estado);
  };

  useEffect(() => {
    autenticaicon();
  }, []);

  const autenticaicon = async () => {
    try {
      const response = await verificarAutenticacion();
      setIsAutenticacion(response.autenticacion);
    } catch (error) {}
  };

  const logout = async () => {
    try {
      const response = await logoutSession();
      if (response.status == 200) {
        setIsAutenticacion(false);
      }
    } catch (error) {}
  };

  return (
    <ContextAutenticacion.Provider
      value={{ autenticacion: isAutenticacion, setEstadoAutenticacion ,logout}}
    >
      {children}
    </ContextAutenticacion.Provider>
  );
};
