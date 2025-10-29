export interface CreateProductDto {
  titulo: string;
  descripcion?: string;
  precio: number;
  cantidad?: number;
  genero?: string;
  liga: number;
  equipoId: number;
  color?: string;
  tallasDisponibles?: string[];
}
