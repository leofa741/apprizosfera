import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Categoria } from '../models/categoria.model';
import { map } from 'rxjs';

const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
 

  constructor(
    private http: HttpClient  ,
    private router: Router,
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

  cargarCaregorias( desde: number = 0 ) {
    const url = `${ base_url }/categorias?desde=${ desde }`;
    return this.http.get<Categoria[]>( url, this.headers )
      .pipe(
        map( (resp:any )=>{
          return {
            total: resp.total,
            categorias: resp.categorias,
        
          }}   
        )
      );
}


crearCategoria( nombre: string ) {
  const url = `${ base_url }/categorias`;
  return this.http.post( url, { nombre }, this.headers );

}

actualizarCategoria(_id :string , nombre: string ) {
  const url = `${ base_url }/categorias/${ _id }`;
  return this.http.put( url, {  nombre }, this.headers );
}


borrarCategoria( _id:any ) {
  console.log("_id",_id);
  const url = `${ base_url }/categorias/${ _id }`;
  return this.http.delete( url, this.headers );
}



buscarCategoria( termino: string ) {
  const url = `${ base_url }/buscar/${ termino }`;
  return this.http.get( url, this.headers )
    .pipe(
      map( (resp:any )=>{
        return resp.categorias;
      })
    );

}






}


