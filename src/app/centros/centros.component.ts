import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {EnviaCorreosComponent} from '../envia-correos/envia-correos.component';
import { UsuariosService } from '../tablas/usuarios/usuarios.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CentrosService } from '../tablas/centros/centros.service';
import { User } from '../tablas/usuarios/usuario';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CentrosComponent implements OnInit {

  mapa1:mapboxgl.Map;
  imagenes=[
    {a:"assets/imagenes/botella1.png",material:"Plástico",img:"botella",flag:false},
    {a:"assets/imagenes/papel1.png",material:"Papel",img:"papel",flag:false},
    {a:"assets/imagenes/lata1.png",material:"Aluminio",img:"lata",flag:false},
    {a:"assets/imagenes/vidrio1.png",material:"Vidrio",img:"vidrio",flag:false},
    {a:"assets/imagenes/tetra1.png",material:"Tetra pack",img:"tetra",flag:false},
    {a:"assets/imagenes/bateria1.png",material:"Batería",img:"bateria",flag:false}
  ]
  mostrar=false;
  tabla = false;
  agregar = false;
  permiso = false;
  dialogRef: MatDialogRef <any>;

  lat:any;
  lng:any;
  latlng: string;
  
  place:string;
  schedule:string;
  phone:string;

  key:string;

  urlAdress1: string = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  urlAdress2: string = ".json?access_token="+environment.mapboxKey;

  centers:any;

  user:string;

  notFound:boolean=false;
  found:boolean=false;

  userData:User;
  userPoints:any;

  plastic: number=0;
  alumn:number=0;
  paper:number=0;
  tetra:number=0;
  glass:number=0;
  batery:number=0;

  constructor(private dialog: MatDialog, private apt:UsuariosService,
    private modalService: NgbModal,private http:HttpClient,private snackBar: MatSnackBar,
    private apt2: CentrosService) {
      //this.notFound = false;
      //this.found = false;
  }

  ngOnInit(): void {
    this.checkUser();
    this.loadCenters();
  }

  loadCenters(){
    var email = localStorage.getItem("mail");
    this.apt2.getCampaignByUser(email).subscribe(res=>{
      this.centers = res;
    });
  }

  createMap(){
    if (this.agregar){
      if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position:Position)=>{
          this.lng = position.coords.longitude;
          this.lat = position.coords.latitude;
          this.generateMap(this.lng,this.lat);
        },(error:PositionError)=>console.log(error));
      }
      else{
        console.log("Ha ocurrido un error");
      }
    }
    else{
      this.generateMap(this.lng,this.lat);
    }
  }

  generateMap(lng,lat){
    (mapboxgl as any).accessToken = environment.mapboxKey;
    this.lng = lng;
    this.lat = lat;
    this.mapa1 = new mapboxgl.Map({
      container: 'map1', // container id
      style: 'mapbox://styles/mapbox/streets-v11', //9.997193220089883
      center: [this.lng, this.lat], // starting position lng lat
      zoom: 12 // starting zoom
    });
    this.mapa1.addControl(new mapboxgl.NavigationControl());
    this.addMarker(this.lng,this.lat);
  }

  addMarker(lng,lat){
    var marker = new mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa1);
    marker.on('drag',()=>{
      this.latlng = marker.getLngLat().lng+','+marker.getLngLat().lat;
    });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
    this.createMap();
  }

  checkUser(){
    var email = localStorage.getItem("mail");
    if (email===undefined || email === ""){
      this.openSnackBar("Ha ocurrido un error","snackbar");
      //sacarlo de la página
    }
    else{
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
      this.imagenes[i]["flag"]=true;
    }
    else{
      this.imagenes[i]["a"]=path;
      this.imagenes[i]["flag"]=false;
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
      this.imagenes[i]["flag"]=false;      
    }    
  }

  clearInputs(){
    this.place="";
    this.schedule="";
    this.phone="";
  }

  addCenter(){
    if (this.schedule==="" || this.schedule===undefined || this.phone=="" ||
    this.phone===undefined || this.place==="" || this.place===undefined){
      this.openSnackBar("No puede dejar campos vacíos","snackbar");
    }
    else if (!this.verifyList()){
      this.openSnackBar("Debe de ingresar al menos un tipo de material","snackbar");
    }
    else{
      var email = localStorage.getItem("mail");
      if (email===undefined || email === ""){
        //ha ocurrido un error
        //redirigir a la página de inicio
      }
      else{
        this.saveCenter(email);
      }
    }
  }

  saveCenter(email:string){
    var data={
      correoUsuario: email,
      lat: this.lat,
      long: this.lng,
      horario: this.schedule,
      telefono: this.phone,
      lugar: this.place,
      plastico: this.imagenes[0].flag,
      aluminio: this.imagenes[2].flag,
      papel: this.imagenes[1].flag,
      tetra: this.imagenes[4].flag,
      vidrio: this.imagenes[3].flag,
      bateria: this.imagenes[5].flag,
    }
    if (this.mostrar){
      this.apt2.updateCampaign(data,this.key).then(res=>{
        this.openSnackBar("Actualizado con éxito","snackbar2");
        this.loadCenters();
        this.openTable();
      });
    }
    else{
      this.apt2.addCampaign(data).then(res=>{
        this.openSnackBar("Agregado con éxito","snackbar2");
        this.loadCenters();
        this.openTable();
      });
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

  loadDataCenter(pos:number){
    this.openTab();
    this.key = this.centers[pos]["key"];
    this.place = this.centers[pos]["lugar"];
    this.schedule = this.centers[pos]["horario"];
    this.phone = this.centers[pos]["telefono"];
    this.loadMaterials(this.centers[pos]);
    this.lng = this.centers[pos]["long"];
    this.lat = this.centers[pos]["lat"];
  }

  loadMaterials(list){
    if (list["plastico"]){
      this.imagenes[0].a = "assets/imagenes/botella2.png"
      this.imagenes[0].flag = true;
    }
    if (list["papel"]){
      this.imagenes[1].a = "assets/imagenes/papel2.png"
      this.imagenes[1].flag = true;
    }
    if (list["aluminio"]){
      this.imagenes[2].a = "assets/imagenes/lata2.png"
      this.imagenes[2].flag = true;
    }
    if (list["vidrio"]){
      this.imagenes[3].a = "assets/imagenes/vidrio2.png"
      this.imagenes[3].flag = true;
    }
    if (list["tetra"]){
      this.imagenes[4].a = "assets/imagenes/tetra2.png"
      this.imagenes[4].flag = true;
    }
    if (list["bateria"]){
      this.imagenes[5].a = "assets/imagenes/bateria2.png"
      this.imagenes[5].flag = true;
    }
  }

  deleteCenter(){
    this.apt2.deleteCampaign(this.key).then(res=>{
      this.openSnackBar("Centro eliminado","snackbar");
      this.loadCenters();
      this.openTable();  
    });
  }

  savePlace(){
    //this.modal.close('Close click')
    this.getPlace()
    this.modalService.dismissAll();
  }

  getPlace(){
    var res = this.latlng.split(",");
    this.lng = res[0];
    this.lat = res[1];
    var adressCurl= this.urlAdress1+this.lng+","+this.lat+this.urlAdress2;
    this.http.get(adressCurl).subscribe(val=>{
      this.place = val['features'][1].place_name;
    });
  }

  openSnackBar(message: string,css:string) {
    this.snackBar.open(message, ' ', {
      panelClass: [css],
      duration: 2000
    });
  }

  modelChange(event){
    this.apt.getUserByEmail(this.user).subscribe(res=>{
      if (res.length>0){
        this.found = true;
        this.notFound = false;
        this.userData = res[0];
        this.apt.getUserByIdForPoints(this.user).subscribe(resp=>{
          this.userPoints = resp[0]
        });
      }
      else{
        this.notFound = true;
        this.found = false;
      }
    });
  }

  update(){
    if (this.sumatory()>0){
      var plastico = this.userPoints.cantPlastico+this.plastic;
      var alumino = this.userPoints.cantAluminio+this.alumn;
      var papel = this.userPoints.cantPaper+this.paper;
      var tetra = this.userPoints.cantTetra+this.tetra;
      var vidrio = this.userPoints.cantVidrio+this.glass;
      var bateria = this.userPoints.cantBateria+this.batery;
      var total = (this.sumatory())+this.userPoints.acumulado;
      var lista = {
        id: this.userPoints.id,
        cantPlastico: plastico,
        cantAluminio: alumino,
        cantPaper: papel,
        cantTetra: tetra,
        cantVidrio: vidrio,
        cantBateria: bateria,
        acumulado: total
      }
      this.apt.getUserByEmail(this.user).subscribe(res=>{
        res[0].reciclado = total;
        this.apt.updateUser(res[0],res[0].id);
      });
      this.apt.updatePointForUser(this.userPoints.key,lista);
      this.user = "";
      this.openSnackBar("Datos actualizados","snackbar2");
      this.clearNumbers();
    }
    else{
      this.openSnackBar("Sin cambios","snackbar");
    }
  }

  sumatory(){
    return this.plastic+this.alumn+this.paper+this.tetra+this.glass+this.batery;
  }

  clearNumbers(){
    this.plastic=0;
    this.alumn=0;
    this.paper=0;
    this.tetra=0;
    this.glass=0;
    this.batery=0;
  }

}
