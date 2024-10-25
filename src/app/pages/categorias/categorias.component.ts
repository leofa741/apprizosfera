import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public categorias: Categoria[] = [];
 
  public imagenT: string = '';
  public cargando: boolean = true;
  public desde: number = 0;
  public totalCategorias: number = 0;

  constructor(

    private categoriasService: CategoriasService,
    public modalImagenService: ModalImagenService,
    private usuarioService: UsuariosService,  

  ) { }

  ngOnInit() {
    this.cargarCategorias();
    this.modalImagenService.nuevaImagen.subscribe(img => this.cargarCategorias());
  }

  buscarCategoria(termino: string) {
    console.log(termino);
    if (termino.length === 0) {
      return this.cargarCategorias();
    }
    this.categoriasService.buscarCategoria(termino)
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      }
      )
  }


  cargarCategorias() {
    this.cargando = true;   

    this.categoriasService.cargarCaregorias(  this.desde)
      .subscribe(resp => {
        this.totalCategorias = resp.total;
        this.categorias = resp.categorias;
        this.cargando = false;       
        console.log("cargando categorias",this.categorias);
      })
  }



  async agregarCategoria() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Ingrese el nombre de la nueva categoria',
      input: 'text',
      inputLabel: 'Nombre de la categoria',
      inputPlaceholder: 'Nombre de la categoria',
      showCancelButton: true,
    })

    if (value?.trim().length === 0) {
      return;
    }

    this.categoriasService.crearCategoria(value)
      .subscribe((resp: any) => {
        this.categorias.push(resp.categoria);
        Swal.fire('Creado', resp.categoria.nombre, 'success');
        this.cargarCategorias();
      }
      )
  }


  guardarCategoria(categoria: Categoria) {
    if(categoria.usuario?._id !== this.usuarioService.usuario.uid){
      Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
      return;
    }

    this.categoriasService.actualizarCategoria(categoria._id!, categoria.nombre)
      .subscribe(resp => {
        Swal.fire('Guardado', categoria.nombre, 'success');
        this.cargarCategorias();
      },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }       
      )
  }



  borrarCategoria(categoria: Categoria) {
    if(categoria.usuario?._id !== this.usuarioService.usuario.uid){
      Swal.fire('Error', 'No puede borrar esta categoria,solo su categria puede borrar', 'error');
      return;
    }
    this.categoriasService.borrarCategoria(categoria._id)
      .subscribe(resp => {
        Swal.fire('Borrado', categoria.nombre, 'success');
        this.cargarCategorias();
      })

  }


  abrirModal(categoria: Categoria) {
    if(categoria.usuario?._id !== this.usuarioService.usuario.uid){
      Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
      return;
    }
    this.modalImagenService.abrirModal('categorias', categoria._id, categoria.img);
  }

  cambiarDesde( valor: number ) {       
    const desde = this.desde + valor;     
    if ( desde >= this.totalCategorias ) { 
      return;
    }  
    if ( desde < 0 ) {
      return;
    }  
    this.desde += valor;
    this.cargarCategorias();
  }



}
