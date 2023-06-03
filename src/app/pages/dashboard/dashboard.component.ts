import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent  implements OnInit {


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
      this.imgUrl = this.usuarioService.usuario?.imagenUrl;
      this.usuario = this.usuarioService.usuario?.nombre
      this.usuariomodel = this.usuarioService.usuario!;

    
    
      return true
    }
    
    return false;
  }  

  

}
