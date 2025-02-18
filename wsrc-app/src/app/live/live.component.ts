import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';
@Component({
  selector: 'app-live',
  imports: [CommonModule],
  templateUrl: './live.component.html',
  styleUrl: './live.component.css'
})
export class LiveComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  isLive: boolean = false;
  ngOnInit(): void {
    this.apiService.isLiveStreaming().subscribe((data)=> {this.isLive=!data.includes("offline")});
  }
}
