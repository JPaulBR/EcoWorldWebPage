import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  users = [{name:"Andrea Pirlo",pos:1,img:"https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"},
  {name:"Andrea Pirlo",pos:2,img:"https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"},
  {name:"Andrea Pirlo",pos:3,img:"https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"},
  {name:"Andrea Pirlo",pos:4,img:"https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"},
  {name:"Andrea Pirlo",pos:5,img:"https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"},
  {name:"Andrea Pirlo",pos:6,img:"https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"},
  {name:"Andrea Pirlo",pos:7,img:"https://sunlimetech.com/portfolio/boot4menu/assets/imgs/team/img_01.png"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
