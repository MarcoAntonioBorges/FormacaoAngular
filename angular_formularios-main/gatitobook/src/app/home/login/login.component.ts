import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.authenticate(this.username, this.password).subscribe({
      next: (success) => {
        this.router.navigate(['animals']);
      },
      error: (error) => {
        alert('User or Password is invalid.');
        console.error(error);
      },
    });
  }
}
