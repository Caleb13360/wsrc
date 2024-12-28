import { CommonModule, NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';

@Component({
  selector: 'app-account-creation',
  imports: [CommonModule, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css'
})
export class AccountCreationComponent {
 registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.registerForm = this.fb.group({
      accountName: ['', [Validators.required, Validators.minLength(3)]],
      terms: [false, Validators.requiredTrue],
      promotionalEmails: [false],
    });
  }

  redirect_uri: string = '';
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.redirect_uri = params['redirect_uri'];
    });
  }

  onSubmit() {
    this.router.navigate([ this.redirect_uri]);
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Handle form submission
    }
  }
}
