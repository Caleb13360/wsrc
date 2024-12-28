import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { ApiService } from './../../services/api';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [ApiService]
})
export class LoginComponent implements OnInit{
  constructor(private apiService: ApiService, private _ngZone: NgZone, private router: Router) {}
  ngOnInit(): void {
    if(window.google && window.google){
      this.loginWithGoogleInitialise();
    } else {
      //@ts-ignore
    window.onGoogleLibraryLoad = () => {
      this.loginWithGoogleInitialise();
    };
    }
  
  } 

  loginWithGoogleInitialise(){
    //@ts-ignore
      window.google.accounts.id.initialize({
        client_id: '18247517896-34lvatidm7uj9orvsf4cc7cffhp2ujhc.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      //@ts-ignore
      google.accounts.id.renderButton(document.getElementById('google-button'), {theme: 'outline', size: 'large', width: '100%'});
      //@ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
  }

  async handleCredentialResponse(response: CredentialResponse) {
    await this.apiService.loginWithGoogle(response.credential).subscribe((data) => {
      this._ngZone.run(() => {
        this.router.navigate(['/']);
      })}, (error) => {
        console.log(error);
      });
  }
}
