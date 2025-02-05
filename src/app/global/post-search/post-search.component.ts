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
import Swal from "sweetalert2";

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

    // si provider alors redirige vers l'edition
    if(this.haveProvider) {
      console.log('ca marche pas')
      this.router.navigate(['provider/edit-article']);
    } else {
      this.router.navigate(['/writter/edit-article']); // redirige si necessaire
    }
  }

  confirmDeleteArticle(article: PostActuInterface) {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Cet article sera supprimé définitivement.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer!",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteArticle(article);
      }
    });
  }

  deleteArticle(article: PostActuInterface) {
    const url = this.app.setURL();
    const option = this.app.createCorsToken();
  
    let deleteCall = this.haveProvider
      ? this.userProviderService.deletePostActuByProvider(article.id, url, option)
      : this.actualityService.deletePostActuIsDelete(article.id, url, option);
  
    deleteCall.subscribe(
      () => {
        Swal.fire("Supprimé!", "L'article a été supprimé avec succès.", "success");
        // this.searchPostactus(); // Pour rafraichir la liste plus tard
      },
      (error) => {
        Swal.fire("Erreur", "Impossible de supprimer l'article.", "error");
        console.error("❌ Erreur lors de la suppression de l'article :", error);
      }
    );
  }
  
  

}
