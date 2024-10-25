import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map, tap } from 'rxjs';



@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {

  public titulo: string | undefined;

  constructor(
    private router: Router
  ) 
  { 
    this.getRouteData();
    
    
  }
  getRouteData() {
    this.router.events
    .subscribe( event => {
      if ( event instanceof ActivationEnd ) {
        console.log(event.snapshot.data);
        this.titulo = event.snapshot.data['titulo'];
      }
    }
    );


  }
}


    


    
