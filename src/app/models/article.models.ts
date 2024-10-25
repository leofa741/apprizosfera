import { Usuario } from "./usuario.model";


interface _Likes {
    _id: number;
    usuario: string;
    likes: string;
    article: string;
    // add any other properties here
  } 

 interface _ArticleUsuario {
    _id: string;
    nombre: string;
    email: string;
    img: string;
  }


interface Comment {
  _id: string;
  content: string;
  usuario: any;
  date : string;
  // agregar cualquier otra propiedad aquí
}




export class Article{

    constructor(
        public title: string,
        public comments?: Comment[],
        public content?: string,
        public img?: string,
        public _id?: string,
        public usuario?: _ArticleUsuario, 
        public date?: string,    
        public likes?: _Likes,
       

    ) {}

}