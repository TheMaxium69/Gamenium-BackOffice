import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from "../../app.component";
import {UserInterface} from "../../-interface/user.interface";
import {catchError, debounceTime, of, Subject, switchMap, takeUntil} from "rxjs";
import {AdministrationService} from "../../-service/administration.service";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, OnDestroy {

  /*search*/
  private unsubscribe$ = new Subject<void>();
  searchValue: string = '';

  /*PROFIL*/
  private searchProfilSubject = new Subject<string>();
  users: UserInterface[] = [];
  isProfilLoading:boolean = true;


  constructor(private app:AppComponent,
              private administrationService:AdministrationService,) {}

  ngOnInit() {

    /* SET SEARCH PROFIL */
    this.searchProfilSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      // distinctUntilChanged(),
      switchMap((searchValue) => {
        return this.administrationService.searchUsersAdmin(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
          catchError((error) => {
            this.isProfilLoading = false;
            console.error('Une erreur s\'est produite lors de la recherche de jeux :', error);
            // Swal.fire({
            //   title: 'Erreur!',
            //   text: 'Une erreur s\'est produite lors de la recherche',
            //   icon: 'error',
            //   confirmButtonText: 'OK',
            //   confirmButtonColor: this.app.userConnected?.themeColor || this.app.colorDefault
            // });
            return of([]);
          })
        );
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      console.log(results);
      // if (this.isProfilLoading) {
      //   if (this.app.userConnected) {
      //     this.users = results.filter((user) => user.id !== this.app.userConnected.id);
      //   } else {
      //     this.users = results;
      //   }
      // } else {
      //   this.users = results;
      // }
      this.isProfilLoading = false;
    });


    this.searchUser()
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchUser(): void {
    this.isProfilLoading = true
    this.users = [];
    this.searchProfilSubject.next(this.searchValue);
  }


}
