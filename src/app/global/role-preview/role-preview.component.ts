import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-role-preview',
  templateUrl: './role-preview.component.html',
  styleUrls: ['./role-preview.component.css']
})
export class RolePreviewComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;

}
