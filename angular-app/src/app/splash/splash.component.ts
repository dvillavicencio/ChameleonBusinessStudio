import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(private http: HttpClient, private matIconRegistry: MatIconRegistry, private domSanitizer : DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      "calendar",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons8-calendar.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `github`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons8-github.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'instagram',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons8-instagram.svg")
    );
    http.get<{content: string}>("/custom/splash").subscribe((obj: {content: string})=>{
      const e = <HTMLElement>document.querySelector("#splash");
      e.innerHTML = obj.content; // replace element content
    });
  }


  ngOnInit(): void {
  }

}
