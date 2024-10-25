import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { FileupladService } from 'src/app/services/fileuplad.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { ImagenPipe } from '../../pipes/imagen.pipe';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public imagenSubir!: File;
  public imgUrl!: string;
  public usuario!: Usuario;
  public imagenTemp: string = '';

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
    const file = event.target.files[0];

    if (!file) {
      return;
    }
    if (file.type.indexOf('image') < 0) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }

    this.imagenSubir = file;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgUrl = reader.result as string;
    }

    
  

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
              }
              , 1000);             
              console.log(img);
            }
            );        
      }


  

}
