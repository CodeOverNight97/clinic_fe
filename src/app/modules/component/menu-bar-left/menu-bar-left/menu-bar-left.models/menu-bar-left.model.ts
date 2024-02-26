export class MenuBarLeftModel {
  menuName: string;
  routerLink: string;
  icon: string;
  ID: number;
  isActive: boolean;

  constructor(menuName: string, routerLink: string, icon: string, ID: number, isActive: boolean) {
    this.menuName = menuName;
    this.routerLink = routerLink;
    this.icon = icon;
    this.ID = ID;
    this.isActive = isActive;
  }
}