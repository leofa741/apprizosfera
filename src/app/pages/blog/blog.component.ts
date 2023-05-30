import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})


export class BlogComponent  implements OnInit {


 

  constructor(
    private usuarioService: UsuariosService,
  )
   { 
  
  }

  ngOnInit() {
   
  }





 

  

}
