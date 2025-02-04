import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, catchError, debounceTime, of, switchMap, takeUntil } from 'rxjs';
import { PostActuInterface } from 'src/app/-interface/post-actu.interface';
import { ActualityService } from 'src/app/-service/actuality.service';
import { AppComponent } from 'src/app/app.component';
import {MatPaginator} from "@angular/material/paginator";
import { Router } from '@angular/router';
import { SelectedArticleService } from 'src/app/-service/selected-article.service';
import {AdministrationService} from "../../-service/administration.service";
import { UserProviderService } from 'src/app/-service/user-provider.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input() displayedColumns: string[] = ['id'];
  @Input() stat!: boolean;
  @Input() haveProvider!: boolean;
  @Input() pageSize: number = 10;

  @Output()
  articleSelected = new EventEmitter<PostActuInterface>();

  private unsubscribe$ = new Subject<void>();
  private searchPostSubject = new Subject<string>();

  searchValue: string = '';
  postactus: PostActuInterface[] = [];
  dataSource = new MatTableDataSource<PostActuInterface>(this.postactus);

  constructor(protected app:AppComponent,
              private actualityService:ActualityService,
              private userProviderService:UserProviderService,
              private administrationService:AdministrationService,
              private selectedArticleService: SelectedArticleService,
              private router: Router,
  ){}

  ngOnInit() {

    /* SET SEARCH POSTACTUS */
    this.searchPostSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      // distinctUntilChanged(),
      switchMap((searchValue) => {
        if (this.stat){
          return this.administrationService.searchPostActusAdmin(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
            catchError((error) => {
              console.error('Une erreur s\'est produite lors de la recherche :', error);
              return of([]);
            })
          );
        } else if (this.haveProvider && this.app.userConnected.providerGestionId !== null){
          return this.userProviderService.searchPostActuByProvider(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
            catchError((error) => {
              console.error('Une erreur s\'est produite lors de la recherche :', error);
              return of([]);
            })
          );
        } else {
          return this.actualityService.searchPostActu(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
            catchError((error) => {
              console.error('Une erreur s\'est produite lors de la recherche :', error);
              return of([]);
            })
          );
        }

      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      this.postactus = results;
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
    this.selectedArticleService.setSelectedArticle(article); // on save l'article global
    this.articleSelected.emit(article); // update immediate sur la page

    if (!this.router.url.includes('/writter/edit-article')) {
      this.router.navigate(['/writter/edit-article']); // redirige si necessaire
    }
  }

}
