import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../tablas/noticias/noticias.service';
import { News } from '../tablas/noticias/noticia';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  selected = 'option0';
  listNews: any;
  constructor(private apt:NoticiasService) { }

  ngOnInit(): void {
    this.allNews();
  }

  allNews(){
    this.listNews = null;
    this.apt.getNews().subscribe(dato =>{
      this.listNews = dato;
    });
  }

  filterNews(value:string){
    this.listNews = null;
    this.apt.searchNew(value).subscribe(dato=>{
      this.listNews = dato;
    });
  }

  changeOption(value:string){
    if (value==='option0'){
      this.allNews();
    }
    else{
      this.filterNews(value);
    }
  }

}
