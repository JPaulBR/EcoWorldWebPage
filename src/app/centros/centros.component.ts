import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {EnviaCorreosComponent} from '../envia-correos/envia-correos.component';
import { UsuariosService } from '../tablas/usuarios/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CentrosComponent implements OnInit {

  mapa1:mapboxgl.Map;
  imagenes=[
    {a:"assets/imagenes/botella1.png",material:"Plástico",img:"botella"},
    {a:"assets/imagenes/papel1.png",material:"Papel",img:"papel"},
    {a:"assets/imagenes/lata1.png",material:"Aluminio",img:"lata"},
    {a:"assets/imagenes/vidrio1.png",material:"Vidrio",img:"vidrio"},
    {a:"assets/imagenes/tetra1.png",material:"Tetra pack",img:"tetra"},
    {a:"assets/imagenes/bateria1.png",material:"Batería",img:"bateria"}
  ]
  mostrar=false;
  tabla = false;
  agregar = false;
  permiso = false;
  dialogRef: MatDialogRef <any>;

  place:string;
  schedule:string;
  phone:string;

  constructor(private dialog: MatDialog, private apt:UsuariosService,private modalService: NgbModal) {

  }

  ngOnInit(): void {
    this.checkUser();
  }

  createMap(){
    (mapboxgl as any).accessToken = environment.mapboxKey;
    var lng = -83.04928633559825;//position.coords.longitude;
    var lat = 9.997193220089883;//position.coords.latitude;
    this.mapa1 = new mapboxgl.Map({
      container: 'map1', // container id
      style: 'mapbox://styles/mapbox/streets-v11', //9.997193220089883
      center: [lng, lat], // starting position lng lat
      zoom: 12 // starting zoom
    });
    this.mapa1.addControl(new mapboxgl.NavigationControl());
    this.addMarker(lng,lat);
  }

  addMarker(lng,lat){
    var marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa1);
    marker.on('drag',()=>{
      //this.latlng = marker.getLngLat().lng+','+marker.getLngLat().lat;
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
    this.createMap();
  }

  checkUser(){
    var email = localStorage.getItem("mail");
    this.apt.getUserByEmail(email).subscribe(dato=>{
      var permiso = dato[0].permiso;
      if (permiso){
        this.mostrar=false;
        this.tabla = true;
        this.agregar = false;
        this.permiso = false;        
      }
      else{
        this.mostrar=false;
        this.tabla = false;
        this.agregar = false;
        this.permiso = true;
      }
    });
  }

  openDialog(){
    this.dialogRef = this.dialog.open(EnviaCorreosComponent, {
      height: '42%',
      width: '47%',
      panelClass: ["centerDialog"]
    });
    this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
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
    }
    else{
      this.imagenes[i]["a"]=path;
    }
  }

  openTab(){
    this.tabla = false;
    this.mostrar = true;
    this.agregar = false;
    this.clearList();
    this.clearInputs();
  }

  openTable(){
    this.tabla = true;
    this.mostrar = false;
    this.agregar = false;
    this.clearList();
    this.clearInputs();
  }

  openAdd(){
    this.agregar = true;
    this.tabla = false;
    this.mostrar = false;
    this.clearList();
    this.clearInputs();
  }

  clearList(){
    for (var i=0;i<6;i++){
      var swap = this.imagenes[i]["img"];
      var path = "assets/imagenes/"+swap+"1"+".png";
      this.imagenes[i]["a"]=path;      
    }    
  }

  clearInputs(){
    this.place="";
    this.schedule="";
    this.phone="";
  }

  addCenter(){
    console.log("Agregado: "+this.schedule+" "+this.phone);
  }

  updateCenter(){
    console.log("Agregado: "+this.schedule+" "+this.phone);
  }

}
