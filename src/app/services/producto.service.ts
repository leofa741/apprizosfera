import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/prducto.model';

const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

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


  cargarPrductos( desde: number = 0 ) {
    const url = `${ base_url }/productos?desde=${ desde }`;

    return this.http.get( url, this.headers )
      .pipe(
        map( (resp:any )=>{
          return {        
            productos: resp,        
        
          }}
        )
      );
}

cargarPrductosPorCategoria( categoria: string, desde: number = 0 ) {
  const url = `${ base_url }/productos/categoria/${ categoria }?desde=${ desde }`;

  return this.http.get( url, this.headers )
    .pipe(
      map( (resp:any )=>{
        return {
          total: resp.total,
          productos: resp.productos,
      
        }}
      )
    );

      }

      crearProducto(producto: { nombre: string, precio: number, categoria: string, descripcion: string } ) {   
         const url = `${ base_url }/productos`;
         return this.http.post( url, {nombre: producto.nombre, precio: producto.precio, categoria: producto.categoria, descripcion: producto.descripcion
        }, this.headers );
      
      }

      actualizarProducto( producto: Producto ) {
        const url = `${ base_url }/productos/${ producto._id }`;
        return this.http.put( url, { producto }, this.headers );
      }

      borrarProducto( _id:any ) {
    
        const url = `${ base_url }/productos/${ _id }`;
        return this.http.delete( url, this.headers );
      }


      buscarProducto( termino: string ) {
        const url = `${ base_url }/buscar/${ termino }`;
        return this.http.get( url, this.headers )
          .pipe(
            map( (resp:any )=>{
              return resp.productos;
            })
          );
      }



        



}
