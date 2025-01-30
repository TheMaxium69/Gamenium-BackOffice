import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-hmg-preview',
  templateUrl: './hmg-preview.component.html',
  styleUrls: ['./hmg-preview.component.css']
})
export class HmgPreviewComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;

}
