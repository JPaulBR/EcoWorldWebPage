import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuariosService } from '../tablas/usuarios/usuarios.service';


@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.scss']
})
export class IngresarComponent implements OnInit {

  email1:string;
  password1:string;
  name1:string;
  lastName1:string;
  email2:string;
  password2:string;
  iconPassword:string;
  typePassword:string;


  constructor(private router: Router,private snackBar: MatSnackBar,
    private apt:UsuariosService) {}

  ngOnInit(): void {
    this.iconPassword = "visibility_off";
    this.typePassword = "password";
  }

  logIn(page:string){
    if (this.email1 === undefined || this.password1===undefined){
      this.openAlert("Campos vacíos");
    }
    else if (!this.validateEmail(this.email1)){
      this.openAlert("Correo inválido");
    }
    else if (!this.validatePassword(this.password1)){
      this.openAlert("Contraseña ocupa un mínimo de 6 carácteres");
    }
    else{
      this.existsUser(page);
    }
  }

  //validate the email
  validateEmail(email:string) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //validate the password
  validatePassword(password:string){
    if (password.length<6){
      return false;
    }
    else{
      return true;
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['color-snackbar']
    });
  }

  openAlert(message:string){
    alert(message);
  }

  existsUser(page:string){
    this.apt.getUserByCredential(this.email1,this.password1).subscribe(res=>{
      if (res.length>0){
        this.router.navigate(['/',page])
        let items="mail";
        localStorage.setItem(items,this.email1);
      }
      else{
        this.openAlert("Usuario no existente")
      }
    });
  }

  register(page:string){
    if (this.email2 === undefined || this.password2===undefined
      || this.name1=== undefined || this.lastName1===undefined){
      this.openAlert("Campos vacíos");
    }
    else if (!this.validateEmail(this.email2)){
      this.openAlert("Correo inválido");
    }
    else if (!this.validatePassword(this.password2)){
      this.openAlert("Contraseña ocupa un mínimo de 6 carácteres");
    }
    else{
      this.exitsUserWithEmail(page,this.email2);
    }
  }  

  exitsUserWithEmail(page:string,email:string){
    this.apt.getUserByEmail(email).subscribe(res=>{
      if (res.length===0){
        this.apt.createPointsForUser(email);
        var listUser={
          nombre: this.name1,
          apellido: this.lastName1,
          email: this.email2,
          contra: this.password2,
          permiso:false,
          reciclado:0,
          urlFoto: "https://image.flaticon.com/icons/svg/1177/1177568.svg"
        }
        this.apt.addUser(listUser).then(res=>{
          this.openSnackBar("Registrado exitosamente","Undo");
          this.clearData();
        });
      }
      else{
        this.openAlert("Correo existente");
      }
    });
  }

  clearData(){
    this.name1="";
    this.lastName1="";
    this.email2="";
    this.password2="";
    this.iconPassword="visibility_off";
    this.typePassword="password";
  }

  changeIcon(){
    if (this.iconPassword==="visibility_off"){
      this.iconPassword="visibility";
      this.typePassword="text";
    }
    else{
      this.iconPassword="visibility_off";
      this.typePassword="password";
    }
  }

  addInput(){
    console.log("Funciona");
  }

}
