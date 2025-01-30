import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-profil-preview',
  templateUrl: './profil-preview.component.html',
  styleUrls: ['./profil-preview.component.css']
})
export class ProfilPreviewComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;

}
