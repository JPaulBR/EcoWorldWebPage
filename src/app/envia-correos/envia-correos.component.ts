import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-envia-correos',
  templateUrl: './envia-correos.component.html',
  styleUrls: ['./envia-correos.component.scss']
})
export class EnviaCorreosComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<EnviaCorreosComponent>,
    @Inject(MAT_DIALOG_DATA) public message:string) { }

  ngOnInit(): void {
  }

  sendMessage(email:string,msj:string){
    //this.dialogRef.beforeClosed();
    this.dialogRef.close();
  }

}
