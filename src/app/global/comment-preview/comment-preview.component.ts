import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.css']
})
export class CommentPreviewComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;

}
