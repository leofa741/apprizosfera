import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/prducto.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

declare function customboostrapinit(): any;
declare function customInit(): any;
declare function customInitTether(): any;


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
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
  ) { }

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

  console.log(this.producto);

   

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
    this.desde += valor;
    this.hasta += valor- this.totalRegistros;
    this.cargarProductos();  
  }




}



