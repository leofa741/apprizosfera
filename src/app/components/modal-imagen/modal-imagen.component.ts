import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { FileupladService } from 'src/app/services/fileuplad.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgUrl!: string;
  public usuario!: Usuario;


  constructor(
    public modalImagenService: ModalImagenService,
     private fb: FormBuilder,
    private usuarioService: UsuariosService,  
    private fileupladService: FileupladService,          
    private router: Router ,
   
    ) {
        
       
  

     }
  ngOnInit(): void {
    this.imgUrl = this.usuario.img!;
  }

  ocultarModal() {

    this.modalImagenService.cerrarModal();

  }

  cambiarImagen(event: any) {

    console.log(event.target.files);

    const file = event.target.files[0];
    this.imagenSubir = file!;

    console.log("imagen",this.imagenSubir);


     }

      subirImagen() {
        const id = this.modalImagenService.id;
        const tipo = this.modalImagenService.tipo;

        this.fileupladService.fileUpload( this.imagenSubir, tipo, id )
            .then( img => {   
           

              setTimeout(() => {
                this.modalImagenService.nuevaImagen.emit( img );
                this.ocultarModal();
                Swal.fire('Actualizado', 'Imagen actualizada correctamente', 'success');
              this.router.navigateByUrl('/mantenimiento-usuario');
              }
              , 1000);             
              console.log(img);
            }

            );
        
      }


  

}
