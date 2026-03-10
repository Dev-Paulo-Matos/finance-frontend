import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { tablerTrendingDown, tablerWallet } from '@ng-icons/tabler-icons';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgIcon],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
