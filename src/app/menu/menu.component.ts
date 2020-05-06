import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
   
  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }

}
