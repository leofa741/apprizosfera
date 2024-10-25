import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article.models';
import { ArticlesService } from 'src/app/services/articles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css']
})
export class ArticleNewComponent implements OnInit {

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

  }

 


  guardar(){
    if(this.prodtcForm.invalid){
      return;
    }

    this.articleService.createArticle(this.prodtcForm.value)
    .subscribe( resp => {  
      console.log(resp);
      Swal.fire('Guardado', 'Articulo creado correctamente', 'success');
      this.router.navigateByUrl('/blog');
    }, (err) => {
      console.log(err);
    });
    
  }

  


}
