import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, catchError, debounceTime, of, switchMap, takeUntil } from 'rxjs';
import { PostActuInterface } from 'src/app/-interface/post-actu.interface';
import { ActualityService } from 'src/app/-service/actuality.service';
import { UserProviderService } from 'src/app/-service/user-provider.service'; 
import { AppComponent } from 'src/app/app.component';
import { MatPaginator } from "@angular/material/paginator";
import { Router } from '@angular/router';
import { SelectedArticleService } from 'src/app/-service/selected-article.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input()
  public displayedColumns: string[] = ['id'];
  @Input() pageSize: number = 5;
  @Input() haveProvider: boolean = false; 

  @Output()
  articleSelected = new EventEmitter<PostActuInterface>();

  private unsubscribe$ = new Subject<void>();
  private searchPostSubject = new Subject<string>();

  searchValue: string = '';
  providerId: number | null = null; 
  postactus: PostActuInterface[] = [];
  dataSource = new MatTableDataSource<PostActuInterface>(this.postactus);

  constructor(
    protected app: AppComponent,
    private actualityService: ActualityService,
    private userProviderService: UserProviderService, 
    private selectedArticleService: SelectedArticleService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("📢 Component Initialized");

  if (this.haveProvider) {
    console.log("🔎 Fetching articles with provider filter...");
    this.fetchProviderAndLoadArticles();
  } else {
    console.log("🔎 Fetching all articles...");
    this.searchPostactus();
  }
  }

  /* Fetch Provider & Load Articles */
  fetchProviderAndLoadArticles(): void {
    const url = this.app.setURL();
    const options = this.app.createCorsToken();

    this.userProviderService.getProviderByUser(url, options).subscribe(response => {
      if (response.result) {
        this.providerId = response.result.id;
        console.log("Provider ID trouvé :", this.providerId);
        this.searchPostactus(); 
      } else {
        console.warn("Aucun provider trouvé pour cet utilisateur.");
      }
    }, error => {
      console.error("Erreur lors de la récupération du provider :", error);
    });
  }

  /* Fetch Articles */
  searchPostactus(): void {
    this.searchPostSubject.next(this.searchValue);
  
    this.searchPostSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      switchMap((searchValue) => {
        if (this.haveProvider && this.providerId) {
          return this.actualityService.getPostActuByProvider(this.providerId, this.app.setURL(), this.app.createCorsToken()).pipe(
            catchError((error) => {
              console.error("Erreur lors de la récupération des articles pour le provider :", error);
              return of([]);
            })
          );
        } else {
          return this.actualityService.searchPostActu(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
            catchError((error) => {
              console.error("Erreur lors de la recherche :", error);
              return of([]);
            })
          );
        }
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      console.log("Fetched Articles:", results); 
      this.postactus = results;
  
      
      this.dataSource = new MatTableDataSource<PostActuInterface>(this.postactus);
      this.dataSource.paginator = this.paginator;
    });
  }
  

  /* Sélectionne un article et redirige */
  selectArticle(article: PostActuInterface) {
    this.selectedArticleService.setSelectedArticle(article); 
    this.articleSelected.emit(article); 

    if (!this.router.url.includes('/writter/edit-article')) {
      this.router.navigate(['/writter/edit-article']); 
    }
  }
}
