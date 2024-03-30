import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-prelogin',
  templateUrl: './prelogin.component.html',
  styleUrls: ['./prelogin.component.css']
})
export class PreloginComponent implements OnInit {
  showRegisterComponent: boolean = false;
  showLoginComponent: boolean = false;
  constructor(private router: Router) {

  }

  ngOnInit() {
    // if(this.router.url/)
    if (this.router.url === "/register") {
      this.showRegisterComponent = true;
    } else {
      this.showLoginComponent = true;
    }
  }

}
