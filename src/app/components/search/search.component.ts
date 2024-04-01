import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit {

  public productos: any[] = [];


  constructor(
    private router: Router,
    private productoService: ProductoService,
  ) { 
  
  }

  ngOnInit(): void {
    
  }

  onSearchChange(searchValue: string): void { 

    if (searchValue.length === 0) {
      return;
    }
    this.router.navigate(['/search', searchValue]);
  }
  

  cargarProductos() { 
    this.productoService.cargarPrductos( )
      .subscribe( ({ productos }) => {
        setTimeout(() => {        
          this.productos = productos.productos;      
        }, 1000);        
      }
      );
  }


}
