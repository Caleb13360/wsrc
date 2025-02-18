import { CommonModule } from '@angular/common';
import { OnInit, Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Race } from '@models/race';
import { filter } from 'rxjs/operators';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiService) {}
  title = 'wsrc-app';
     menuVisible = false;
      isHeaderHidden = false; // Tracks if the header is hidden
  lastScrollY = 0; // Tracks the last scroll position
  showFooter: boolean = true;
  countdown = {
    days: '?',
    hours: '?',
    minutes: '?',
    seconds: '?'
  };
  race!: Race;
  intervalId: any;
  isLive: boolean = false;

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  pressToggleMenu() {
    if(this.menuVisible){
        this.menuVisible = !this.menuVisible;
    }
    
  }
   

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScrollY = window.scrollY;

      if (this.menuVisible) {
    this.pressToggleMenu(); // Close the menu if it is open
  }

    if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
      // Scrolling down and past a threshold
      this.isHeaderHidden = true;
      
    } else {
      // Scrolling up
      this.isHeaderHidden = false;
    }

    this.lastScrollY = currentScrollY;
  }

  private updateCountdown(): void {
    if(!this.race){return;}
    const now = new Date().getTime();
    const launchTime = new Date(this.race.launch_time).getTime();
    const distance = launchTime - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.countdown = {
      days: days.toString(),
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  }

  ngOnInit() {
    this.apiService.isLiveStreaming().subscribe((data)=> {this.isLive=!data.includes("offline")});
    this.apiService.getLatestRaces(3).subscribe((data)=> {this.race=data.races[0]});
    this.intervalId = setInterval(() => {
      this.updateCountdown();
    }, 1000);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const regex = /^\/race\/\d+$/;
      this.showFooter = !regex.test(event.urlAfterRedirects);
    });
  }
}
