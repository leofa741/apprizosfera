import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { FileupladService } from 'src/app/services/fileuplad.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})



export class PerfilComponent  implements OnInit {

  public formSubmitted = false;
  public usuario!: string;
  public imagenSubir!: File;
  public imgUrl!: string;
  public usuariogoogle = this.usuarioService.usuario.google;
  public usuariomodel!: Usuario;

  public registerForm = this.fb.group({
    nombre: ['', Validators.required ],
    email: ['', [ Validators.required, Validators.email ] ],    
    telefono: ['', Validators.required ],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });
  

  constructor( private fb: FormBuilder,
               private usuarioService: UsuariosService,  
               private fileupladService: FileupladService,          
               private router: Router ) { }

  ngOnInit(){

    this.usuario = this.usuarioService.usuario.nombre;
    this.imgUrl = this.usuarioService.usuario.imagenUrl;
    this.usuariomodel = this.usuarioService.usuario!; 
    console.log("igoo",this.usuarioService.usuario.google);

    this.usuariogoogle   

  }

 

  actualizarPerfil() {      

    if ( this.registerForm.invalid ) {
      Swal.fire('Error', 'Debe completar los campos correctamente', 'error');      
      return 
    }
    
    this.usuarioService.actualizarPerfil( this.registerForm.value )
        .subscribe( resp => {
            console.log(resp);
            // Navegar al Dashboard
            this.router.navigateByUrl('/perfil-usuario');  
            setTimeout(() => {
              Swal.fire('Actualizado', 'Usuario actualizado correctamente', 'success');
            }
            , 1000);

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
          });            
    }


   cambiarImagen(event: any) {

    console.log(event.target.files);

    const file = event.target.files[0];
    this.imagenSubir = file!;

    console.log("imagen",this.imagenSubir);


     }

      subirImagen() {

        this.fileupladService.fileUpload( this.imagenSubir, 'usuarios', this.usuarioService.usuario.uid )
            .then( img => {   
              this.imgUrl = img;

              setTimeout(() => {
                Swal.fire('Actualizado', 'Imagen actualizada correctamente', 'success');
              this.router.navigateByUrl('/perfil-usuario');
              }
              , 1000);             
              console.log(img);
            }

            );
        
      }

 
  


  camposNoValidos( campo: string ): boolean {
    
    if ( this.registerForm.get(campo)?.invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }


 
  passwordsIguales(pass1Name: string, pass2Name: string ) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true })
      }
    }
  }




}



