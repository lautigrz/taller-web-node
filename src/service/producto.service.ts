
import type { CreateProductDto } from "../dto/producto.dto.js";
import { Genero } from "../enums/Genero.js";
import type { LigaRepository } from "../repository/liga.repository.js";
import type { ProductoRepository } from "../repository/producto.repository.js";
import fs from 'fs';
import path from 'path';

export class ProductoService {

    constructor(private productoRepository: ProductoRepository, private ligaRepository: LigaRepository) { }

    async obtenerProductos(page = 1, limit = 12, filter :any) {
        return await this.productoRepository.findAllProductos(page,limit, filter);
    }

    async obtenerProductoPorId(id: number) {
        return await this.productoRepository.findProductoById(id);
    }

    async crearProducto(producto: CreateProductDto, files: Express.Multer.File[]) {
        console.log("entro")
        const equipoLiga = await this.ligaRepository.findEquipoForLiga(Number(producto.liga));

        if (!equipoLiga) {
            throw new Error('Liga no encontrada');
        }

        const equipo = equipoLiga.equipos.find(e => e.id === Number(producto.equipoId));

        if (!equipo) {
            throw new Error('Equipo no encontrado en la liga');
        }

        const urls = (await this.saveImage(equipo.name, equipoLiga.name, files)) || [];

        return await this.productoRepository.createProducto(producto, urls);


    }


    async actualizarProducto(id: number, data: {
        nombre?: string;
        descripcion?: string;
        precio?: number;
        stock?: number;
        imagenUrl?: string;
        genero?: Genero;
        liga?: string;
    }) {
        return await this.productoRepository.updateProducto(id, data);
    }

    async cambiarEstadoProducto(id: number, estado: boolean) {

        try {
            const producto = await this.obtenerProductoPorId(id);
            if (!producto) {
                throw new Error("Producto no existente");
            }
            return await this.productoRepository.cambiarEstadoProducto(id, !producto.habilitado);
        } catch (error: any) {

            throw new Error("Producto no existente");

        }

    }

    async findAllProductosDisabled(){
        return await this.productoRepository.findAllProductosDisabled();
    }

    private sanitizeName(name: string): string {
        return name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '')
            .toLowerCase();
    }

    private async saveImage(equipo: string, liga: string, files: Express.Multer.File[]) {
        const ligaFolder = this.sanitizeName(liga);
        const equipoFolder = this.sanitizeName(equipo);

        const uploadPath = path.join(process.cwd(), 'public/images', ligaFolder, equipoFolder);

        await fs.promises.mkdir(uploadPath, { recursive: true });

        const savedFiles: string[] = [];

        for (const file of files) {
            const timestamp = Date.now();
            const ext = path.extname(file.originalname);

            const newName = `${equipoFolder}-${timestamp}${ext}`;

            const destPath = path.join(uploadPath, newName);

            await fs.promises.rename(file.path, destPath);

            const relativePath =
                '/' + path.relative(path.join(process.cwd(), 'public'), destPath).replace(/\\/g, '/');

            savedFiles.push(relativePath);
            console.log("archivo", relativePath)
            console.log('Archivo guardado en:', destPath);

        }
        return await savedFiles;
    }


}