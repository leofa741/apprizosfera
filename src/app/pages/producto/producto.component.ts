import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';

import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public prodtcForm!: FormGroup;
  public categorias: Categoria[] = [];
  public categoriaseleccionad: Categoria | undefined;
  public productoseleccionado!: any;
  producto: any;
  

  constructor(
    private router: Router,
    private fb : FormBuilder,
    private categoriasService: CategoriasService,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuariosService, 
 
  ) { }


  ngOnInit() {
    this.prodtcForm = this.fb.group({
      nombre: ['',Validators.required],
      precio: ['',Validators.required],
      categoria: ['',Validators.required],
      descripcion: ['',Validators.required],
      linkdepago: ['']    
    })

    this.cargarCategorias() ;

    this.prodtcForm.get('categoria')?.valueChanges
    .subscribe( cat => {
      this.categoriaseleccionad = this.categorias.find(categoria => categoria._id === cat);  
    }) 

  

    this.cargarProducto( this.activatedRoute.snapshot.params['id'] );

  }



  cargarProducto(id: string) { 
    console.log("id",id);
    this.productoService.cargarPrductosPorId(id)
      .subscribe(producto => {
        console.log("producto",producto);
        this.prodtcForm.setValue({
          nombre: producto.productos.productos.nombre,
          precio: producto.productos.productos.precio,
          descripcion: producto.productos.productos.descripcion,
          categoria: producto.productos.productos.categoria._id,
          linkdepago: producto.productos.productos.linkdepago
         
        });        
      });

  }


  guardar(){  
  
    const data = {
      ...this.prodtcForm.value,
      _id: this.activatedRoute.snapshot.params['id']
    }
   
    this.productoService.actualizarProducto(data)
    .subscribe( (resp:any) => {     
      Swal.fire('Guardado', 'Producto guardado correctamente', 'success');
      this.router.navigateByUrl('/admin-productos');   
    } )
  }


  camposNoValidos(campo: string): boolean {
    if (this.prodtcForm.get(campo)?.invalid && this.prodtcForm.get(campo)?.touched) {
      return true;
    } else {
      return false;
    }
  }

  cargarCategorias() {  
    this.categoriasService.cargarCaregorias()
      .subscribe(resp => {
        this.categorias = resp.categorias;  
        console.log("categorias",this.categorias);     
      })
  }

}
