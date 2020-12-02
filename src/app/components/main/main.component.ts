import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenDTO } from '../shared/models/tokenDTO';
import { AuthService } from '../shared/service/auth.service';
import { TokenService } from '../shared/service/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) { 
    if(this.tokenService.getToken()){
      this.validateToken(this.tokenService.getToken());
    }else{
      this.router.navigateByUrl("/");
    }
  }

  ngOnInit(): void {
  }

  validateToken(token: string): void{
    this.authService.validateToken(new TokenDTO(token, "")).subscribe(
      data => {
        
      },
      err => {
        this.tokenService.removeToken();
        this.router.navigateByUrl("/");
      }
    )
  }

}
