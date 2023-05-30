import { environment } from "src/environments/environment";

const base_url = environment.base_url;

export class Usuario {

    constructor(
        //public id: number,
        public nombre: string,
        public email: string,     
        public img?: string ,
        public google?: boolean,
        public role?: string,       
        public uid?: string,
        public password?: string,
    ) {
      
     }


    imprimirUsuario() {
        console.log('Usuario mdel: ', this.nombre, this.email, this.img,this.google,this.role, );
   
    }



    get imagenUrl() {

        if ( !this.img ) {
            return `${ base_url }/uploads/usuarios/no-image`;
        } else if ( this.google ) {
            return this.img;
        } else if ( this.img ) {
            return `${ base_url }/uploads/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/uploads/usuarios/no-image`;
        }



    }

}

    

