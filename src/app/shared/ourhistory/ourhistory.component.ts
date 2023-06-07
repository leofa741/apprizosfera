import { Component, OnInit } from '@angular/core';


declare function customboostrapinit(): any;
declare function customInit(): any;
declare function customInitTether(): any;
declare function customInitSlick(): any;


@Component({
  selector: 'app-ourhistory',
  templateUrl: './ourhistory.component.html',
  styleUrls: ['./ourhistory.component.css']
})
export class OurhistoryComponent implements OnInit{

  constructor() { }




  ngOnInit()  {
    customInit();
    customInitTether();
    customboostrapinit();
    customInitSlick();
  }


}
