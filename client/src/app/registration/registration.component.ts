import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(10), Validators.pattern("^[a-zA-Z]+[ ]+[a-zA-Z]+$")]),
    password: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.minLength(10), Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%&]).{10,}$')]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@gmail\\.com$")]),
    mobile: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[789]\\d{9}$')]),
  });

  OTPForm = new FormGroup({
    OTP: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{6,6}$")]),
  });
  tooglePasswordType: boolean = false;
  showOTPScreen: boolean = false;
  registeredEmail!: string;
  loading: boolean = false;
  isresendOTP: boolean = false
  OTPResendinterval: any;
  OTPResendCount: number = 60;
  constructor(private toastr: ToastrService, private http: HttpService, private router: Router) {

  }
  ngOnInit() {
    // this.startTimer()
  }
  submitRegistrationForm() {
    this.loading = true;
    let request = {
      email: this.registrationForm.value.email,
      OTP: this.OTPForm.value.OTP,
    }


    this.http.serviceCall('http://localhost:3000/api/verifyOTP', request).pipe(
      debounceTime(1000)
    ).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200 && value.message === "Registration sucessfully") {
          this.toastr.success('Account has been successfully registered, please begin with login.');
          this.router.navigate(['/login'])
        } else {
          this.toastr.error('Sorry, Entered OTP is invalid.')

        }
      },
      error: err => { this.loading = false; this.toastr.error("Opps, Something went wrong please try again after sometimes.") },
      complete: () => { this.OTPForm.reset(); this.loading = false; }
    })
  }

  sendOTP(from:any) {
    this.loading = true;
    let request = {
      fullName: this.registrationForm.value.fullName,
      password: this.registrationForm.value.password,
      email: this.registrationForm.value.email,
      mobile: this.registrationForm.value.mobile
    }
    this.http.serviceCall('http://localhost:3000/api/registration', request).subscribe({
      next: (value: any) => {
        if (value.statusCode == 200) {
          if (this.registrationForm.value.email !== '' || this.registrationForm.value.email !== undefined || this.registrationForm.value.email !== null) {
            this.registeredEmail = this.registrationForm.value.email || '';
            this.showOTPScreen = true
            if(from==="resendOTP"){
              this.isresendOTP = false;
              this.OTPResendCount = 60;
            }
            this.startTimer();
          }
        } else {
          this.toastr.error('Sorry, Your account is already registered with us')
        }
      },
      error: err => { this.loading = false; this.toastr.error("Opps, Something went wrong please try again after sometimes.") },
      complete: () => { this.loading = false }

    })
  }
  formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60); const seconds = timeInSeconds % 60; return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  startTimer() {
    this.OTPResendinterval = setInterval(() => {
      this.OTPResendCount <= 0 ? (clearTimeout(this.OTPResendinterval), this.OTPResendCount = 0, this.isresendOTP = true) : this.OTPResendCount--;
    }, 1000)
  }
}

// {
//   "fullName": "Sagar Devendra",
//   "password": "Password@1234",
//   "email": "sagar.selvaraj059@gmail.com",
//   "mobile": 9372925369
// }
