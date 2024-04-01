import { Categoria } from "./categoria.model";


interface _ProductoUsuario {
    _id: string;
    nombre: string;
    img: string;

}
  

export class Producto {
    constructor(
        public   nombre: string,
        public   descripcion?: string,
        public   img?: string,
        public  _id?: string,
        public   usuario?: _ProductoUsuario,
        public   categoria?: Categoria,
        public   precio?: number,
        public   disponible?: boolean,
        public   linkdepago?: string,

    ) { }

}