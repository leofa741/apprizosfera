import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
 

  public imgUrl!: string;
  public usuario!: Usuario;
  constructor(
    private usuarioService: UsuariosService,
  ) {  }

  ngOnInit() {
    this.isLoggedIn ()
  }

 

  logout() {
    this.usuarioService.logout();
  }
   

  isLoggedIn () {
    const token = localStorage.getItem('token') || '';
    if (token.length !== 0) {
      this.imgUrl = this.usuarioService.usuario.imagenUrl;
      this.usuario = this.usuarioService.usuario;
      console.log('this.usuario: ', this.usuario);

    
      return true
    }
    
    return false;
  }  

  

}

