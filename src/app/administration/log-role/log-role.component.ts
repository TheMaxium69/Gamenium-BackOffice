import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {catchError, debounceTime, of, Subject, switchMap, takeUntil} from "rxjs";
import {UserInterface} from "../../-interface/user.interface";
import {MatTableDataSource} from "@angular/material/table";
import {AppComponent} from "../../app.component";
import {AdministrationService} from "../../-service/administration.service";
import {ApicallInterface} from "../../-interface/apicall.interface";
import {LogRoleInterface} from "../../-interface/logrole.interface";
import {LogRoleService} from "../../-service/log-role.service";

@Component({
  selector: 'app-log-role',
  templateUrl: './log-role.component.html',
  styleUrls: ['./log-role.component.css']
})
export class LogRoleComponent implements OnInit, OnDestroy{
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  private unsubscribe$ = new Subject<void>();
  private searchLogSubject = new Subject<string>();

  searchValue: string = '';
  logs: LogRoleInterface[] = [];
  displayedColumns: string[] = ['id', 'user', 'action', 'role', 'created_at', 'action_by'];
  dataSource = new MatTableDataSource<LogRoleInterface>(this.logs);

  constructor(protected app:AppComponent,
              private logroleService:LogRoleService,) {}

  ngOnInit() {

    /* SET SEARCH PROFIL */
    this.searchLogSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      // distinctUntilChanged(),
      switchMap((searchValue) => {
        return this.logroleService.getLogRole(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
          catchError((error) => {
            console.error('Une erreur s\'est produite lors de la recherche :', error);
            return of([]);
          })
        );
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      this.logs = results;
      this.dataSource = new MatTableDataSource<LogRoleInterface>(this.logs);
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
