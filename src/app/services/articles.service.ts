import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map ,catchError} from 'rxjs';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';



const base_url =  environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private http: HttpClient,
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

  createArticle( formData: any ) {
    const url = `${ base_url }/articles`;
    return this.http.post( url, formData, this.headers );
  }

  updateArticle( formData: any, id: string ) {
    const url = `${ base_url }/articles/${ id }`;
    return this.http.put( url, formData, this.headers );
  }

  createComment( formData: any) {
    const url = `${ base_url }/comments`;
    return this.http.post( url, formData, this.headers );
  }


  getArticles( desde: number = 0 ,last:any=null) {
    const url = `${ base_url }/articles?desde=${ desde }`;

    if(last != null){
      const url = `${ base_url }/articles?last=${ last }`;
    }
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp:any )=>{
          return {        
            articles: resp,   
            total: resp.total,             
          }}
        )
      );
    }

    getLastArticles( ) {
      const url = `${ base_url }/articles/latest/last`;
      return this.http.get( url, this.headers )
        .pipe(
          map( (resp:any )=>{
            return {        
              articles: resp,   
              total: resp.total,               
            }}
          )
        );
      }
      

    getArticle( id: string) {
      const url = `${ base_url }/articles/article/${ id }`;
      return this.http.get( url, this.headers )
        .pipe(
          map( (resp:any )=>{
            return {        
              article: resp.article,      
            
            }}
          )
        );
      }

    createLikeArticle( article: string ) {
      const url = `${ base_url }/likes`;
      console.log("del service",article);
      return this.http.post( url, {  article }, this.headers );  
         
    }

    deleteLikeArticle( article: string , id: string) {
      const url = `${ base_url }/likes/${id}`;
      console.log("del service",article);
      return this.http.delete( url,  this.headers );
         
    }

    getLikes( ) {
      const url = `${ base_url }/likes`;
      return this.http.get( url, this.headers )
        .pipe(
          map( (resp:any )=>{
            return {        
              likes: resp,      
            
            }}
          )
        );
        
      }

      deleteArticle( id: any ) {
        const url = `${ base_url }/articles/${ id}`;
        return this.http.delete( url, this.headers );
      }

      deleteComment( id: any ) {
        const url = `${ base_url }/comments/${ id}`;
        //capturar los error

        return this.http.delete( url, this.headers )
        .pipe(
          catchError( err => {
            console.log("wer",err);

            Swal.fire({
              title: 'Error',
              text: err.error.msg,
              icon: 'error',
              confirmButtonText: 'Ok',
            });

            return err;
          })
        );
        
      }

       



}
