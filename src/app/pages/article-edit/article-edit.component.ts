import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article.models';
import { ArticlesService } from 'src/app/services/articles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit {

  
  public prodtcForm!: FormGroup;

  public article!: Article;
  public cargando: boolean = true;  


  constructor(
    private articleService: ArticlesService,
    private fb : FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
 
  ) { }

  ngOnInit(): void {
    this.prodtcForm = this.fb.group({
      title: ['',Validators.required],
      content: ['',Validators.required],
    })

    this.cargarArticle( this.activatedRoute.snapshot.params['id'] );
  }

  cargarArticle(  id: string ) {
    this.articleService.getArticle( id )
      .subscribe( ({ article }) => {
        this.cargando = false;
        this.article = article;
        console.log(this.article);
      });    
  
  }


  guardar(){
    if(this.prodtcForm.invalid){
      Swal.fire('Error', 'No edito el formulario', 'error');
      return;
    }

    this.articleService.updateArticle(this.prodtcForm.value,this.activatedRoute.snapshot.params['id'])
    .subscribe( resp => {
      console.log('Articulo actualizado');
      console.log(resp);
      Swal.fire('Guardado', 'Articulo actualizado correctamente', 'success');
      this.router.navigateByUrl('/blog');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
    
  }

  


}
