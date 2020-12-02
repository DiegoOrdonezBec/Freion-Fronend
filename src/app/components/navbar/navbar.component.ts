import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/service/auth.service';
import { TokenService } from '../shared/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.authService.logout().subscribe(
      data => {
        this.tokenService.removeToken();
        this.router.navigateByUrl("/login");
      },err => {
        this.tokenService.removeToken();
        this.router.navigateByUrl("/login");
      }
    );
  }

}
