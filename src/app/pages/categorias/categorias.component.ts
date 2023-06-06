import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public categorias: Categoria[] = [];
  public totalCategorias: number = 0;
  public imagenT: string = '';
  public cargando: boolean = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private categoriasService: CategoriasService,
    public modalImagenService: ModalImagenService

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

    this.categoriasService.cargarCaregorias()
      .subscribe(resp => {
        this.totalCategorias = resp.total;
        this.categorias = resp.categorias;
        this.cargando = false;


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
      }
      )
  }


  guardarCategoria(categoria: Categoria) {
    this.categoriasService.actualizarCategoria(categoria._id!, categoria.nombre)
      .subscribe(resp => {
        Swal.fire('Guardado', categoria.nombre, 'success');
      },
        (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }   
    
      )
   
     

  }



  borrarCategoria(categoria: Categoria) {
    this.categoriasService.borrarCategoria(categoria._id)
      .subscribe(resp => {
        Swal.fire('Borrado', categoria.nombre, 'success');
        this.cargarCategorias();
      })

  }


  abrirModal(categoria: Categoria) {

    this.modalImagenService.abrirModal('categorias', categoria._id, categoria.img);
  }



}
