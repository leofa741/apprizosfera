import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit  {

  loading :boolean  ;


  constructor(    ) { 

    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    } , 3000);

  }






  ngOnInit() {
   
  }




}
