import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {catchError, debounceTime, of, Subject, switchMap, takeUntil} from "rxjs";
import {LogActuInterface} from "../../-interface/logactu.interface";
import {MatTableDataSource} from "@angular/material/table";
import {AppComponent} from "../../app.component";
import {LogActuService} from "../../-service/log-actu.service";
import {LogCommentService} from "../../-service/log-comment.service";
import {LogCommentInterface} from "../../-interface/log-comment.interface";

@Component({
  selector: 'app-log-comment',
  templateUrl: './log-comment.component.html',
  styleUrls: ['./log-comment.component.css']
})
export class LogCommentComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  private unsubscribe$ = new Subject<void>();
  private searchLogSubject = new Subject<string>();

  searchValue: string = '';
  logs: LogCommentInterface[] = [];
  displayedColumns: string[] = ['id', 'user', 'content', 'created_at', 'deleted_at'];
  dataSource = new MatTableDataSource<LogCommentInterface>(this.logs);

  constructor(
    protected app: AppComponent,
    private logCommentService: LogCommentService
  ) {}

  ngOnInit() {
    this.searchLogSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      switchMap((searchValue) => {
        return this.logCommentService.getLogComment(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
          catchError((error) => {
            console.error('Une erreur s\'est produite lors de la recherche :', error);
            return of([]);
          })
        );
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      this.logs = results;
      console.log(results);
      this.dataSource = new MatTableDataSource<LogCommentInterface>(this.logs);
      this.dataSource.paginator = this.paginator;
    });

    this.searchLog();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchLog(): void {
    this.logs = [];
    this.searchLogSubject.next(this.searchValue);
  }
}
