import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormulaireDeContactService} from "../_services/formulaire-de-contact.service";
import {catchError, throwError} from "rxjs";
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private formulaireDeContactService: FormulaireDeContactService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    let formulaireDeContactData = this.contactForm.getRawValue();
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.formulaireDeContactService.newContacts(formulaireDeContactData).pipe(
        catchError(error => {
          console.error('Une erreur est survenue lors de l\'envoi du formulaire de contact :', error);
          return throwError(error);  // ou afficher une notification d'erreur à l'utilisateur
        })
      ).subscribe(response => {
        console.log(response);
        // éventuellement réinitialiser le formulaire ici ou naviguer vers une autre page
      });
    }
  }
}
