import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-desktop-sidebar',
  templateUrl: './desktop-sidebar.component.html',
  styleUrls: ['./desktop-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesktopSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
