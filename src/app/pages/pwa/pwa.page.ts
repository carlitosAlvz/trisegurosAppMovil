import { Component, Inject, OnInit } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer } from "@angular/platform-browser"; 

@Component({
  selector: 'app-pwa',
  templateUrl: './pwa.page.html',
  styleUrls: ['./pwa.page.scss'],
})
export class PwaPage implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }
  user_id = ""
  user_token = ""
  path = ""
  pathDangerously:any
  ngOnInit() {
    this.user_id = localStorage.getItem("user_id")
    this.user_token = localStorage.getItem("user_token")
    this.path = 'https://triseguros.clubmaple.com/' + this.user_id + '/' + this.user_token
    this.pathDangerously= this.sanitizer.bypassSecurityTrustResourceUrl(this.path)
    alert(this.user_id+"/// "+this.user_token)
  }

}
