import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../Ilogin';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: ILogin = { username: "Admin", password: "Admin@1234" };
  loginForm: FormGroup;
  message: string;

  constructor(private formBuilder: FormBuilder,private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.logout();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  
  login() {

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    else{
      if(this.f.username.value == this.model.username && this.f.password.value == this.model.password){
        console.log("Login successful");
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.f.username.value);
        this.router.navigate(['/dashboard']);
      }
      else{
        this.message = "Please check your username and password";
      }
    }    
}

}
