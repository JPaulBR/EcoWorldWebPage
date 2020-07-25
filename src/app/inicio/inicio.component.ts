import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig, MatDialogClose } from '@angular/material/dialog';
import { IngresarComponent } from '../ingresar/ingresar.component';
import { UsuariosService } from '../tablas/usuarios/usuarios.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  myDate = new Date();
  comentary:string;
  user:string;
  disabled:boolean=false;

  constructor(private dialog: MatDialog, private apt:UsuariosService,private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(IngresarComponent);
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
