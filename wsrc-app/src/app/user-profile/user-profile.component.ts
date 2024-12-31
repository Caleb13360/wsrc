import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from './../../services/api';
import type {User} from '../../../../models/user.d.ts';

@Component({
  selector: 'app-user-profile',
  imports: [RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
    providers: [ApiService]
})
export class UserProfileComponent implements OnInit{
  constructor(private apiService: ApiService) {}
  user!: User;
  ngOnInit(): void {
    this.apiService.getCurrentUser().subscribe((data)=> {this.user=data.user});
  }
}
