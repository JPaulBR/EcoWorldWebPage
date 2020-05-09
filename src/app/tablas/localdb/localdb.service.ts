import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocaldbService {

  constructor(private http:HttpClient) {
    this.getInfo();
  }

  getInfo(){
    var path="app/assets/localdb.txt"
    this.http.get(path).subscribe(res=>{
      console.log(res)
    });
  }

}
