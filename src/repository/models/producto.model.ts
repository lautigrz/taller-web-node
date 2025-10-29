export interface Producto {
    titulo: string;
    descripcion?: string;
    precio: number;
    cantidad?: number;
    genero?: string;
    equipoId: number;
    imagenes?: { url: string; orden?: number }[];
    tallas?: string[];
}