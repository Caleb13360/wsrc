import { CommonModule, NgIf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-account-creation',
  imports: [CommonModule, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css',
    providers: [ApiService]
})
export class AccountCreationComponent {
 registerForm: FormGroup;
 verifiedId: number | undefined;
 verifiedName: string | undefined;
 verifying: boolean = false;
 noUserFound: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    this.registerForm = this.fb.group({
      accountName: [''],
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

  verifyUsername() {
    this.verifying = true;
    const accountNameControl = this.registerForm.get('accountName');
    if (accountNameControl) {
    this.apiService.checkUsername(accountNameControl.value).subscribe(
      (data) => {
        if (data) {
          this.verifiedId = data.id;
          this.verifiedName = data.name;
        }
          this.noUserFound = this.verifiedId===undefined&&this.verifiedName===undefined;
        
        this.verifying = false;
      },
      (error) => {
        console.error('Error checking username:', error);
        this.verifying = false;
      }
    )
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid && this.verifiedName!==undefined) {
      this.apiService.linkUser({...this.registerForm.value, accountName: this.verifiedName}).subscribe(
        () => {
          this.router.navigate([this.redirect_uri]);
        },
        (error) => {
          console.error('Error linking user:', error);
        }
      );
    }
  }

}
