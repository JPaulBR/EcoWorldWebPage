import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { centros } from './centros';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CentrosService {

  listaCentros: AngularFirestoreCollection<centros>;
  centros: Observable<centros[]>;

  constructor(private db: AngularFirestore) {
    this.listaCentros = db.collection<centros>('centros');
    this.centros = this.listaCentros.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  getCampaign(id:string){
    return this.listaCentros.doc<centros>(id).valueChanges();
  }

  addCampaign(apt: any){
    return this.listaCentros.add(apt);
  }

  updateCampaign(apt:any, id:string){
    return this.listaCentros.doc(id).update(apt);
  }

  deleteCampaign(id:string){
    return this.listaCentros.doc(id).delete();
  }

  getCampaigns(){
    return this.centros;
  }

  getCampaignByUser(email: string){
    return this.db.collection<centros>('centros',ref => ref.where('correoUsuario', '==', email)).snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a =>{
          const data = a.payload.doc.data() as centros;
          const key = a.payload.doc.id;
          return {key, ...data};
        });
      }
    ));
  }


}
