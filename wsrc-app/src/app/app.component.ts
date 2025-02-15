import { CommonModule } from '@angular/common';
import { OnInit, Component, HostListener } from '@angular/core';
import { RouterLink, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  title = 'wsrc-app';
     menuVisible = false;
      isHeaderHidden = false; // Tracks if the header is hidden
  lastScrollY = 0; // Tracks the last scroll position
  showFooter: boolean = true;

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
  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const regex = /^\/race\/\d+$/;
      this.showFooter = !regex.test(event.urlAfterRedirects);
    });
  }
}
