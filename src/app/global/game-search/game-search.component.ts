import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {AppComponent} from "../../app.component";
import {AdministrationService} from "../../-service/administration.service";
import {catchError, debounceTime, of, Subject, switchMap, takeUntil} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {GameInterface} from "../../-interface/game.interface";

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html',
  styleUrls: ['./game-search.component.css']
})
export class GameSearchComponent implements OnInit, OnDestroy{
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input()
  public displayedColumns: string[] = ['id'];

  constructor(protected app:AppComponent,
              private administrationService:AdministrationService,) {}

  private unsubscribe$ = new Subject<void>();
  private searchGameSubject = new Subject<string>();

  searchValue: string = '';
  games: GameInterface[] = [];
  dataSource = new MatTableDataSource<GameInterface>(this.games);

  ngOnInit() {

    /* SET SEARCH PROFIL */
    this.searchGameSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      // distinctUntilChanged(),
      switchMap((searchValue) => {
        return this.administrationService.searchGamesAdmin(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
          catchError((error) => {
            console.error('Une erreur s\'est produite lors de la recherche : ', error);
            return of([]);
          })
        );
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      this.games = results;
      this.dataSource = new MatTableDataSource<GameInterface>(this.games);
      this.dataSource.paginator = this.paginator;
    });


    this.searchGame()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchGame(): void {
    this.games = [];
    this.searchGameSubject.next(this.searchValue);
  }

}
