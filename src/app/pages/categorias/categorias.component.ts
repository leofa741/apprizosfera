import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriasService } from 'src/app/services/categorias.service';

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
    private http: HttpClient  ,
    private router: Router,
    private categoriasService: CategoriasService,

  ) { }

  ngOnInit(): void {

    this.cargarCategorias();
    
  }

  cargarCategorias() {
    this.cargando = true;


    this.categoriasService.cargarCaregorias()
    .subscribe( resp => {
      console.log("resp",resp);

      this.totalCategorias = resp.total;
      this.categorias = resp.categorias;
       this.cargando = false;

    })
  }

  

  agregarCategoria () {

  }


}
