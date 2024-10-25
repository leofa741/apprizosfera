import { Component, OnInit } from '@angular/core';

declare function customInitSlick(): any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements  OnInit {

  constructor() { 
    customInitSlick();
  }

  ngOnInit() {
  
  }

}

