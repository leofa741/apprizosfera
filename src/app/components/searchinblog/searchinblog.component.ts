import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Params } from '@angular/router';
import * as moment from 'moment';
import { Article } from 'src/app/models/article.models';
import { Usuario } from 'src/app/models/usuario.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-searchinblog',
  templateUrl: './searchinblog.component.html',
  styleUrls: ['./searchinblog.component.css']
})
export class SearchinblogComponent  implements OnInit {
  
  public articlesblog: Article[] = [];
  public cargando: boolean = true;
  public desde: number = 0;
  public hasta: number = 0;
  public totalArticles: number = 0;

  public termino: string = '';

  public usuario: Usuario = this.usuarioService.usuario;

  constructor(
    private usuarioService: UsuariosService,    
    private busquedasService: BusquedasService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
  }


  onSearchChanges(searchValue: string): void { 

    if (searchValue.length === 0) {
      return;
    }
    this.router.navigate(['/searchinblog', searchValue]);
  }
  


}

