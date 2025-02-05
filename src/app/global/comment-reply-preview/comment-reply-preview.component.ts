import {Component, Input, numberAttribute, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { CommentReplyInterface } from 'src/app/-interface/comment-reply.interface';
import { CommentReplyService } from 'src/app/-service/comment-reply.service';
import { ModerationService } from 'src/app/-service/moderation.service';
import { ViewService } from 'src/app/-service/view.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-reply-preview',
  templateUrl: './comment-reply-preview.component.html',
  styleUrls: ['./comment-reply-preview.component.css']
})
export class CommentReplyPreviewComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;

  commentReplySelected: CommentReplyInterface|null = null;
  viewActu: number = 0;

  constructor (
    protected app: AppComponent,
    private commentReplyService: CommentReplyService,
    private viewService: ViewService,
    private moderationService: ModerationService,
    private router: Router
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

        if(this.commentReplySelected?.comment.post.id) {

          this.viewService.getPostActuViews(this.commentReplySelected.comment.post.id, this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
            if (response.message === 'good') {
              this.viewActu = response.result;
            }
          })

        }

      } else {
        console.log('Pas de commentaire');
      }
    })
  }

  moderateDeleteCommentReply() {
    Swal.fire({
      icon: "question",
      title: "Demande de confirmation",
      text: "Etes vous sur de vouloir supprimer le commentaire de cet utilisateur ?",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Supprimer`,
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isDenied) {
        if (this.commentReplySelected) {
          const bodyJSON = JSON.stringify({
            "comment_reply_id": this.commentReplySelected?.id
          });
          
          this.moderationService.moderateDeleteCommentReply(bodyJSON ,this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
            if(response.message === "good") {
              Swal.fire("Commentaire supprimée", "", "success");
              this.router.navigate(['/']);
            } else {
              Swal.fire("Erreur de nos services", "", "error");
            }
          })
        }
      }
    });
  }
}
