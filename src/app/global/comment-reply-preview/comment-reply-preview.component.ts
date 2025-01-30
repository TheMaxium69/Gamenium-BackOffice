import {Component, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'app-comment-reply-preview',
  templateUrl: './comment-reply-preview.component.html',
  styleUrls: ['./comment-reply-preview.component.css']
})
export class CommentReplyPreviewComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;

}
