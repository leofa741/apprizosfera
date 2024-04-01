import { Component, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Article } from 'src/app/models/article.models';
import { ArticlesService } from 'src/app/services/articles.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

declare function customInit(): any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})


export class BlogComponent implements OnInit  {


  public imgUrl!: string;
  public articles: Article[] = [];
  public cargando: boolean = true;
  public desde: number = 0;
  public hasta: number = 0;
  public totalArticles: number = 0;
  public likess: any[] = [];
  public likes: any[] = [];
  public termino: string = '';
  public usuario!: string;
 
  constructor(
    private articleService: ArticlesService,
    private usuarioService: UsuariosService,  
    private busquedasService: BusquedasService,
    public modalImagenService: ModalImagenService,
  ) { 
    this.cargarArticles();
    }

  

  ngOnInit()  {
    customInit();  
    this.cargarArticles();
    this.searchBlog(this.termino);
    this.token;
    this.modalImagenService.nuevaImagen.subscribe(img => this.cargarArticles());
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  cargarArticles() {
    this.articleService.getArticles(this.desde)
      .subscribe(({ articles }) => {
        this.cargando = false;
        this.totalArticles = articles.total;
        this.articles = articles.articles;
        console.log(this.articles);
      });
  }


  abrirModal(article: Article) {
    if(article.usuario?._id !== this.usuarioService.usuario.uid){
      Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
      return;
    }

    this.modalImagenService.abrirModal('articulos', article._id, article.img);
  }




  searchBlog(termino: string) {
    this.busquedasService.searchBlog(termino)
      .subscribe((resp: any) => {
        this.cargando = false;
        console.log("blogsearch", resp);
        this.articles = resp.articles;
        console.log("produc", this.articles);
      }
      )
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


  Like(article: any) {   
    this.articleService.createLikeArticle(article)
      .subscribe(
        resp => {
          console.log("respuesta", resp);
          this.likess.push(resp);
          this.cargarArticles();
        },
        (err: any) => {
          if (this.token === ''||err.error.msg === 'El usuario ya ha dado like a este articulo') {
            Swal.fire({
              title: 'www.rizosfera.com.ar',
              text: err.error.msg,
              icon: 'info',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#0096d2',
            })
          }
        }
      );
  }


  deleteLike(article: any) {
    console.log(article);
    this.articleService.deleteLikeArticle(article, this.likess[0]._id)
      .subscribe(
        resp => {
          console.log("respuesta", resp);
          this.likess.pop();
          this.cargarArticles();
        },
        (err: any) => {
          Swal.fire({
            title: 'Error',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#0096d2',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#0096d2',
          }).then((result) => {
            if (result.isConfirmed) {
              this.Like(article);
            }
          }
          )
        }
      );
  }


  getLikes() {
    this.articleService.getLikes()
      .subscribe(({ likes }) => {
        this.cargando = false;
        this.likess = likes.likes;
        console.log(this.likess);
      });
  }

  comment(article: any) {
    if (this.token === '') {
      Swal.fire({
        title: 'www.rizosfera.com.ar',
        text: 'Debes estar logueado para comentar un articulo',
        icon: 'info',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#0096d2',

      })
    }
    Swal.fire({
      title: 'Estas seguro?',
      text: "Estas a punto de comentar un articulo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0096d2',
      cancelButtonColor: '#0096d2',
      confirmButtonText: 'Si, comentar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
       redirect: window.location.href = `/comments/${article._id}`;
       
      }
    })
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalArticles) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarArticles();
  }

  deleteArticle(id: any) {
    if (this.token === '') {
      Swal.fire({
        title: 'www.rizosfera.com.ar',
        text: 'Debes estar logueado para eliminar un articulo',
        icon: 'info',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#0096d2',
      })
    }
    for (const article of this.articles) {
      if (article.usuario?._id !== this.usuarioService.usuario.uid) {
        console.log("no es el mismo usuario", article.usuario?._id);
        console.log("no es el mismo usuario", this.usuarioService.usuario.uid);
        console.log("no es el mismo usuario", id);
        Swal.fire({
          title: 'Error',
          text: 'No puedes borrar un articulo que no es tuyo',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#0096d2',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#0096d2',

        })

      } else {
        Swal.fire({
          title: 'Estas seguro?',
          text: "Estas a punto de borrar un articulo",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0096d2',
          cancelButtonColor: '#0096d2',
          confirmButtonText: 'Si, borrar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.articleService.deleteArticle(id)
              .subscribe(resp => {
                this.cargarArticles();
                Swal.fire(
                  'Borrado!',
                  'El articulo ha sido borrado.',
                  'success'
                )
              })
          }
        })
      }
    }
  }


  isLoggedIn () {
    const token = localStorage.getItem('token') || '';
    if (token.length !== 0) {
  
      this.usuario = this.usuarioService.usuario?.nombre
      return true
    }    
    return false;
  }  

  


}

