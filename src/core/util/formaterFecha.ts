

export function formatearFecha(fecha: string) {
    const nuevaFecha = fecha.split('T')
    const horaMinitos = nuevaFecha[1].split('.')    
    return  `${nuevaFecha[0]} ${horaMinitos[0]}`
}