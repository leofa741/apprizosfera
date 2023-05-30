export class Usuario {

    constructor(
        public id: number,
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public uid?: string
    ) { }


    imprimirUsuario() {
        console.log('Usuario: ', this.nombre);
    }
    

}