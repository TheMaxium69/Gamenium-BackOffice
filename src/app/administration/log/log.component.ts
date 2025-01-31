import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {catchError, debounceTime, of, Subject, switchMap, takeUntil} from "rxjs";
import {LogRoleInterface} from "../../-interface/logrole.interface";
import {MatTableDataSource} from "@angular/material/table";
import {AppComponent} from "../../app.component";
import {LogRoleService} from "../../-service/log-role.service";
import {LogInterface} from "../../-interface/log.interface";
import {LogService} from "../../-service/log.service";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, OnDestroy{
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  private unsubscribe$ = new Subject<void>();
  private searchLogSubject = new Subject<string>();

  searchValue: string = '';
  logs: LogInterface[] = [];
  displayedColumns: string[] = ['id', 'user', 'why', 'created_at', 'moderated_by'];
  dataSource = new MatTableDataSource<LogInterface>(this.logs);

  constructor(protected app:AppComponent,
              private logService:LogService,) {}

  ngOnInit() {

    /* SET SEARCH PROFIL */
    this.searchLogSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      // distinctUntilChanged(),
      switchMap((searchValue) => {
        return this.logService.getLog(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
          catchError((error) => {
            console.error('Une erreur s\'est produite lors de la recherche :', error);
            return of([]);
          })
        );
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      this.logs = results;
      this.dataSource = new MatTableDataSource<LogInterface>(this.logs);
      this.dataSource.paginator = this.paginator;
    });


    this.searchLog()
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

