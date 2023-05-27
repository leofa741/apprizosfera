import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  constructor(
    private usuarioService: UsuariosService,
  ) {
    this.isLoggedIn ()
  }

  ngOnInit() {
  }

  logout() {
    this.usuarioService.logout();
    window.location.reload();
  }


   

  isLoggedIn () {
    const token = localStorage.getItem('token') || '';
    if (token.length !== 0) {
      return true
    }



    return false;
  }  

}
