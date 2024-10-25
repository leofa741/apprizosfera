import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import './header.component.css';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
 
  public usuario!: string;
  public imgUrl!: string;
  public usuariomodel!: Usuario;
  public totalUsuarios: number = 0;
  public usuarioss: Usuario[] = [] ;
  
  constructor(
    private usuarioService: UsuariosService,
    public modalImagenService: ModalImagenService
  ) { }

  ngOnInit() {
    this.isLoggedIn();
    this.modalImagenService.nuevaImagen.subscribe(img => this.cargarUsuarios());
    this.cargarUsuarios();

 
  }

  menuOpen = false;
  toggleMenu() {
    document.getElementById('sidebar')?.classList.toggle('active');
  }

  logout() {
    this.usuarioService.logout();
  }

  cargarUsuarios() {   
    this.usuarioService.cargarUsuarios()
      .subscribe(({total, usuarios}) => {     
        this.totalUsuarios = total;
        this.usuarioss = usuarios;    
      });
  }

  isLoggedIn () {
    const token = localStorage.getItem('token') || '';
    if (token.length !== 0) {
      this.imgUrl = this.usuarioService.usuario?.img || '';
      this.usuario = this.usuarioService.usuario?.nombre;    
      return true;
    }    
    return false;
  }  
}
