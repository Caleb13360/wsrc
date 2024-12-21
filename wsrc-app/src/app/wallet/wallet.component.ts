import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wallet',
  imports: [CommonModule, RouterLink],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  transactions = [{
    date: '24 Dec',
    time: '18:15',
    ref_number: '2ak2383bakbda',
    type: 'Withdraw',
    status: 'Pending',
    amount: '100'
  },{
    date: '24 Dec',
    time: '18:15',
    ref_number: '2ak2383bakbda',
    type: 'Withdraw',
    status: 'Pending',
    amount: '100'
  },
{
    date: '24 Dec',
    time: '18:15',
    ref_number: '2ak2383bakbda',
    type: 'Withdraw',
    status: 'Pending',
    amount: '100'
  }];
}
