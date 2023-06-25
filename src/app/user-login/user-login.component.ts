import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../_services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm !: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // getter pour un accès facile aux champs de formulaire
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // arrêtez-vous ici si le formulaire est invalide
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const email = this.loginForm.getRawValue().username
    const pass = this.loginForm.getRawValue().password
    this.usersService.login(email,
    pass)
      .subscribe(
        data => {
          this.router.navigate(['/chatMessage']);
        },
        error => {
          this.loading = false;
        });
  }
}
