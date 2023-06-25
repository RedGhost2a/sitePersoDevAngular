import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../_services/users.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private fb : FormBuilder,
              private userService :UsersService)
  {this.userForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    nickname: [''],
    dateOfBirth: [''],
    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      country: [''],
      zip: ['']
    }),
    webSite: [''],
    avatar: [''],
    // ajoutez ici d'autres champs si nécessaire
  }); }

  ngOnInit(): void {
  }
  onSubmit() {
    const value = this.userForm.getRawValue()
    if (this.userForm.valid) {
      console.log(this.userForm.value);

      this.userService.createUser(value).subscribe(data=>{
        console.log(data)
      })
    }
  }
}
