import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-seccioncateg',
  templateUrl: './seccioncateg.component.html',
  styleUrls: ['./seccioncateg.component.css']
})
export class SeccioncategComponent implements OnInit {

  public categorias: any[] = [];
  public cargando: boolean = true;
  public img = '';

  constructor(
    private categoriasService: CategoriasService,
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }
  


  cargarCategorias() {
    this.cargando = true;
    this.categoriasService.cargarCaregorias()
      .subscribe(resp => {
        this.categorias = resp.categorias;
        this.cargando = false;
        console.log("cargando las d categorias",this.categorias);
      })
  }

}
