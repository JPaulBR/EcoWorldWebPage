import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CentrosComponent implements OnInit {

  imagenes=[
    {a:"assets/imagenes/botella1.png",material:"Plástico",img:"botella"},
    {a:"assets/imagenes/papel1.png",material:"Papel",img:"papel"},
    {a:"assets/imagenes/lata1.png",material:"Aluminio",img:"lata"},
    {a:"assets/imagenes/vidrio1.png",material:"Vidrio",img:"vidrio"},
    {a:"assets/imagenes/tetra1.png",material:"Tetra pack",img:"tetra"},
    {a:"assets/imagenes/bateria1.png",material:"Batería",img:"bateria"}
  ]
  mostrar=false;
  tabla = true;
  agregar = false;
  constructor() { }

  ngOnInit(): void {
    
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
  }

  openTable(){
    this.tabla = true;
    this.mostrar = false;
    this.agregar = false;
    this.clearList();
  }

  openAdd(){
    this.agregar = true;
    this.tabla = false;
    this.mostrar = false;
    this.clearList();
  }

  clearList(){
    for (var i=0;i<6;i++){
      var swap = this.imagenes[i]["img"];
      var path = "assets/imagenes/"+swap+"1"+".png";
      this.imagenes[i]["a"]=path;      
    }    
  }

}
