import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { MenuBarLeftModel } from './menu-bar-left.models/menu-bar-left.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar-left',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './menu-bar-left.component.html',
  styleUrls: ['./menu-bar-left.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarLeftComponent implements OnInit {
  @Input() itemMenuBarLeft: MenuBarLeftModel[]
  constructor(private router: Router) {
  }
  ngOnInit(): void {
    console.log(window.location.href)
   }
  redirectToLink(link: string, index: number) {
    this.router.navigate([link])
    this.itemMenuBarLeft.map(e => {
      if (e.ID == index) {
        e.isActive = true
      }
      else {
        e.isActive = false
      }
    })
  }
}
