import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import type { Race } from '@models/race.d.ts';

@Component({
  selector: 'app-race-tile',
  imports: [RouterLink, MatIconModule],
  templateUrl: './race-tile.component.html',
  styleUrl: './race-tile.component.css'
})
export class RaceTileComponent {
  @Input() race!: Race;
}
