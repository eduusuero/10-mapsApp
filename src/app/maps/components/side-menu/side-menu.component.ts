import { Component } from '@angular/core';

interface MenuItem {
  route: string;
  name:  string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public menuItem: MenuItem[] = [
    { route: '/maps/fullscreen' , name: 'FullScreen'},
    { route: '/maps/zoom-range' , name: 'ZoomRange'},
    { route: '/maps/markers' , name: 'Markers'},
    { route: '/maps/properties' , name: 'Houses'},
  ];

}
