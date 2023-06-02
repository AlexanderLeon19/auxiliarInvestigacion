export interface Producto {
    _id?: string;
    nombre: string;
    componentes?: Componente[];
    tamanoLote: string;
    tiempoSuministro: number;
    inventarioDisponible: number;
    inventarioSeguridad: number;
    recepcionesProgramadas: number;
}


export interface Componente {
    _id?: string;
    nombre: string;
    cantidad: number;
    componentes?: Componente[];
    tamanoLote: string;
    tiempoSuministro: number;
    inventarioDisponible: number;
    inventarioSeguridad: number;
    recepcionesProgramadas: number;
}

