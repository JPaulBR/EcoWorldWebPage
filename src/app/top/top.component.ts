import { Component, OnInit } from '@angular/core';
import { User } from '../tablas/usuarios/usuario';
import { UsuariosService } from '../tablas/usuarios/usuarios.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  users:any;
  loading:boolean;

  constructor(private apt: UsuariosService) { }

  ngOnInit(): void {
    this.loading = true;
    this.apt.getUserByOrder().subscribe(res=>{
      this.users = res;
      this.loading = false;
    });
  }

}
