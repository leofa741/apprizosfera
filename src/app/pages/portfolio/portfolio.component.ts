import { Component, OnInit } from '@angular/core';

declare function customboostrapinit(): any;
declare function customInit(): any;
declare function customInitTether(): any;
declare function customInitSlick(): any;

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{

  ngOnInit() : void {
    customInitTether();
    customInit();
    customInitSlick();
    customboostrapinit();
   
  }

}
