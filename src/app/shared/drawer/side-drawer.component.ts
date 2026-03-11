import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgComponentOutlet } from '@angular/common';
import { SideDrawerService } from '../../core/services/side-drawer.service';

@Component({
  selector: 'app-side-drawer',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './side-drawer.component.html',
  styleUrl: './side-drawer.component.scss'
})
export class SideDrawerComponent {

  drawer = inject(SideDrawerService);

}