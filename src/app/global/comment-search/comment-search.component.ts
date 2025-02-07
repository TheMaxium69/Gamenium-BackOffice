import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, debounceTime, of, Subject, switchMap, takeUntil } from 'rxjs';
import { CommentInterface } from 'src/app/-interface/comment.interface';
import { AdministrationService } from 'src/app/-service/administration.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-comment-search',
  templateUrl: './comment-search.component.html',
  styleUrls: ['./comment-search.component.css']
})
export class CommentSearchComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input() displayedColumns: string[] = ['id'];

  private unsubscribe$ = new Subject<void>();
  private searchCommentSubject = new Subject<string>();

  searchValue: string = '';
  comments: CommentInterface[] = [];
  dataSource = new MatTableDataSource<CommentInterface>(this.comments);

  constructor(protected app:AppComponent,
              private administrationService:AdministrationService,
  ){}

  ngOnInit(): void {

    /* SET SEARCH COMMENT */
    this.searchCommentSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      // distinctUntilChanged(),
      switchMap((searchValue) => {
        return this.administrationService.searchComment(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
          catchError((error) => {
            console.error('Une erreur s\'est produite lors de la recherche :', error);
            return of([]);
          })
        );      
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      this.comments = results;
      this.dataSource = new MatTableDataSource<CommentInterface>(this.comments);
      this.dataSource.paginator = this.paginator;
    });

    this.searchComments();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchComments(): void {
    this.comments = [];
    this.searchCommentSubject.next(this.searchValue);
  }


}
