import { useState } from "react";
export function paginador () {
    const [limite, setLimite] = useState<number>(20)
    const [pagina, setPagina] = useState<number>(1)
    const [paginas, setPaginas] = useState<number>(1)
    return {limite, setLimite , pagina, paginas, setPagina , setPaginas}
    
}