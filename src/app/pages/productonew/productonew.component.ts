import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  public productoseleccionado: Producto | undefined;

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
      descripcion: ['',Validators.required] 
      
    })

    this.cargarCategorias() ;

    this.prodtcForm.get('categoria')?.valueChanges
    .subscribe( cat => {
      this.categoriaseleccionad = this.categorias.find(categoria => categoria._id === cat);
  
    }
    )
    
  }



  guardar(){  
    const {nombre,precio,descripcion,categoria} = this.prodtcForm.value;
    this.productoService.crearProducto(this.prodtcForm.value)
    .subscribe( (resp:any) => {     
      Swal.fire('Guardado', 'Producto guardado correctamente', 'success');
      this.router.navigateByUrl(`/producto/${resp.producto._id}`);
    }
    )
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
