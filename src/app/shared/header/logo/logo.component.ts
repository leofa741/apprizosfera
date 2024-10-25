import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: ` 
  <div class="logo">
    <a routerLink="/home">
      <img src="assets/img/a-abeja.webp" alt="Logo de abeja" id="logo-img" />
    </a>
  </div>`,
  styleUrls: ['./logo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LogoComponent implements AfterViewInit {
  
  ngAfterViewInit() {
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
}
