import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../app.component";
import { ModerationService } from "../../-service/moderation.service";
import { CommentInterface } from 'src/app/-interface/comment.interface';
import { CommentReplyInterface } from 'src/app/-interface/comment-reply.interface';

@Component({
  selector: 'app-modo-comment-reply',
  templateUrl: './modo-comment-reply.component.html',
  styleUrls: ['./modo-comment-reply.component.css']
})
export class ModoCommentReplyComponent implements OnInit {

  commentReplyRandom1: CommentReplyInterface | undefined;
  commentReplyRandom2: CommentReplyInterface | undefined;

  constructor (
    protected app:AppComponent,
    private moderationService:ModerationService
  ) {}


  ngOnInit(): void {
    this.getRandomCommentReply();
  }

  getRandomCommentReply(){

    this.moderationService.getCommentReplyRandom(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {message:string, result:CommentReplyInterface, result2:CommentReplyInterface}) => {
      if (response.message === "good"){
        this.commentReplyRandom1 = response.result;
        this.commentReplyRandom2 = response.result2;
      }
    });

  }

}
