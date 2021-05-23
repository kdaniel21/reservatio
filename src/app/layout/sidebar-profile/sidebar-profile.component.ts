import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sidebar-profile',
  templateUrl: './sidebar-profile.component.html',
  styleUrls: ['./sidebar-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
