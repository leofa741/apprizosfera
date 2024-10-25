import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) { }
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  buscar(termino: string) {
    const url = `${base_url}/buscar/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          const usuarios = resp.usuarios.map(
            (user: { nombre: string; email: string; uid: string; rol: string; img: string; google: string | undefined; }) => new Usuario(user.nombre, user.email, user.uid, user.rol, user.img, user.google)
          );
          return {
            total: resp.total,
            usuarios
          }
        }));
  }


  buscarGlobal(termino: string) {
    const url = `${base_url}/buscar/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          return resp;
        }));
  }


  searchBlog(termino: string) {
    const url = `${base_url}/buscar/search/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          return resp;
        }));
  }



}

