import { distinctUntilChanged, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.verifyservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<number>;
  authService: any;
  loggedIn: any;
  isAdmin: any;

  constructor(

    private readonly router: Router
  ) {
    this.isLoggedIn$ = AuthService.authenticated$;
  }

  ngOnInit(): void { this.authService.getIsAuthenticated()
    .pipe(distinctUntilChanged())
    .subscribe((getIsAuthenticated: any) => {
      this.loggedIn = getIsAuthenticated});
      this.authService.getIsAdmin()
      .pipe(distinctUntilChanged())
      .subscribe((data: any) => {
        this.isAdmin = data
        console.log("Admin Check ", this.isAdmin)
      });
    }
  onCustomerLogout() {
    this.authService.logout();
  }

  onAdminLogout() {
    this.authService.logout();
  }

  isNotSignInRoute() {
    return this.router.url !== '/login';
  }

  isNotSignUpRoute() {
    return this.router.url !== '/signup';
  }
}
