import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-badge-preview',
  templateUrl: './badge-preview.component.html',
  styleUrls: ['./badge-preview.component.css']
})
export class BadgePreviewComponent {


  @Input({transform: numberAttribute})
  public id: number|null = null;


}
