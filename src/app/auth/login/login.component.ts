import { Component, OnInit ,AfterViewInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

declare function customInit(): any;
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit  ,AfterViewInit{

  public formSubmitted = false;

  public loginForm = this.fb.group({ 
    email: [localStorage.getItem('email') || '',  [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [true]
  });
 

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private   ngZone :NgZone
  ) { }

  
  ngAfterViewInit() {

  }

  ngOnInit() {
    customInit();
    this.googleInit();
  }


  googleInit() {

    google.accounts.id.initialize({
      client_id: "1024348454013-i936bdigj86lup1kb88ecevv9r8rahl6.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {   
        theme: "outline",
      }    
    );
  }

  handleCredentialResponse(response:any) {
    this.usuarioService.loginGoogle(response.credential)    
    .subscribe( resp => {           
      this.router.navigateByUrl('/admin');         
    } 
    )
  }


  login() {
    this.formSubmitted = true;
    if ( this.loginForm.invalid ) {
      return;
    }

    this.usuarioService.login(this.loginForm.value) 
          .subscribe( resp => {
            const email= this.loginForm.get('email')?.value;
            this.ngZone.run(() => {
            if ( this.loginForm.get('remember')?.value === true ) {
              localStorage.setItem('email', email? email : '');
            } else {
              localStorage.removeItem('email');
            }
            this.router.navigateByUrl('/admin');
          })
          }, (err) => {
            // Si sucede un error
                Swal.fire('Error', err.error.msg, 'error' );
          }
        )
  }
  




  
    camposNoValidos( campo: string ): boolean {    
      if ( this.loginForm.get(campo)?.invalid && this.formSubmitted ) {
        return true;
      } else {
        return false;
      }  
    }

  

}