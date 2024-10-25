import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/prducto.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

declare function customInit(): any;

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.1.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit{

  public producto:any[]=[];
  public usuario: string = '';
  public desde: number = 0;
  public hasta : number = 0;
  public totalRegistros: number = 0;
  public cargando: boolean = true;  
  public ok: boolean = false;
  public total: number = 0;

  constructor(
    private router: Router,
    private productoService: ProductoService,
    public modalImagenService: ModalImagenService,
    private usuarioService: UsuariosService,   
  ) { 
  
    this.cargarProductos();

    }

  ngOnInit()  { 
    customInit();  
    this.cargarProductos();   
  }


  cargarProductos() {
    this.cargando = true;
    this.productoService.cargarPrductos( this.desde )
      .subscribe( ({ productos }) => {
          this.cargando = false;       
          this.producto = productos.productos; 
          this.totalRegistros = productos.total;
          this.ok = productos.ok;             
      });
  }
  

  cambiarDesde( valor: number ) { 
    const desde = this.desde + valor;
    const hasta = this.hasta + valor;
    console.log(desde);
    if ( desde >= this.totalRegistros ) {
      return;
      }
  
    if ( desde < 0 ) {
      return;
    }  
    this.desde += valor ;
    this.hasta += valor - this.totalRegistros;
    this.cargarProductos();  
  }




}



