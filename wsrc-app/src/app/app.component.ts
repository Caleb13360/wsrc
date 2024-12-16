import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wsrc-app';
    menuVisible = false; // Tracks if the menu is open

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible; // Toggles the menu state
    console.log('Menu toggled:', this.menuVisible); // Debugging
  }
}
