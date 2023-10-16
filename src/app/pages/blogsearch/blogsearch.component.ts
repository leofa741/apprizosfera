import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from 'src/app/services/busquedas.service';
import * as moment from 'moment';

@Component({
  selector: 'app-blogsearch',
  templateUrl: './blogsearch.component.html',
  styleUrls: ['./blogsearch.component.css']
})
export class BlogsearchComponent implements OnInit {

  public articlesblog: any[] = [];
  public cargando: boolean = true;

  

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private busquedasService: BusquedasService,
  ) { 
  
  }

  ngOnInit() : void {   
    this.activatedRoute.params
      .subscribe( ({ search }) => this.buscar( search ) );

  }

  buscar( termino: string ) {
    console.log("termino",termino);
    this.cargando = true;
    if ( termino.length === 0 ) {
      return;
    }
    this.busquedasService.searchBlog( termino )
      .subscribe( (resp:any) => {
        this.cargando = false;
        console.log("resp",resp);
        this.articlesblog = resp.articles;
        console.log("produc",this.articlesblog);
      }
      )

  }


  formatDate(date: any) {
    return moment(date).format('DD-MM-YYYY');
  }




}
