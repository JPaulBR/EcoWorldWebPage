import { Injectable } from '@angular/core';
import { User } from './usuario';
import {AngularFirestoreCollection, AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  listaUsuarios: AngularFirestoreCollection<User>;
  usuarios: Observable<User[]>;

  constructor(private db2: AngularFirestore) {
    this.listaUsuarios = db2.collection<User>('usuario');
    this.usuarios = this.listaUsuarios.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  getUsers(){
    return this.usuarios;
  }

  addcomments(msj:any){
    var listaComentarios = this.db2.collection<any>('comentarios');
    return listaComentarios.add(msj);
  }

  addRequest(req:any){
    var request = this.db2.collection<any>('solicitudes');
    return request.add(req);
  }

  addUser(apt:any){
    return this.listaUsuarios.add(apt);
  }

  updateUser(apt:any, id:string){
    return this.listaUsuarios.doc(id).update(apt);
  }

  deleteUser(id:string){
    return this.listaUsuarios.doc(id).delete();
  }

  getUserByCredential(email:string,password:string){
    var listaUsuarios = this.db2.collection<any>('usuario',ref => ref.where('email', '==', email).where('contra', '==', password));
    var usuarios = listaUsuarios.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
    return usuarios;
  }

  getUserByEmail(email:string){
    var listaUsuarios = this.db2.collection<User>('usuario',ref => ref.where('email', '==', email));
    var usuarios = listaUsuarios.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as User;
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
    return usuarios;
  }

  createPointsForUser(email:string) {
    var lista = this.db2.collection<any>('puntosXusuario');
    var update = {
      id: email,
      cantAluminio: 0,
      cantBateria: 0,
      cantPaper: 0,
      cantPlastico: 0,
      cantTetra: 0,
      cantVidrio:0,
      acumulado: 0
    };
    return lista.add(update);
  }

  getUserByOrder(){
    return this.db2.collection<any>('usuario',ref => ref.orderBy('reciclado','desc').where("reciclado",">",0).limit(50)).snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as User;
          const key = a.payload.doc.id;
          return {key, ...data};
        });
      }
    ));
  }

  getUserByIdForPoints(id:string){
    return this.db2.collection<any>('puntosXusuario',ref => ref.where('id', '==', id)).snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const key = a.payload.doc.id;
          return {key, ...data};
        });
      }
    ));
  }

  updatePointForUser(id:string,update:any){
    var lista = this.db2.collection<any>('puntosXusuario');
    return lista.doc(id).update(update);
  }

}
