import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../tablas/usuarios/usuarios.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  fills=[{value:" ",label:"Nombre",disable:false,type:"text",icon:false},
        {value:" ",label:"Apellido",disable:false,type:"text",icon:false},
        {value:" ",label:"Correo",disable:true,type:"text",icon:false},
        {value:" ",label:"Contraseña",disable:false,type:"password",icon:true}
  ];
  iconPassword = "visibility_off";
  buttonDisabled:boolean=false;
  key:string;
  image="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Crystal_Clear_kdm_user_male.svg/1200px-Crystal_Clear_kdm_user_male.svg.png";
  changeImage:boolean=false;
  permiso:boolean;
  reciclado:number;
  materials=[
    {img:"assets/imagenes/botella3.png",label:"Plástico",value:0},
    {img:"assets/imagenes/papel3.png",label:"Papel",value:0},
    {img:"assets/imagenes/lata3.png",label:"Aluminio",value:0},
    {img:"assets/imagenes/vidrio3.png",label:"Vidrio",value:0},
    {img:"assets/imagenes/tetra3.png",label:"Tetra pack",value:0},
    {img:"assets/imagenes/bateria3.png",label:"Batería",value:0}
  ]

  constructor(private apt:UsuariosService,private storage: AngularFireStorage,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.updateList();
    this.loadData();
  }

  updateList(){
    var email = localStorage.getItem("mail");
    this.apt.getUserByIdForPoints(email).subscribe(res=>{
      if (res.length>0){
        this.materials[0].value = Number(res[0].cantPlastico.toFixed(2));
        this.materials[1].value = Number(res[0].cantAluminio.toFixed(2));
        this.materials[2].value = Number(res[0].cantPaper.toFixed(2));
        this.materials[3].value = Number(res[0].cantTetra.toFixed(2));
        this.materials[4].value = Number(res[0].cantVidrio.toFixed(2));
        this.materials[5].value = Number(res[0].cantBateria.toFixed(2));
      }
    });
  }

  loadData(){
    var email = localStorage.getItem("mail");
    this.apt.getUserByEmail(email).subscribe(val=>{
      this.key = val[0].key;
      this.fills[0].value = val[0].nombre;
      this.fills[1].value = val[0].apellido;
      this.fills[2].value = val[0].email;
      this.fills[3].value = val[0].contra;
      this.image = val[0].urlFoto;
      this.permiso = val[0].permiso;
      this.reciclado = val[0].reciclado;
    });
  }

  showPreviewImage(event:any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
          this.image = event.target.result;
          this.changeImage = true;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  subirImagen(ide:string){
    const file = this.image;
    const filePath = 'imagenes/'+ide;
    const ref = this.storage.ref(filePath);
    const task = ref.putString(file,'data_url',{contentType: 'image/jpeg'}).snapshotChanges().toPromise().then(_ =>{
      ref.getDownloadURL().toPromise().then(res =>{
        this.image = res.toString();
      });
    });
  }

  updateData(){
    this.buttonDisabled = true;
    if (this.fills[0].value===" " || this.fills[1].value ===" " || this.fills[3].value===undefined){
      alert("No puede dejar espacios en blanco.");
      this.buttonDisabled = false;
    }
    else{
      if (this.changeImage){
        this.subirImagen(this.image);
      }
      var lista = {
        nombre : this.fills[0].value,
        apellido : this.fills[1].value,
        email : this.fills[2].value,
        contra : this.fills[3].value,
        urlFoto : this.image,
        permiso : this.permiso,
        reciclado : this.reciclado  
      }
      this.apt.updateUser(lista,this.key).then(res=>{
        this.openSnackBar("Realizado");
        this.buttonDisabled = false;
      }).catch(res=>{
        alert("Ha ocurrido un error "+res);
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, ' ', {
      panelClass: ["snackbar"],
      duration: 2000
    });
  }

  changeIcon(){
    if (this.iconPassword==="visibility_off"){
      this.iconPassword="visibility";
      this.fills[3].type="text";
    }
    else{
      this.iconPassword="visibility_off";
      this.fills[3].type="password";
    }
  }

}