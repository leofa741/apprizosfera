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

    // Seleccionamos el logo por su ID cuando el componente se inicializa
    const logoImg = document.getElementById('logo-img');

    if (logoImg) {
      // Agregamos un evento de escucha al movimiento del ratón
      document.addEventListener('mousemove', (event) => {
        // Obtenemos las coordenadas del puntero del ratón
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Obtenemos el centro del viewport
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Calculamos el desplazamiento en relación al centro
        const offsetX = (mouseX - centerX) / 5; // Divide para reducir la intensidad del movimiento
        const offsetY = (mouseY - centerY) / 5;

        // Aplicamos la transformación a la imagen del logo
        logoImg.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.4) rotate(-35deg)`;
      });
    }
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
