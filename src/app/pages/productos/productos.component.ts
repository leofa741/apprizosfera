import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/prducto.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent  implements OnInit {

  public producto: Producto[] = [];

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
   public usuarioService: UsuariosService,   
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.modalImagenService.nuevaImagen.subscribe(img => this.cargarProductos());
  }


cargarProductos() {
  this.cargando = true;
  this.productoService.cargarPrductos( this.desde )
    .subscribe( ({ productos }) => {
      this.cargando = false;
      this.producto = productos.productos;
      this.totalRegistros = productos.total;
      this.ok = productos.ok;
      console.log(this.producto);
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


abrirModal( producto: Producto ) {
  if(producto.usuario?._id !== this.usuarioService.usuario.uid){
    Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
    return;
  }

  this.modalImagenService.abrirModal('productos', producto._id, producto.img);
}


buscar(termino: string) {

  if (termino.length === 0) {
    return this.cargarProductos();
  }
  this.productoService.buscarProducto(termino)
    .subscribe((productos: Producto[]) => {
      this.producto = productos;
   
    }
    )
}



borrarProducto( producto: Producto ) {
  if(producto.usuario?._id !== this.usuarioService.usuario.uid){
    Swal.fire('Error', 'No puede borrar este producto,solo sus productos son editable', 'error');
    return;
  }
  Swal.fire({
    title: '¿Borrar producto?',
    text: `Esta a punto de borrar a ${ producto.nombre }`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, borrar',
    cancelButtonText: 'No, cancelar',
  }).then((result) => {
    if (result.value) {
      this.productoService.borrarProducto( producto._id )
        .subscribe( resp => {
          this.cargarProductos();
          Swal.fire(
            'Borrado!',
            `${ producto.nombre } fue eliminado correctamente`,
            'success'
          );
        });
    }
  });
}


actualizarProducto( producto: Producto ) {
  if(producto.usuario?._id !== this.usuarioService.usuario.uid){
    Swal.fire('Error', 'No puede borrar este producto,solo sus productos son editable', 'error');
    return;
  }

  this.productoService.actualizarProducto( producto )
    .subscribe( resp => {
      Swal.fire('Guardado', producto.nombre, 'success');
    });

}




}
