import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CentrosComponent implements OnInit {

  imagenes=[
    {a:"assets/imagenes/botella1.png"},
    {a:"assets/imagenes/papel1.png"},
    {a:"assets/imagenes/lata1.png"},
    {a:"assets/imagenes/vidrio1.png"},
    {a:"assets/imagenes/tetra1.png"},
    {a:"assets/imagenes/bateria1.png"}
  ]
  flag1;flag2;flag3;flag4;flag5;flag6=false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.imagenes[2]["a"]);
  }

  over(){
    console.log("Mouseover called");
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

}
