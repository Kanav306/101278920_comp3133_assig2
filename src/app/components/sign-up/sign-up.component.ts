import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

interface roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  [x: string]: any;
  signUpError: string = '';
  types: roles[] = [
    { viewValue: 'customer', value: 'customer' },
    { viewValue: 'administrator', value: 'admin' },
  ];
  signupForm = this['formBuilder'].group({
    type: [null, [Validators.required]],
    username: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]],
  });
  SIGNUP_POST: any;

  constructor(private router: Router, private apollo: Apollo) { }


  ngOnInit(): void {}
  get type() {
    return this.signupForm.get('type');
  }
  get username() {
    return this.signupForm.get('username');
  }
  get firstname() {
    return this.signupForm.get('firstname');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get lastname() {
    return this.signupForm.get('lastname');
  }

  onSubmit() {
    this.apollo.mutate({
      mutation: this.SIGNUP_POST,
      variables: {
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        email: this.email,
        type: this.type,
      }
    }).subscribe((res: any) => {
      console.log('signup', res.data)
      this.router.navigate(['/login'])
    }, (err: { message: any; }) => {
      alert(err.message);
    })
  }
}
