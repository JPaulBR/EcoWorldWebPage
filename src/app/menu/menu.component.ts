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
    this.apt.getNews().subscribe(dato =>{
      this.listNews = dato;
    });
  }

}
