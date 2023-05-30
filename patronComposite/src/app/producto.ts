export interface Producto {
    _id?: string;
    nombre: string;
    componentes?: Componente[];
}

export interface Componente {
    _id?: string;
    nombre: string;
    cantidad: number;
    componentes?: Componente[];  // Un componente puede contener otros componentes
}

