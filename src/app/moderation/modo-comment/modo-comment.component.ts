import { Component, OnInit } from '@angular/core';
import { AppComponent } from "../../app.component";
import { ModerationService } from "../../-service/moderation.service";
import { CommentInterface } from 'src/app/-interface/comment.interface';


@Component({
  selector: 'app-modo-comment',
  templateUrl: './modo-comment.component.html',
  styleUrls: ['./modo-comment.component.css']
})
export class ModoCommentComponent implements OnInit{

  commentRandom1: CommentInterface | undefined;
  commentRandom2: CommentInterface | undefined;

  constructor (
    protected app:AppComponent,
    private moderationService:ModerationService
  ) {}


  ngOnInit(): void {
    this.getRandomComment();
  }

  getRandomComment(){

    this.moderationService.getCommentRandom(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {message:string, result:CommentInterface, result2:CommentInterface}) => {
      if (response.message === "good"){
        this.commentRandom1 = response.result;
        this.commentRandom2 = response.result2;
        console.log(this.commentRandom1);
        console.log(this.commentRandom2);

      }
    });

  }

}
