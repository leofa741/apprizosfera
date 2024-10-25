import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';

import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';
import { perfilForm } from '../interfaces/update-form.interfaces';

const base_url =  environment.base_url;

declare const gapi:any;
declare const google: any;

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
 

  public auth2: any;
  public usuario!: Usuario; 

  constructor( private http: HttpClient, 
                private router: Router,
                private ngZone: NgZone ) {

    this.googleInit();
  }


  googleInit() {    
    return new Promise<void>( resolve => {
       gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1024348454013-i936bdigj86lup1kb88ecevv9r8rahl6.apps.googleusercontent.com', 
          cookiepolicy: 'single_host_origin',
          
        });

        resolve();
      });
    })
  }

  logout() {
    localStorage.removeItem('token');
    //localStorage.removeItem('email');
  

    //    google.accounts.id.revoke( localStorage.removeItem('email'), () => {
    //    console.log('revoke');
      
    //    this.router.navigateByUrl('/login');
    //  });

    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      console.log('User signed out.');
      this.ngZone.run(() => {
      this.router.navigateByUrl('/login');
      }
      )
    });


    // this.auth2.signOut().then(() => {
    //     this.ngZone.run(() => {   
    //     this.router.navigateByUrl('/login');

    //   })
    // });

  }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {      
       const {nombre, email,  uid,  rol,img, google } = resp.usuario;
       this.usuario = new Usuario( nombre, email,  uid, rol , img, google);  
       this.usuario.imprimirUsuario();
        localStorage.setItem('token', resp.token );
       
      }),
      map( resp => true ),
      catchError( error => of(false) )
    );

  }


 

  crearUsuario( formData: RegisterForm ) {
    
    return this.http.post(`${ base_url }/usuarios`, formData )
              .pipe(
                tap( (resp: any) => {
                  localStorage.setItem('token', resp.token )
                })
              )
  } 


  actualizarPerfil( data: {nombre: string, email: string,telefono:string, rol: string} ) {
    data = {
      ...data,
      rol: this.usuario.rol
    }
    return this.http.put(`${ base_url }/usuarios/${ this.usuario.uid }`, data, {  
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    }); 
  }    

  login( formData: LoginForm | any) {    
    return this.http.post(`${ base_url }/login`, formData )
                .pipe(
                  tap( (resp: any) => {
                   
                    const { email, google, nombre, role, img = '', uid } = resp.usuario; 
                    //localStorage.setItem('email', email );
                     localStorage.setItem('token', resp.token )                 

                  })
                );
  }

  loginGoogle( token: string ) {
    
          return this.http.post(`${ base_url }/login/google`, { token } )
                .pipe(
                  tap( (resp: any) => {                  
                     console.log(resp); 
                    const {email, google, name, role, picture  = '', uid } = resp;
                    // console.log(aud,email, google, name, role, picture, uid); 
                     localStorage.setItem('token', resp.token )
                     localStorage.setItem('email', email );
                  })
                );

    }  

  // get token(): string {
  //   return localStorage.getItem('token') || '';  
  // }

  cargarUsuarios( desde: number = 0 ) {
    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<{total: number, usuarios: Usuario[]}>( url, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    } 
    )
    .pipe(
      map( resp => {
        const usuarios = resp.usuarios.map(
          user => new Usuario( user.nombre, user.email, user.uid, user.rol, user.img, user.google )
        );
        return {
          total: resp.total,
          usuarios
        };
      })
    );
  }

  getUsuario( id: any ) {
    const url = `${ base_url }/usuarios/${ id }`;
    return this.http.get( url, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }
    } 
    )
    .pipe(
      map( (resp: any) => {
        const { nombre, email, uid, rol, img, google } = resp.usuario;
        return new Usuario( nombre, email, uid, rol, img, google );
      })
    );
  }
 
  
  
  borrarUsuario( usuario: Usuario ) {      
      const url = `${ base_url }/usuarios/${ usuario.uid }`;  
      return this.http.delete( url, {
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }
      } );
  
    }

  actualizarRol( usuario: Usuario ) {        
        return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, {
          headers: {
            'x-token': localStorage.getItem('token') || ''
          }          
        } 
        )
        .pipe(
          map( (resp: any) => {
            const { nombre, email, uid, rol, img, google } = resp.usuario;
            return new Usuario( nombre, email, uid, rol, img, google );          
          }
          )
        );    
      }

  
  
  

}


