
interface _CategoriaUsuario {
    _id: string;
    nombre: string;   
    img: string;
  
}


export class  Categoria {

    constructor(
        public nombre: string,
        public descripcion?: string,
        public img?: string,
        public _id?: string,
        public usuario?: _CategoriaUsuario, 
    ) {}

}