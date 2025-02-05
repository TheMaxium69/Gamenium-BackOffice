import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-role-preview',
  templateUrl: './role-preview.component.html',
  styleUrls: ['./role-preview.component.css']
})
export class RolePreviewComponent {

  @Input()
  public ROLE_NAME: string|null = null;

}
