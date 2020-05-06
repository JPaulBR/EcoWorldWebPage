import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.scss']
})
export class IngresarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToMenu(page:string){
    this.router.navigate(['/',page]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }

}
