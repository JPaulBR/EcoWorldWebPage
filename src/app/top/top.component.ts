import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  users = [{name:"Andrea Pirlo",pos:1,img:"https://i.guim.co.uk/img/media/7cfc1f26a1ae5dc94018f7878dd5e2c7d248c30c/0_123_2448_1468/master/2448.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=64d78aeec8f36814b9487ee952bf8905"},
  {name:"Takumi Minamino",pos:2,img:"https://upload.wikimedia.org/wikipedia/commons/4/4b/FC_Admira_Wacker_M%C3%B6dling_vs._FC_Red_Bull_Salzburg_2018-04-15_%28061%29.jpg"},
  {name:"Lassana Diarra",pos:3,img:"https://www.pasionfutbol.com/__export/1514298713577/sites/pasionlibertadores/img/2017/12/26/lassana_diarra_psg.jpg_691115875.jpg"},
  {name:"Siphiwe Tshabalala",pos:4,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQ0U4rGfrqSsTnlu3VUpAmFnJdCaNyV78RZz-gr5Zc0kKo-oFq&usqp=CAU"},
  {name:"Steve McManaman",pos:5,img:"https://tmssl.akamaized.net/images/portrait/originals/3980-1476361518.jpg"},
  {name:"Donald knuth",pos:6,img:"https://upload.wikimedia.org/wikipedia/commons/4/4f/KnuthAtOpenContentAlliance.jpg"},
  {name:"Allison Becker",pos:7,img:"https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
