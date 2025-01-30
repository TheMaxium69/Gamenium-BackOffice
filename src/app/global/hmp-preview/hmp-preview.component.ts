import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-hmp-preview',
  templateUrl: './hmp-preview.component.html',
  styleUrls: ['./hmp-preview.component.css']
})
export class HmpPreviewComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;

}
