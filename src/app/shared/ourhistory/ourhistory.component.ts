import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article.models';
import { ArticlesService } from 'src/app/services/articles.service';
import * as moment from 'moment';

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

  public articles!: Article[];
  public cargando: boolean = true;  
  public desde: number = 0;
  public hasta : number = 0;
  public totalArticles: number = 0;
  public likess: any[] = []; 
  public likes: any[] = [];

  constructor(
    private router: Router,
    private articleService: ArticlesService,
  ) { }





  ngOnInit()  {
    customInit();
    customInitTether();
    customboostrapinit();
    customInitSlick();
    this.getLastArticles();
  }



  getLastArticles() {
    this.articleService.getLastArticles()
    .subscribe( ({ articles }) => {
      this.cargando = false;
      this.totalArticles =articles.total;
      this.articles = articles.articles;    
      console.log(this.articles);
    });    
  }

  formatDate(date: any) {
    return moment(date).format('DD-MM-YYYY');
  }



}
