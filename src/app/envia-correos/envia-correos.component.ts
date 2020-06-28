import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-envia-correos',
  templateUrl: './envia-correos.component.html',
  styleUrls: ['./envia-correos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EnviaCorreosComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<EnviaCorreosComponent>,
    @Inject(MAT_DIALOG_DATA) public message:string,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  sendMessage(email:string,msj:string){
    //this.dialogRef.beforeClosed();
    this.dialogRef.close();
    this.openSnackBar("Mensaje enviado exitosamente");
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Ok', {
      panelClass: ["snackbar"],
      duration: 2000
    });
  }

}
