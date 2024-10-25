import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.models';
import { ArticlesService } from 'src/app/services/articles.service';
import * as moment from 'moment';
import { ActivatedRoute, Router,Params } from '@angular/router';

import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  public article!: Article;
  public cargando: boolean = true;  
  public comments!: Article;
  public usuario:any[] = [];
  public id: any;

  public nombre: string[] = [];
  
  constructor(
    private articleService: ArticlesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuariosService,  
  ) {    
  
  }

  ngOnInit(): void {
    this.cargarArticle( this.activatedRoute.snapshot.params['id'] );
    
  } 

  
  cargarArticle(id: string) {
    this.articleService.getArticle(id).subscribe(({ article }) => {
      this.cargando = false;
      this.article = article;
      this.comments = article.comments;

      console.log("nn",this.article);

    });
  }

  borrarComment( comment: any ) {
 console.log("comment",comment);


try {
  Swal.fire({
    title: '¿Borrar comentario?',
    text: 'Esta a punto de borrar un comentario',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, borrar',
    cancelButtonText: 'No, cancelar',
  }).then((result) => {
    if (result.value) {
      this.articleService.deleteComment(comment).subscribe((resp) => {
        this.cargarArticle(this.activatedRoute.snapshot.params['id'] );
      });
    }
  });
} catch (error) {
  console.log("frt",error);

  Swal.fire({
    title: 'Error',
    text: 'No se pudo borrar el comentario',
    icon: 'error',
    confirmButtonText: 'Ok',
  });


}
        
        
  }




  


  formatDate(date: any) {
    return moment(date).format('DD-MM-YYYY');
  }

  couuntLikes(likes: any) {  
    return likes.length;
  }

  couuntComments(comments: any) {
    return comments.length;
  }

}
