import { Component, OnInit } from '@angular/core';

declare function customboostrapinit(): any;
declare function customInit(): any;
declare function customInitTether(): any;
declare function customInitSlick(): any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'apppr';


  ngOnInit() : void {
    
    customInitTether();
    customInit();   
    customboostrapinit();
    customInitSlick();

    

    
   
  }
  
}



