import { ActivatedRouteSnapshot,    CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;




// export const  authGuard: CanActivateFn = (route:ActivatedRouteSnapshot  , state) => {


//   const isValidToken = UsuariosService.validateToken();

//   if (isValidToken) {
//     return true; //El token es válido, permite el acceso a la ruta
//   } else {
//     // El token no es válido, redirige a una ruta de inicio de sesión
   
//     Swal.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'You must be logged in to access this page!',
//       footer: '<a href="/login">Login</a>'
//     })
    

//     window.location.href = '/login';
//     return false;
 // }
//};

interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable({
  providedIn: 'root'
})

// export class authGuard implements CanActivate {

//   constructor(
//     private usuarioService: UsuariosService,
//     private router: Router,
//     private http: HttpClient,
//     private ngZone: NgZone
//   ) { }

//   canActivate(): Observable<boolean> | Promise<boolean> | boolean {   

//     const token = localStorage.getItem('token') || '';

//     return this.http.get(`${base_url}/login/renew`, {
//       headers: {
//         'x-token': token
//       }
//     }).pipe(
//       tap((resp: any) => {
//         console.log("guard",resp.usuario);
//         localStorage.setItem('token', resp.token);
//        // localStorage.setItem('email', resp.usuario.email);
//       }),
//       map(resp => {
//         return true;
//       }),
//       catchError(error => {
//         this.ngZone.run(() => {
//           Swal.fire({
//                    icon: 'error',
//                   title: 'Oops...',
//                    text: 'You must be logged in to access this page!',
//                   footer: '<a href="/login">Login</a>'
//                }
//           )
//           localStorage.clear();            

//           this.router.navigateByUrl('/login');
//         });
//         return of(false);
//       })
//     );
//   }
// } 


export class authGuard implements CanActivate {

    constructor(
      private usuarioService: UsuariosService,
      private router: Router,
      private http: HttpClient,
      private ngZone: NgZone
    ) { }
  
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {   
  
      const token = localStorage.getItem('token') || '';

      return this.usuarioService.validarToken().pipe(
        tap( (valid) => {
          if (!valid) {
            Swal.fire({
                       icon: 'error',
                       title: 'Oops...',
                        text: 'You must be logged in to access this page!',
                        footer: '<a href="/login">Login</a>'
                            }
                        )
                        localStorage.clear(); 
            this.router.navigateByUrl('/login');
          }
        }
        )
      );
    }
  }







    