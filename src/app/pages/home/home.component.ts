import { Component, OnInit } from '@angular/core';

declare function customboostrapinit(): any;
declare function customInit(): any;
declare function customInitTether(): any;
declare function customInitSlick(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit{

  constructor() { }




  ngOnInit()  {
    customInit();
    customInitTether();
    customboostrapinit();
    customInitSlick();
  }


}
