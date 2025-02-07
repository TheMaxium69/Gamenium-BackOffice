import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, debounceTime, of, Subject, switchMap, takeUntil } from 'rxjs';
import { CommentReplyInterface } from 'src/app/-interface/comment-reply.interface';
import { AdministrationService } from 'src/app/-service/administration.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-comment-reply-search',
  templateUrl: './comment-reply-search.component.html',
  styleUrls: ['./comment-reply-search.component.css']
})
export class CommentReplySearchComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input() displayedColumns: string[] = ['id'];

  private unsubscribe$ = new Subject<void>();
  private searchCommentReplySubject = new Subject<string>();

  searchValue: string = '';
  commentsReply: CommentReplyInterface[] = [];
  dataSource = new MatTableDataSource<CommentReplyInterface>(this.commentsReply);

  constructor(protected app:AppComponent,
              private administrationService:AdministrationService,
  ){}

  ngOnInit(): void {

    /* SET SEARCH COMMENT REPONSE */
    this.searchCommentReplySubject.pipe(
      debounceTime(this.app.deadlineSearch),
      // distinctUntilChanged(),
      switchMap((searchValue) => {
        return this.administrationService.searchCommentReply(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
          catchError((error) => {
            console.error('Une erreur s\'est produite lors de la recherche :', error);
            return of([]);
          })
        );      
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      this.commentsReply = results;
      this.dataSource = new MatTableDataSource<CommentReplyInterface>(this.commentsReply);
      this.dataSource.paginator = this.paginator;
    });

    this.searchCommentsReply();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchCommentsReply(): void {
    this.commentsReply = [];
    this.searchCommentReplySubject.next(this.searchValue);
  }


}
