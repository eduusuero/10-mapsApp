import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from "../side-menu/side-menu.component";

@Component({
  selector: 'counter-alone',
  standalone: true,
  //imports: [CommonModule],
  templateUrl: './counter-alone.component.html',
  styleUrls: ['./counter-alone.component.css'],
  imports: []
})
export class CounterAloneComponent {

  @Input()
  public counter: number = 10;
}
