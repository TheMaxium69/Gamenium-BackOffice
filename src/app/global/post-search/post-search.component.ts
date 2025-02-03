import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, catchError, debounceTime, of, switchMap, takeUntil } from 'rxjs';
import { PostActuInterface } from 'src/app/-interface/post-actu.interface';
import { ActualityService } from 'src/app/-service/actuality.service';
import { AppComponent } from 'src/app/app.component';
import {MatPaginator} from "@angular/material/paginator";
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input()
  public displayedColumns: string[] = ['id'];
  @Output() 
  articleSelected = new EventEmitter<PostActuInterface>();

  private unsubscribe$ = new Subject<void>();
  private searchPostSubject = new Subject<string>();

  searchValue: string = '';
  postactus: PostActuInterface[] = [];
  dataSource = new MatTableDataSource<PostActuInterface>(this.postactus);

  constructor(protected app:AppComponent,
              private actualityService:ActualityService,
              private router: Router,
            ){}

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
      console.log(results);
      this.dataSource = new MatTableDataSource<PostActuInterface>(this.postactus);
      this.dataSource.paginator = this.paginator;
    });


    this.searchPostactus()
  }

  searchPostactus(): void {
    this.postactus = [];
    this.searchPostSubject.next(this.searchValue);
  }

    /* Sélectionne un article et redirige */
  selectArticle(article: PostActuInterface) {
    this.articleSelected.emit(article); // Émettre l'article sélectionné

    if (!this.router.url.includes('/writter/edit-article')) {
      // Rediriger vers la page d'édition SANS ID
      this.router.navigate(['/writter/edit-article']);
    }
  }


    
}
