

import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export class Usuario {
 

    constructor(
        //public id: number,
        public nombre: string ,
        public email: string ,
        public uid: string , 
        public rol: string ,  
        public img?: string ,
        public google?: string ,
         
      
        public password?: string, 
    ) {
      
     }


    imprimirUsuario() {
        console.log('Usuario mdel: ', this.nombre, this.email,this.uid,this.rol, this.img,this.google );
   
    }



    get imagenUrl() {

        if ( !this.img ) {
            return `${ base_url }/uploads/usuarios/no-image`;
        } else if ( this.google ) {
            return this.img;
        } else if ( this.img ) {
            return this.img;
        } else {
            return `${ base_url }/uploads/usuarios/no-image`;
        } 



    }

}

    

