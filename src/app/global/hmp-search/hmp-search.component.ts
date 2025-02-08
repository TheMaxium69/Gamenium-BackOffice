import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";
import {AdministrationService} from "../../-service/administration.service";
import {MatPaginator} from "@angular/material/paginator";
import {catchError, debounceTime, of, Subject, switchMap, takeUntil} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {GameInterface} from "../../-interface/game.interface";

@Component({
  selector: 'app-hmp-search',
  templateUrl: './hmp-search.component.html',
  styleUrls: ['./hmp-search.component.css']
})
export class HmpSearchComponent implements OnInit, OnDestroy{
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input()
  public displayedColumns: string[] = ['id'];

  constructor(protected app:AppComponent,
              private administrationService:AdministrationService,) {}

  private unsubscribe$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  searchValue: string = '';
  hmps: any[] = [];
  dataSource = new MatTableDataSource<any>(this.hmps);


  ngOnInit() {

    /* SET SEARCH PROFIL */
    this.searchSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      // distinctUntilChanged(),
      switchMap((searchValue) => {
        return this.administrationService.searchHmp(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
          catchError((error) => {
            console.error('Une erreur s\'est produite lors de la recherche : ', error);
            return of([]);
          })
        );
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      this.hmps = results;
      this.dataSource = new MatTableDataSource<any>(this.hmps);
      this.dataSource.paginator = this.paginator;
    });


    this.search()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  search(): void {
    this.hmps = [];
    this.searchSubject.next(this.searchValue);
  }


}
