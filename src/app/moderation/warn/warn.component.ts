import {Component, Input,} from '@angular/core';

@Component({
  selector: 'app-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.css'],
})
export class WarnComponent {
  @Input() dashboard!: boolean;

}
