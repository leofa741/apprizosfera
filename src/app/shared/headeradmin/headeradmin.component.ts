import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-headeradmin',
  templateUrl: './headeradmin.component.html',
  styleUrls: ['./headeradmin.component.css']
})
export class HeaderadminComponent implements OnInit {

  public rol!: string;

  constructor(
    private usuarioService: UsuariosService,
  ) { }

  ngOnInit(): void {

    this.rol = this.usuarioService.usuario.rol;
  
  }



}
