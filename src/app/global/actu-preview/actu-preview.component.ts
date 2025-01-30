import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-actu-preview',
  templateUrl: './actu-preview.component.html',
  styleUrls: ['./actu-preview.component.css']
})
export class ActuPreviewComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;

}
