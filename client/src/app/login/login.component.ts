import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@gmail\\.com$")]),
    password: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(10), Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%&]).{10,}$')]),
  });
  tooglePasswordType: boolean = false;
  loading: boolean = false;
  constructor(private toastr: ToastrService, private http: HttpService, private router: Router) {

  }
  ngOnInit() {
  }

  submitloginForm() {
    this.loading = true;
    let request = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    this.http.serviceCall('http://localhost:3000/api/login', request).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          this.toastr.success('Successfully logged in.');
          this.loginForm.reset();
          sessionStorage.setItem('userExits', JSON.stringify(value.userDetails))
          this.router.navigate(['/task-m/your-work'])
        } else {
          this.toastr.error("Sorry, We don't have any account regsitered with us")
        }
      },
      error: err => { this.loading = false; this.toastr.error("Opps, Something went wrong please try again after sometimes.") },
      complete: () => {
        this.loading = false;
      }
    })
  }
}
