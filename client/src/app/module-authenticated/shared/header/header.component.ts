import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails: any = [];

  ngOnInit(): void {
    let userName = sessionStorage.getItem('userExits');
    if (userName) {
      this.userDetails.push(JSON.parse(userName))
    }
    //   if (userName) {
    //     const indexOfNumber = userName.search(/\d/);
    //     if (indexOfNumber !== -1) {
    //       this.userName = userName.slice(0, indexOfNumber);
    //     } else {
    //       this.userName = userName
    //     }
    //   }
  }
}
