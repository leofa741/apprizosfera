import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { Producto } from 'src/app/models/prducto.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productonew',
  templateUrl: './productonew.component.html',
  styleUrls: ['./productonew.component.css']
})


export class ProductonewComponent implements OnInit {

  public prodtcForm!: FormGroup;
  public categorias: Categoria[] = [];
  public categoriaseleccionad: Categoria | undefined;
  public productoseleccionado!: any;

  constructor(
    private router: Router,
    private fb : FormBuilder,
    private categoriasService: CategoriasService,
    private productoService: ProductoService,
 
 
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
    
   
    
  }


  cargarProducto(id: string) {   

    this.productoService.cargarPrductosPorId(id)
      .subscribe(producto => {

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
    const {nombre,precio,descripcion,categoria} = this.prodtcForm.value;
    this.productoService.crearProducto(this.prodtcForm.value)
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
      })
  }

}
