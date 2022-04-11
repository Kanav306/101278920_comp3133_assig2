
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  private LOGIN_POST = gql`
  mutation Mutation(
    $username: String!,
    $password: String!
    ) {
      login(
        username: $username,
        password: $password
      )
    }
`

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  })

  constructor(private apollo: Apollo, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  login() {
    let tempUsername = this.loginForm.get('username')?.value;
    let tempPassword = this.loginForm.get('password')?.value;

    console.log(tempUsername, tempPassword);

    this.apollo.mutate({
      mutation: this.LOGIN_POST,
      variables: {
        username: tempUsername,
        password: tempPassword
      }
    }).subscribe
}
}
