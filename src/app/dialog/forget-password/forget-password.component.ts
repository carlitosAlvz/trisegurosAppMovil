import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {

  constructor(public dialogref:MatDialogRef<ForgetPasswordComponent>,
     @Inject(MAT_DIALOG_DATA) public message:string) { }

  ngOnInit() {}

  onClickNO(){
    this.dialogref.close();
  }

}
