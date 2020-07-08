import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as mapboxgl1 from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagina-enviar',
  templateUrl: './pagina-enviar.component.html',
  styleUrls: ['./pagina-enviar.component.scss']
})
export class PaginaEnviarComponent implements OnInit {

  mapa:mapboxgl1.Map;
  showBox:boolean;
  cash:boolean;
  card: boolean = false;
  imagenes=[
    {a:"assets/imagenes/botella1.png",material:"Plástico",img:"botella",flag:false},
    {a:"assets/imagenes/papel1.png",material:"Papel",img:"papel",flag:false},
    {a:"assets/imagenes/lata1.png",material:"Aluminio",img:"lata",flag:false},
    {a:"assets/imagenes/vidrio1.png",material:"Vidrio",img:"vidrio",flag:false},
    {a:"assets/imagenes/tetra1.png",material:"Tetra pack",img:"tetra",flag:false},
    {a:"assets/imagenes/bateria1.png",material:"Batería",img:"bateria",flag:false}
  ]
  title = 'hello-world';
  loading = false;
  constructor(private snackBar: MatSnackBar,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cash = false;
    this.showBox = true;
    this.geolocation();
  }

  geolocation(){
    (mapboxgl1 as any).accessToken = environment.mapboxKey;
    var lng = -84.0000000;//position.coords.longitude;
    var lat = 10.0000000;//position.coords.latitude;
    this.mapa = new mapboxgl1.Map({
      container: 'map1', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat], // starting position lng lat
      zoom: 5 // starting zoom
    });
  }

  pay(){
    var x = document.getElementById("cash");
    if (this.cash){
      this.cash=false;
      x.style.backgroundColor ="rgba(0,0,0,0.1)";
    }
    else{
      this.cash = true;
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
    var imagen= this.imagenes[i]["a"];
    var swap = this.imagenes[i]["img"];
    var path = "assets/imagenes/"+swap+"1"+".png";
    if (imagen===path){
      var path = "assets/imagenes/"+swap+"2"+".png";
      this.imagenes[i]["a"]=path;
      this.imagenes[i]["flag"]=true;
    }
    else{
      this.imagenes[i]["a"]=path;
      this.imagenes[i]["flag"]=false;
    }
  }

  clearList(){
    for (var i=0;i<6;i++){
      var swap = this.imagenes[i]["img"];
      var path = "assets/imagenes/"+swap+"1"+".png";
      this.imagenes[i]["a"]=path;
      this.imagenes[i]["flag"]=false;      
    }    
  }

  verifyList(){
    var aux = false;
    this.imagenes.forEach(element=>{
      if(element.flag){
        aux=true;
      }
    });
    return aux;
  }

  save(): void {
    this.loading = true;
    if (!this.verifyList()){
      alert("Ingrese al menos un tipo de material a enviar.");
      this.loading = false;
    }
    else{
      this.delay(2500).then(res=>{
        this.showBox = false;
        if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition((position:Position)=>{
            this.mapa.flyTo({
              zoom: 15,
              center: [position.coords.longitude,position.coords.latitude],
              essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
          });
        }
        else{
          console.log("No soportado");
        }
      });
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired")); 
  }

  //Método que abre el modal
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
