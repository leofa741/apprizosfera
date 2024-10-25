import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comments-new',
  templateUrl: './comments-new.component.html',
  styleUrls: ['./comments-new.component.css']
})
export class CommentsNewComponent implements OnInit {

  public prodtcForm!: FormGroup;
  public cargando: boolean = true;  
  public article!: string;

  constructor(
    private router: Router,
    private articlesService: ArticlesService,  
    private fb : FormBuilder,    
    private activatedRoute: ActivatedRoute,
 
  ) { }

  ngOnInit(): void {
    this.prodtcForm = this.fb.group({    
      article: [this.activatedRoute.snapshot.params['id'],Validators.required], 
      content: ['',Validators.required],
    })  
    this.article = this.activatedRoute.snapshot.params['id'];
  }

  guardar(){
    if(this.prodtcForm.invalid){
      Swal.fire('Error', 'El formulario  esta vacio', 'error');
      return;
    }

    this.articlesService.createComment(this.prodtcForm.value)
    .subscribe( resp => {
      console.log('Comentario creado');
      Swal.fire('Guardado', 'Comentario creado', 'success');
      console.log(resp);
      this.router.navigateByUrl('/blog');
    }, (err) => {
      console.log(err);
    });
 
  }
  

}
