import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  fills=[{value:"Jean Paul",label:"Nombre"},
        {value:"Barrit",label:"Apellido"},
        {value:"jpaulbr97@gmail.com",label:"Correo"},
        {value:"*********",label:"Contraseña"}
  ];
  materials=[
    {img:"assets/imagenes/botella3.png",label:"Plástico",value:"0 kg"},
    {img:"assets/imagenes/papel3.png",label:"Papel",value:"0 kg"},
    {img:"assets/imagenes/lata3.png",label:"Aluminio",value:"0 kg"},
    {img:"assets/imagenes/vidrio3.png",label:"Vidrio",value:"0 kg"},
    {img:"assets/imagenes/tetra3.png",label:"Tetre pack",value:"0 kg"},
    {img:"assets/imagenes/bateria3.png",label:"Batería",value:"0 kg"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
