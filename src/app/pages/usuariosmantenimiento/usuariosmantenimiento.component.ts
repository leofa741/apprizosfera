import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuariosmantenimiento',
  templateUrl: './usuariosmantenimiento.component.html',
  styleUrls: ['./usuariosmantenimiento.component.css']
})
export class UsuariosmantenimientoComponent  implements OnInit {

  public usuarioss: Usuario[] = [] ;
  public totalUsuarios: number = 0;
  public desde: number = 0;
  public cargando: boolean = true;


  public usuario!: string;

  public usuariomodel!: Usuario;


  constructor(
    private usuarioService: UsuariosService,
    private busquedasService: BusquedasService,
    public modalImagenService: ModalImagenService
  ) {  }

  ngOnInit() {
    this.isLoggedIn ()
    this.cargarUsuarios();
    this.modalImagenService.nuevaImagen.subscribe( img => this.cargarUsuarios() ); 
   
   
  }

  abrirModal(usuario: Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img!);
    console.log(usuario);
   // this.modalImagenService.setImg(imagenUrl); 
  }

 

  logout() {
    this.usuarioService.logout();
  }

  buscar( termino: string ) {
    console.log(termino);
    if ( termino.length === 0 ) {
      return this.cargarUsuarios();
    }
    this.busquedasService.buscar( termino )
        .subscribe( resp => {

          this.totalUsuarios = resp.usuarios.length;
          this.usuarioss = resp.usuarios;
          this.cargando = false;
          this.usuario = this.usuarioService.usuario?.imagenUrl


         console.log(resp.usuarios);
        }
        );
  }
  

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({total,usuarios})=> {     
      this.totalUsuarios = total;
      this.usuarioss = usuarios;
      console.log(usuarios);
      
      setTimeout(() => {
        this.cargando = false;
      }, 2000);     
      
    }
    )

  }
   

  isLoggedIn () {
    const token = localStorage.getItem('token') || '';
    if (token.length !== 0) {
   
      this.usuario = this.usuarioService.usuario?.nombre
      this.usuariomodel = this.usuarioService.usuario!;   
          return true
    }    
    return false;
  }  

  cambiarDesde( valor: number ) {      
      const desde = this.desde + valor;     
      if ( desde >= this.totalUsuarios ) {
        return;
      }  
      if ( desde < 0 ) {
        return;
      }  
      this.desde += valor;
      this.cargarUsuarios();
    }

    borrarUsuario( usuario: Usuario ) {
      if (  usuario.uid === this.usuariomodel.uid ) {

        Swal.fire('Error', 'No puede borrarse a si mismo', 'error');
        return ;
      }
  
      Swal.fire({
        title: '¿Borrar usuario?',
        text: 'Esta a punto de borrar a ' + usuario.nombre,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
  
        if (result.value) {
          this.usuarioService.borrarUsuario( usuario )
              .subscribe( resp => {
                this.cargarUsuarios();
                Swal.fire(
                  'Borrado!',
                  'Usuario borrado correctamente',
                  'success'
                );
              });
        }
  
      });
  
    } 

    cambiarRol(  usuario: Usuario ) {
      if (  usuario.uid === this.usuariomodel.uid ) {

        Swal.fire('Error', 'No puede cambiarse el rol a si mismo', 'error');
        return ;
      }

      console.log(usuario);
       this.usuarioService.actualizarRol( usuario )

          .subscribe(
            resp => {
              Swal.fire('Rol actualizado', usuario.nombre, 'success');

              console.log(resp);
            }
          )

    }

    
    

  

}
