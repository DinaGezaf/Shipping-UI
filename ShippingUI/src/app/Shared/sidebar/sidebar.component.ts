import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  sidenavWidth = 5;
  ngStyle: string | undefined;
  panelOpenState = false;

  @ViewChild('invertebrates', { static: true }) menuTrigger!: MatMenuTrigger;

  isSidebarOpen = false;

  toggle() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
