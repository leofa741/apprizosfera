import { Component, OnInit ,AfterViewInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  ,AfterViewInit{

  @ViewChild('googleBtn')  googleBtn!: ElementRef;

  public formSubmitted = false;

  public loginForm = this.fb.group({ 
    email: [localStorage.getItem('email') || '',  [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [ localStorage.getItem('email') ? true : false ]   
  });
 

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private   ngZone :NgZone
  ) { }
  ngAfterViewInit(): void {
    this.googleInit();
  }

  ngOnInit() {
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "1024348454013-i936bdigj86lup1kb88ecevv9r8rahl6.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { 
        text: "Login with Google",
        width: 350,
         height: "auto",
          longtitle: true,
          theme: "dark",
        

     }  // customization attributes
    );

  }

  handleCredentialResponse(response:any) {
   
    // Send the token to your auth backend.
    this.usuarioService. loginGoogle(response.credential)
    .subscribe( resp => {
      // Navegar al Dashboard
      this.router.navigateByUrl('/blog');       
    }
    )

  }



  login () {
    this.formSubmitted = true;
    if ( this.loginForm.invalid ) {
      return;
    }      
    
    this.usuarioService.login(this.loginForm.value)
    .subscribe( resp => {
      const email= this.loginForm.get('email')?.value;

      if ( this.loginForm.get('remember')?.value ) {
        localStorage.setItem('email', email? email : '');
      } else {
        localStorage.removeItem('email');
      }

      // Navegar al Dashboard
      this.ngZone.run(() => {  

        //cargando

        

      this.router.navigateByUrl('/blog');  
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
