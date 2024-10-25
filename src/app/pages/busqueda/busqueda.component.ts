import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/prducto.model';
import { BusquedasService } from 'src/app/services/busquedas.service';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent  implements OnInit {

  public productos: Producto[] = [];
  public cargando: boolean = true;  



  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private busquedasService: BusquedasService,
  ) { }

  ngOnInit() : void {

    this.activatedRoute.params
      .subscribe( ({ termino }) => this.buscar( termino ) ); 

  }

  buscar( termino: string ) {
    this.cargando = true;
    if ( termino.length === 0 ) {
      return;
    }
    this.busquedasService.buscarGlobal( termino )
      .subscribe( (resp:any) => {
        this.cargando = false;
        console.log(resp);
        this.productos = resp.productos;
        console.log("produc",this.productos);
      }
      )

  }

  


}
