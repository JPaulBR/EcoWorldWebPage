import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as mapboxgl1 from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../tablas/usuarios/usuarios.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pagina-enviar',
  templateUrl: './pagina-enviar.component.html',
  styleUrls: ['./pagina-enviar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginaEnviarComponent implements OnInit {

  mapa:mapboxgl1.Map;
  showBox:boolean;
  cash:boolean=false;
  card: boolean = false;
  info:boolean;
  lat:any;
  lng:any;
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
  constructor(private snackBar: MatSnackBar,private modalService: NgbModal,
    private apt2:UsuariosService,private http:HttpClient) { }

  ngOnInit(): void {
    this.showBox = true;
    this.geolocation();
  }

  geolocation(){
    (mapboxgl1 as any).accessToken = environment.mapboxKey;
    var lng = -32.983362;//position.coords.longitude;
    var lat = 13.389046;//position.coords.latitude;
    this.mapa = new mapboxgl1.Map({
      container: 'map1', // container id
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat], // starting position lng lat
      zoom: 2 // starting zoom
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
      var y = document.getElementById("credit");
      y.style.backgroundColor ="rgba(0,0,0,0.1)";
      this.card = false;
    }
  }

  pay2(content,state:boolean){
    var x = document.getElementById("credit");
    if (this.card){
      this.card=false;
      x.style.backgroundColor ="rgba(0,0,0,0.1)";
    }
    else{
      this.card = true;
      this.openVerticallyCentered(content,state);
      x.style.backgroundColor ="rgba(50,190,143,0.5)";
      var y = document.getElementById("cash");
      y.style.backgroundColor ="rgba(0,0,0,0.1)";
      this.cash = false;
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
    if (this.validateData()){
      this.calculetPay();
    }
    else{
      
    }
  }

  validateData(){
    if (!this.verifyList()){
      alert("Ingrese al menos un tipo de material a enviar.");
      this.loading = false;
      return false;
    }
    else if (!this.cash && !this.card){
      alert("Ingrese un tipo de pago.");
      this.loading = false;
      return false;
    }
    else{
      return true;
    }
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(()=>resolve(), ms)).then(()=>console.log("fired")); 
  }

  //Método que abre el modal
  openVerticallyCentered(content,state:boolean) {
    this.info = state;
    this.modalService.open(content, { centered: true });
  }

  createMarker(lng:any,lat:any,img:string,msj:string){
    var im = document.createElement("img");
    im.src = img;
    im.style.width = "25px";
    im.style.height = "25px";
    if (msj==="Estoy aquí"){
      im.style.width = "30px";
      im.style.height = "30px";
      im.style.borderRadius = "50%";
    }
    var popup = new mapboxgl1.Popup({ offset: 25 }).setHTML(msj);
    new mapboxgl1.Marker(im)
      .setLngLat([lng,lat])
      .setPopup(popup)
      .addTo(this.mapa);
  }

  createRoute(start:any,end:any,mapa:any){
    var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] +
    ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + environment.mapboxKey;
    this.http.get(url).subscribe(res=>{
      var data = res["routes"][0];
      var route = data.geometry.coordinates;
      var geojson  = {
        type: 'Feature' as const,
        properties: {},
        geometry: {
          type: 'LineString' as const,
          coordinates: route
        }
      };
      if (mapa.getSource("route")){
        var r = mapa.getSource('route') as mapboxgl1.GeoJSONSource;
        r.setData(geojson);
      }
      else{
        mapa.addLayer({
          id:"route",
          type: "line",
          source: {
            type : "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: geojson.geometry.coordinates
              }
            } 
          },
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint:{
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75
          }
        });
      }
    });
  }

  calculetPay(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position:Position)=>{
        this.lng = position.coords.longitude;
        this.lat = position.coords.latitude;
        var url = "https://api.mapbox.com/directions-matrix/v1/mapbox/driving/"+"-83.03168162521428"+","+"9.987411215113582"+";"+this.lng+","+this.lat+"?sources=1&annotations=distance,duration&access_token="+environment.mapboxKey;
        this.http.get(url).subscribe(res=>{
          var distance = res["distances"][0][0]/1000;
          var cut = parseFloat(distance.toFixed(2));
          var total = cut*0.6+1.5+"$";
          var retVal = confirm("Total a pagar "+total);
          console.log(retVal);
          if(retVal) {
            this.animationMap();
          }
          else {
            this.loading = false;  
          }
        });
      });
    }
    else{
      alert("No se ha podido obtener la dirección actual");
      this.loading = false;
      return 0;
    }
  }

  animationMap(){
    this.delay(300).then(res=>{
      this.showBox = false;
      var lng = this.lng;
      var lat = this.lat;
      this.mapa.flyTo({
        zoom: 13.2,
        center: [lng,lat],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
      this.mapa.addControl(new mapboxgl1.NavigationControl());
      var email = localStorage.getItem("mail");
      this.apt2.getUserByEmail(email).subscribe(dato=>{
        var photo = dato[0].urlFoto;
        var msj = "Estoy aquí";
        this.createMarker(lng,lat,photo,msj);
      });
      var lng1 = -83.03168162521428;
      var lat1 = 9.987411215113582;
      this.createMarker(lng1,lat1,"https://image.flaticon.com/icons/svg/1554/1554633.svg","Voy de camino");
      this.createRoute([lng,lat],[lng1,lat1],this.mapa);
    });
  }

}
