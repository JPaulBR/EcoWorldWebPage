import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CentrosService } from '../tablas/centros/centros.service';
import { UsuariosService } from '../tablas/usuarios/usuarios.service';

@Component({
  selector: 'app-campanas',
  templateUrl: './campanas.component.html',
  styleUrls: ['./campanas.component.scss']
})
export class CampanasComponent implements OnInit {

  mapa:mapboxgl.Map;

  constructor(private http:HttpClient,private apt:CentrosService,private apt2:UsuariosService) { }

  ngOnInit(): void {
    this.getLocation();
  }

  getLocation(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position:Position)=>{
        if (position){
          (mapboxgl as any).accessToken = environment.mapboxKey;
          var lng = -83.04928633559825;//position.coords.longitude;
          var lat = 9.997193220089883;//position.coords.latitude;
          this.mapa = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v11', //9.997193220089883
            center: [lng, lat], // starting position lng lat
            zoom: 13.5 // starting zoom
          });
          this.mapa.addControl(new mapboxgl.NavigationControl());
          var start = [lng,lat];
          this.findUser(lng,lat);
          this.getCampaigns();
          this.createOriginDestiny(start);
        }
      },(error:PositionError)=>console.log(error));
    }
    else{
      console.log("No soportado");
    }
  }

  //cargarlo de la base
  findUser(lng,lat){
    var email = localStorage.getItem("mail");
    var photo:string;
    this.apt2.getUserByEmail(email).subscribe(res=>{
      photo= res[0].urlFoto;
      var msj = "Estoy aquí";
      this.createMarker(lng,lat,photo,msj);
    });
  }

  getCampaigns(){
    this.apt.getCampaigns().subscribe(res=>{
      res.forEach(element=>{
        var msj = '<strong>Horario: <p>'+element.horario+'</p></strong>'+'<strong>Teléfono: '+
        '<p>'+element.telefono+'</p></strong>';
        this.createMarker(element.long,element.lat,"https://image.flaticon.com/icons/svg/2371/2371819.svg",msj);
      })
    })
  }

  createMarker(lng:any,lat:any,img:string,msj:string){
    var im = document.createElement("img");
    im.src = img;
    im.style.width = "25px";
    im.style.height = "25px";
    im.style.borderRadius = "50%";
    var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(msj);
    new mapboxgl.Marker(im)
      .setLngLat([lng,lat])
      .setPopup(popup)
      .addTo(this.mapa);
  }

  createOriginDestiny(start:any){
    this.mapa.on("click",res=>{
      var coordsObj = res.lngLat;
      var coords = Object.keys(coordsObj).map(k=>{
        return coordsObj[k]
      });
      var end = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: coords
          }
        }]
      };
      this.createTableInformation(start,coords);
      this.createRoute(start,coords);  
    });
  }

  createTableInformation(start,end){
    var url = "https://api.mapbox.com/directions-matrix/v1/mapbox/driving/"+start[0]+","+start[1]+";"+end[0]+","+end[1]+"?sources=1&annotations=distance,duration&access_token="+environment.mapboxKey;
    this.http.get(url).subscribe(res=>{
      var distance = res["distances"][0][0]/1000;
      var time = res["durations"][0][0]/60;
      var overlay = document.getElementById('map-overlay');
      overlay.innerHTML = '';
      var title = document.createElement('strong');
      title.textContent ='Distancia: '+distance.toFixed(1)+" km";
      var population = document.createElement('div');
      population.textContent ='Duración (en vehículo): ' + time.toFixed(1)+" min";
      overlay.appendChild(title);
      overlay.appendChild(population);
      overlay.style.display = 'block';
    });
  }

  createRoute(start:any,end:any){
    //var end = [-83.03111606215913,9.998421359889164];
    console.log(start[0]+","+start[1]+";"+end[0]+"-"+end[1]);
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
      if (this.mapa.getSource("route")){
        var r = this.mapa.getSource('route') as mapboxgl.GeoJSONSource;
        r.setData(geojson);
      }
      else{
        this.mapa.addLayer({
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

}
