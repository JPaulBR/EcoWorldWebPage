import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getLocation();
  }

  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
   
  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }

  getLocation(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position:Position)=>{
        if (position){
          console.log(position.coords.longitude+" "+position.coords.latitude);
        }
      },(error:PositionError)=>console.log(error));
    }
    else{
      console.log("No soportado");
    }
  }

}
