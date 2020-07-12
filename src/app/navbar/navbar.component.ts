import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
   
  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }

  openPage(page:string){
    this.router.navigate(['/',page]);
  }

  openFromNav(page:string){
    this.router.navigate(['/',page]);
    this.w3_close();
  }

}
