import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {PostActuInterface} from "../../-interface/post-actu.interface";
import {catchError, debounceTime, of, Subject, switchMap, takeUntil} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {AppComponent} from "../../app.component";
import {ActualityService} from "../../-service/actuality.service";
import {UserProviderService} from "../../-service/user-provider.service";
import {AdministrationService} from "../../-service/administration.service";
import {SelectedArticleService} from "../../-service/selected-article.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ProviderInterface} from "../../-interface/provider.interface";

@Component({
  selector: 'app-provider-search',
  templateUrl: './provider-search.component.html',
  styleUrls: ['./provider-search.component.css']
})
export class ProviderSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input() displayedColumns: string[] = ['id'];

  @Output()
  articleSelected = new EventEmitter<PostActuInterface>();

  private unsubscribe$ = new Subject<void>();
  private searchProviderSubject = new Subject<string>();

  searchValue: string = '';
  provider: ProviderInterface[] = [];
  dataSource = new MatTableDataSource<ProviderInterface>(this.provider);

  constructor(protected app:AppComponent,
              private administrationService:AdministrationService
  ){}

  ngOnInit() {

    /* SET SEARCH POSTACTUS */
    this.searchProviderSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      // distinctUntilChanged(),
      switchMap((searchValue) => {

          return this.administrationService.searchProviderAdmin(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
            catchError((error) => {
              console.error('Une erreur s\'est produite lors de la recherche :', error);
              return of([]);
            })
          );

      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      this.provider = results;
      this.dataSource = new MatTableDataSource<ProviderInterface>(this.provider);
      this.dataSource.paginator = this.paginator;
    });


    this.searchProvider()
  }

  searchProvider(): void {
    this.provider = [];
    this.searchProviderSubject.next(this.searchValue);
  }



}

