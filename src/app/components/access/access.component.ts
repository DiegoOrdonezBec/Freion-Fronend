import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../shared/models/login-request';
import { SignupRequest } from '../shared/models/signup-request';
import { AuthService } from '../shared/service/auth.service';
import { TokenService } from '../shared/service/token.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { TokenDTO } from '../shared/models/tokenDTO';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})

export class AccessComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;
  loginRequest: LoginRequest;
  signupRequest: SignupRequest;
  name: string;
  username: string;
  email: string;
  password: string;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    if (this.tokenService.getToken()) {
      this.isLoading = true;
      this.validateToken(this.tokenService.getToken());
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loginRequest = new LoginRequest(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      );
      this.isLoading = true;

      this.authService.login(this.loginRequest).subscribe(
        data => {
          if (data.token) {
            this.tokenService.setToken(data.token);
            this.tokenService.setUsername(data.username);
            this.router.navigateByUrl('/home/board');
          } else {
            this.toastrService.error("USER OR PASSWORD WRONG");
          }
          this.isLoading = false;
        },
        err => {
          this.toastrService.error("SOMETHING WAS WRONG");
          this.isLoading = false;
        }
      );
    }
  }

  signup(): void {
    if (this.signupForm.valid) {
      this.signupRequest = new SignupRequest(
        this.signupForm.get('name').value,
        this.signupForm.get('username').value,
        this.signupForm.get('email').value,
        this.signupForm.get('password').value
      );
      this.isLoading = true;

      this.authService.signup(this.signupRequest).subscribe(
        data => {
          if (data.message == "CREATED SUCCESSFULLY") {
            this.toastrService.success(data.message);
          } else {
            this.toastrService.error(data.message);
          }
          this.isLoading = false;
        },
        err => {
          this.toastrService.error("SOMETHING WAS WRONG");
          this.isLoading = false;
        }
      );
    }
  }

  validateToken(token: string): void{
    this.authService.validateToken(new TokenDTO(token, "")).subscribe(
      data => {
        this.router.navigateByUrl('/home/board');
      },
      err => {
        this.isLoading = false;
        this.toastrService.error("SESSION EXPIRED, YOU NEED TO LOGIN AGAIN");
        this.tokenService.removeToken();
      }
    )
  }

}
