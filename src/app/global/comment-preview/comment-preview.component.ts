import {Component, Input, numberAttribute, OnInit, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { CommentInterface } from 'src/app/-interface/comment.interface';
import { CommentService } from 'src/app/-service/comment.service';
import { ModerationService } from 'src/app/-service/moderation.service';
import { ViewService } from 'src/app/-service/view.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment-preview',
  templateUrl: './comment-preview.component.html',
  styleUrls: ['./comment-preview.component.css']
})
export class CommentPreviewComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;

  commentSelected: CommentInterface|null = null;
  viewActu: number = 0;

  constructor (
    protected app: AppComponent,
    private commentService: CommentService,
    private viewService: ViewService,
    private moderationService: ModerationService,
    private router: Router
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

        if(this.commentSelected?.post.id) {

          this.viewService.getPostActuViews(this.commentSelected.post.id, this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
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

  moderateDeleteComment() {
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
          if (this.commentSelected) {
            const bodyJSON = JSON.stringify({
              "comment_id": this.commentSelected?.id
            });
            
            this.moderationService.moderateDeleteComment(bodyJSON ,this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
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
