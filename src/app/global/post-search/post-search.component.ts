import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, catchError, debounceTime, of, switchMap, takeUntil } from 'rxjs';
import { PostActuInterface } from 'src/app/-interface/postActu.interface';
import { ActualityService } from 'src/app/-service/actuality.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  @Input()
  public displayedColumns: string[] = ['id'];
  
  private unsubscribe$ = new Subject<void>();
  private searchPostSubject = new Subject<string>();

  searchValue: string = '';
  postactus: PostActuInterface[] = [];
  dataSource = new MatTableDataSource<PostActuInterface>(this.postactus);

  constructor(protected app:AppComponent, private actualityService:ActualityService){}

  ngOnInit() {
    
    /* SET SEARCH POSTACTUS */
    this.searchPostSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      // distinctUntilChanged(),
      switchMap((searchValue) => {
        return this.actualityService.searchPostActu(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
          catchError((error) => {
            console.error('Une erreur s\'est produite lors de la recherche :', error);
            return of([]);
          })
        );
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      this.postactus = results;
      this.dataSource = new MatTableDataSource<PostActuInterface>(this.postactus);
    });


    this.searchPostactus()
  }

  searchPostactus(): void {
    this.postactus = [];
    this.searchPostSubject.next(this.searchValue);
  }
}
