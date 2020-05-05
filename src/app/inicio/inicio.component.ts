import { Component, OnInit } from '@angular/core';
import { MatDialog,MatDialogConfig, MatDialogClose } from '@angular/material/dialog';
import { IngresarComponent } from '../ingresar/ingresar.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(IngresarComponent);
  }

}
