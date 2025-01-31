import {Component, Input, numberAttribute, OnInit, SimpleChanges} from '@angular/core';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { CommentInterface } from 'src/app/-interface/comment.interface';
import { CommentService } from 'src/app/-service/comment.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.css']
})
export class CommentPreviewComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;

  commentSelected: CommentInterface|null = null;

  constructor (
    protected app: AppComponent,
    private commentService: CommentService
  ) {}
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.id = changes['id'].currentValue;
      if (this.id) {
        this.getCommentById(this.id);
      }
    }
  }
  
  getCommentById(id: number) {
    this.commentService.getCommentById(this.app.setURL(), this.app.createCorsToken(), id).subscribe((response: ApicallInterface) => {
      if(response.message === "good") {
        this.commentSelected = response.result;
      } else {
        console.log('Pas de commentaire');
      }
    })
  }

}
