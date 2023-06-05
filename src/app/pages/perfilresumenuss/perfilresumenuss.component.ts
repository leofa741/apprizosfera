import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfilresumenuss',
  templateUrl: './perfilresumenuss.component.html',
  styleUrls: ['./perfilresumenuss.component.css']
})

export class PerfilresumenussComponent implements OnInit {

  public usuario!: string;
  public imgUrl!: string;
  public usuariomodel!: Usuario;

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
      this.imgUrl = this.usuarioService.usuario?.imagenUrl || '';
      this.usuario = this.usuarioService.usuario?.nombre
      this.usuariomodel = this.usuarioService.usuario!;     
      return true
    }    
    return false;
    
  }  

  

}
