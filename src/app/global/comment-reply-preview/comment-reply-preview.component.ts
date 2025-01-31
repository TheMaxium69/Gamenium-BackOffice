import {Component, Input, numberAttribute, SimpleChanges} from '@angular/core';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { CommentReplyInterface } from 'src/app/-interface/comment-reply.interface';
import { CommentReplyService } from 'src/app/-service/comment-reply.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-comment-reply-preview',
  templateUrl: './comment-reply-preview.component.html',
  styleUrls: ['./comment-reply-preview.component.css']
})
export class CommentReplyPreviewComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;

  commentReplySelected: CommentReplyInterface|null = null;

  constructor (
    protected app: AppComponent,
    private commentReplyService: CommentReplyService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.id = changes['id'].currentValue;
      if (this.id) {
        this.getReplyById(this.id);
      }
    }
  }

  getReplyById(id: number) {
    this.commentReplyService.getReplyById(this.app.setURL(), this.app.createCorsToken(), id).subscribe((response: ApicallInterface) => {
      if(response.message === "good") {
        this.commentReplySelected = response.result;
      } else {
        console.log('Pas de commentaire');
      }
    })
  }
}
