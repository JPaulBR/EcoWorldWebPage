import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../tablas/usuarios/usuarios.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  myDate = new Date();
  comentary:string;
  user:string;
  disabled:boolean=false;

  constructor(private apt:UsuariosService,private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  sendComentary(){
    this.disabled = true;
    if (this.user=== " " || this.user===undefined || this.comentary === " " || this.comentary===undefined){
      alert("Ingrese todos los datos");
      this.disabled = false;
    }
    else{
      var myDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy hh:MM:ss');
      var lista = {
        comentario: this.comentary,
        fecha: myDate,
        usuario: this.user 
      }
      this.apt.addcomments(lista).then(resp=>{
        this.comentary=" ";
        this.user = " ";
        this.disabled = false;
        alert("Gracias por su comentario :)");
      });
    }
  }

}
