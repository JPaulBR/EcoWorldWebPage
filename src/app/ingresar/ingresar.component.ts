import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { UsuariosService } from '../tablas/usuarios/usuarios.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
  recEmail:string;
  process:boolean;

  constructor(private router: Router,private snackBar: MatSnackBar,
    private apt:UsuariosService,public dialogRef:MatDialogRef<IngresarComponent>,
    @Inject(MAT_DIALOG_DATA) public message:string, public afAuth:AngularFireAuth,
    private http:HttpClient,private firestore: AngularFirestore,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.iconPassword = "visibility_off";
    this.typePassword = "password";
    this.process = false;
  }

  logIn(page:string){
    if (this.email1 === undefined || this.password1===undefined){
      this.dialogRef.beforeClosed();
      this.openAlert("Campos vacíos");
    }
    else if (!this.validateEmail(this.email1)){
      this.dialogRef.beforeClosed();
      this.openAlert("Correo inválido");
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
    this.apt.getUserByEmail(this.email1).subscribe(res1=>{
      var pass=res1[0].contra;
      var decrypt = this.convertPassword(false,pass);
      if (decrypt===this.password1){
        this.apt.getUserByCredential(this.email1,pass).subscribe(res=>{
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
            this.openAlert("Usuario no existente")}
        });
      }
      else{
        this.dialogRef.beforeClosed();
        this.openAlert("Contraseña incorrecta");    
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
    var pass = this.convertPassword(true,this.password2);
    var flag = false;
    this.apt.getUserByEmail(email).subscribe(res=>{
      console.log(res.length);
      if (res.length===0){
        flag=true;
        this.apt.createPointsForUser(email);
        var listUser={
          nombre: this.name1,
          apellido: this.lastName1,
          email: this.email2,
          contra: pass,
          permiso:false,
          reciclado:0,
          urlFoto: "https://image.flaticon.com/icons/svg/1177/1177568.svg"
        }
        this.apt.addUser(listUser).then(res2=>{
          this.openSnackBar("Registrado exitosamente");
          this.clearData();
          this.dialogRef.close();
          //this.anotherPage(this.email2);
        });
      }
      else{
        if (!flag){
          this.dialogRef.beforeClosed();
          this.openAlert("Correo existente");
        }
      }
    });
  }

  convertPassword(type:boolean,password:string){
    if (type){
      var conversionEncryptOutput = CryptoJS.AES.encrypt(password.trim(), "nullnone").toString();
      return conversionEncryptOutput;
    }
    else{
      var conversionDecryptOutput = CryptoJS.AES.decrypt(password.trim(), "nullnone").toString(CryptoJS.enc.Utf8);
      return conversionDecryptOutput;
    }
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

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  sendEmailLocal(email:string){
    this.process = true;
    if (email===" " || email===undefined){
      alert("Ingrese un correo válido");
      this.process = false;
    }
    else{
      var data={
        email: email,
        password:"qwerty20"
      }
      var url = "http://192.168.1.11:3000/send-email";
      var flag = false;
      return this.http.post(url,data).subscribe(
        data=> {
          flag = true;
          alert("Se ha enviado el correo exitosamente");
          this.modalService.dismissAll();
          this.recEmail = " ";
          this.process = false;
        },
        err =>{
          if (!flag){
            console.log(err);
            this.modalService.dismissAll();
            this.recEmail = " ";
            this.process = false;
            alert("El servidor no está disponible");
          }
        }, () => {
          if (!flag){
            this.modalService.dismissAll();
            this.recEmail = " ";
            this.process = false;
            alert("El servidor no está disponible");
          }
        }
      );
    }
  }

  //This consume an api by firebase (is not working because it change the billing account);
  sendEmailByFirebase(name:string,email:string){
    var password = 'GENERATE_PASSWORD';
    this.firestore.collection('submit').add({name,email,password}).then(res=>{
      alert("Correo enviado exitosamente");
    }).catch(err=>console.log(err));
  }

}
