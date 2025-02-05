import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { catchError, debounceTime, of, Subject, switchMap, takeUntil } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { AppComponent } from "../../app.component";
import { LogActuService } from "../../-service/log-actu.service";
import { LogActuInterface } from 'src/app/-interface/logactu.interface';


@Component({
  selector: 'app-log-actu',
  templateUrl: './log-actu.component.html',
  styleUrls: ['./log-actu.component.css']
})
export class LogActuComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  private unsubscribe$ = new Subject<void>();
  private searchLogSubject = new Subject<string>();

  searchValue: string = '';
  logs: LogActuInterface[] = [];
  displayedColumns: string[] = ['id', 'user', 'action', 'route', 'title','provider', 'redacteur', 'created_at'];
  dataSource = new MatTableDataSource<LogActuInterface>(this.logs);

  constructor(
    protected app: AppComponent,
    private logActuService: LogActuService
  ) {}

  ngOnInit() {
    this.searchLogSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      switchMap((searchValue) => {
        return this.logActuService.getLogActu(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
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
      this.dataSource = new MatTableDataSource<LogActuInterface>(this.logs);
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
