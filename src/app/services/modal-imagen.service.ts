import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  imagenTemp: string = '';
  public _mostrarModal: boolean = true;

  public tipo!: 'usuarios' | 'productos' | 'categorias' | 'articulos';
  public id: string = '';
  public img: string = 'no-image';
  public nuevaImagen: EventEmitter <string> = new EventEmitter <string> ();

  get mostrarModal() {  
    return this._mostrarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'productos' | 'categorias' | 'articulos',
    id: string = '',
    img?: string
  ) {
    this._mostrarModal = false;
    this.tipo = tipo;
    this.id = id;
    if (img) {
      this.img = `${base_url}/uploads/${tipo}/${img}`;	

    }
    else {
      this.img = `${base_url}/uploads/${tipo}/${img}`;
    }

  }

  cerrarModal() {
    this._mostrarModal = true;
    this.img = 'no-image';

  }

  imagenCargada(img: string) {
    this.nuevaImagen.emit(img);
  }
  

  constructor() { }
}
