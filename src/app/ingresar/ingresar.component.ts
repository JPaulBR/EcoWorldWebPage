import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { UsuariosService } from '../tablas/usuarios/usuarios.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { HttpClient } from '@angular/common/http';


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
    private apt:UsuariosService,public dialogRef:MatDialogRef<IngresarComponent>,
    @Inject(MAT_DIALOG_DATA) public message:string, public afAuth:AngularFireAuth,private http:HttpClient) {}

  ngOnInit(): void {
    this.iconPassword = "visibility_off";
    this.typePassword = "password";
  }

  logIn(page:string){
    if (this.email1 === undefined || this.password1===undefined){
      this.dialogRef.beforeClosed();
      this.openAlert("Campos vacíos");
    }
    else if (!this.validateEmail(this.email1)){
      this.dialogRef.beforeClosed();
      this.openAlert("Correo inválido");
      //this.openSnackBar("Correo inválido")
    }
    else if (!this.validatePassword(this.password1)){
      this.dialogRef.beforeClosed();
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

  openSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.panelClass = 'center-snackbar';
    config.duration = 2000;
    this.snackBar.open(message,"",config);
  }

  openAlert(message:string){
    alert(message);
  }

  existsUser(page:string){
    this.apt.getUserByCredential(this.email1,this.password1).subscribe(res=>{
      if (res.length>0){
        let items="mail";
        localStorage.setItem(items,this.email1);
        this.router.navigate(['/',page]).then(res=>{
          this.dialogRef.close();
        }).then(r=>{
          this.openSnackBar("Ingreso exitoso");          
        });
      }
      else{
        this.dialogRef.beforeClosed();
        this.openAlert("Usuario no existente")
      }
    });
  }

  register(page:string){
    if (this.email2 === undefined || this.password2===undefined
      || this.name1=== undefined || this.lastName1===undefined){
        this.dialogRef.beforeClosed();
        this.openAlert("Campos vacíos");
    }
    else if (!this.validateEmail(this.email2)){
      this.dialogRef.beforeClosed();
      this.openAlert("Correo inválido");
    }
    else if (!this.validatePassword(this.password2)){
      this.dialogRef.beforeClosed();
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
          this.openSnackBar("Registrado exitosamente");
          this.clearData();
        });
      }
      else{
        this.dialogRef.beforeClosed();
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

  loginFacebook(){
    this.afAuth.signInWithPopup(new auth.FacebookAuthProvider()).then(res=>{
      var email = res.user.email;
      var nameComplete = res.user.displayName;
      var separator = nameComplete.split(" ");
      var name = separator[0];
      var last_name = separator[separator.length-1];
      this.apt.getUserByEmail(email).subscribe(res1=>{
        if(res1.length===0){
          this.apt.createPointsForUser(email);
          var listUser={
            nombre: name,
            apellido: last_name,
            email: email,
            contra: "YOUR_PASSWORD_FACEBOOK",
            permiso:false,
            reciclado:0,
            urlFoto: "https://image.flaticon.com/icons/svg/1177/1177568.svg"
          }
          this.apt.addUser(listUser).then(res2=>{
            this.openSnackBar("Registrado exitosamente");
            this.clearData();
            this.anotherPage(email);
          });
        }
        else{
          this.clearData();
          this.anotherPage(email);      
        }
      });
    });
  }

  anotherPage(email:string){
    let items="mail";
    localStorage.setItem(items,email);
    this.router.navigate(['/','menu']).then(res=>{
      this.dialogRef.close();
    }).then(r=>{
      this.openSnackBar("Ingreso exitoso");          
    }); 
  }

}
