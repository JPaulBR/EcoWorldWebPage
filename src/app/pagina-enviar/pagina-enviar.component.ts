import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as mapboxgl1 from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagina-enviar',
  templateUrl: './pagina-enviar.component.html',
  styleUrls: ['./pagina-enviar.component.scss']
})
export class PaginaEnviarComponent implements OnInit {

  payButton:boolean;
  mapa:mapboxgl1.Map;
  showBox:boolean;
  imagenes=[
    {a:"assets/imagenes/botella1.png"},
    {a:"assets/imagenes/papel1.png"},
    {a:"assets/imagenes/lata1.png"},
    {a:"assets/imagenes/vidrio1.png"},
    {a:"assets/imagenes/tetra1.png"},
    {a:"assets/imagenes/bateria1.png"}
  ];
  title = 'hello-world';
  loading = false;
  flag1;flag2;flag3;flag4;flag5;flag6=false;
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.payButton = false;
    this.showBox = true;
    this.geolocation();
  }

  geolocation(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position:Position)=>{
        (mapboxgl1 as any).accessToken = environment.mapboxKey;
        var lng = position.coords.longitude;
        var lat = position.coords.latitude;
        this.mapa = new mapboxgl1.Map({
          container: 'map1', // container id
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat], // starting position lng lat
          zoom: 9 // starting zoom
        });
        //this.mapa.addControl(new mapboxgl1.NavigationControl());
      });
    }
    else{
      console.log("No soportado");
    }
  }

  pay(){
    var x = document.getElementById("cash");
    if (this.payButton){
      this.payButton=false;
      x.style.backgroundColor ="rgba(0,0,0,0.1)";
    }
    else{
      this.payButton = true;
      x.style.backgroundColor ="rgba(50,190,143,0.5)";
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message,action, {
      duration: 2000
    });
  }

  //i: is for posicion in the list (what kind of material is)
  checkImages(i:number){
    if (i===0){
      if (this.flag1){
        this.flag1=false;
        this.imagenes[i]["a"]="assets/imagenes/botella1.png"
      }
      else{
        this.flag1=true;
        this.imagenes[i]["a"]="assets/imagenes/botella2.png"
      }
    }
    if (i===1){
      if (this.flag2){
        this.flag2=false;
        this.imagenes[i]["a"]="assets/imagenes/papel1.png"
      }
      else{
        this.flag2=true;
        this.imagenes[i]["a"]="assets/imagenes/papel2.png"
      }
    }
    if (i===2){
      if (this.flag3){
        this.flag3=false;
        this.imagenes[i]["a"]="assets/imagenes/lata1.png"
      }
      else{
        this.flag3=true;
        this.imagenes[i]["a"]="assets/imagenes/lata2.png"
      }
    }
    if (i===3){
      if (this.flag4){
        this.flag4=false;
        this.imagenes[i]["a"]="assets/imagenes/vidrio1.png"
      }
      else{
        this.flag4=true;
        this.imagenes[i]["a"]="assets/imagenes/vidrio2.png"
      }
    }
    if (i===4){
      if (this.flag5){
        this.flag5=false;
        this.imagenes[i]["a"]="assets/imagenes/tetra1.png"
      }
      else{
        this.flag5=true;
        this.imagenes[i]["a"]="assets/imagenes/tetra2.png"
      }
    }
    if (i===5){
      if (this.flag6){
        this.flag6=false;
        this.imagenes[i]["a"]="assets/imagenes/bateria1.png"
      }
      else{
        this.flag6=true;
        this.imagenes[i]["a"]="assets/imagenes/bateria2.png"
      }
    }
  }

  save(): void {
    this.loading = true;
    this.delay(2500).then(res=>{
      this.showBox = false;
    });
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired")); 
  }

}
