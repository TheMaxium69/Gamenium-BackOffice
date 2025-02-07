import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, of } from 'rxjs';
import { debounceTime, switchMap, catchError, takeUntil } from 'rxjs/operators';
import { AdministrationService } from 'src/app/-service/administration.service';
import { UserInterface } from 'src/app/-interface/user.interface';
import { ProviderInterface } from 'src/app/-interface/provider.interface';
import { AppComponent } from 'src/app/app.component';
import { UserProviderService } from 'src/app/-service/user-provider.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-provider',
  templateUrl: './user-provider.component.html',
  styleUrls: ['./user-provider.component.css']
})
export class UserProviderComponent implements OnInit, OnDestroy {

  userSearch: string = "";
  providerSearch: string = "";
  userResults: UserInterface[] = [];
  providerResults: ProviderInterface[] = [];

  selectedUser: UserInterface | null = null;
  selectedProvider: ProviderInterface | null = null;

  private searchUserSubject = new Subject<string>();
  private searchProviderSubject = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  constructor(
    private administrationService: AdministrationService,
    private userProviderService: UserProviderService,
    protected app: AppComponent
  ) {}

  ngOnInit() {
    /* Recherche des UTILISATEURS */
    this.searchUserSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      switchMap((searchValue) => {
        return this.administrationService.searchUsersAdmin(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
          catchError((error) => {
            console.error('Erreur recherche utilisateur:', error);
            return of([]);
          })
        );
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      console.log("Utilisateurs trouvés :", results);
      this.userResults = results;
    });

    /* Recherche des PROVIDERS */
    this.searchProviderSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      switchMap((searchValue) => {
        return this.administrationService.searchProviderAdmin(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
          catchError((error) => {
            console.error('Erreur recherche provider:', error);
            return of([]);
          })
        );
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      console.log("Providers trouvés :", results);
      this.providerResults = results;
    });
  }

  /* Recherche d'un utilisateur */
  searchUsers(): void {
    if (this.userSearch.length > 2) {
      this.searchUserSubject.next(this.userSearch);
    }
  }

  /* Sélection d'un utilisateur */
  selectUser(user: UserInterface) {
    this.selectedUser = user;
    this.userSearch = user.displayname || user.username;
    this.userResults = []; // Cache la liste après sélection
  }

  /* Recherche d'un provider */
  searchProviders(): void {
    if (this.providerSearch.length > 2) {
      this.searchProviderSubject.next(this.providerSearch);
    }
  }

  /* Sélection d'un provider */
  selectProvider(provider: ProviderInterface) {
    this.selectedProvider = provider;
    this.providerSearch = provider.displayName;
    this.providerResults = []; // Cache la liste après sélection
  }

  /* Fonction de liaison User <-> Provider avec confirmation */
linkUserToProvider() {
  if (!this.selectedUser || !this.selectedProvider) {
    console.error("Impossible de lier : utilisateur ou provider manquant.");
    return;
  }

  const url = this.app.setURL();
  const options = this.app.createCorsToken();

  this.userProviderService.linkUserToProvider(this.selectedUser.id, this.selectedProvider.id, url, options)
    .subscribe(response => {
      console.log("✅ Liaison réussie:", response);

      Swal.fire({
        title: "Succès!",
        text: `${this.selectedUser?.displayname || this.selectedUser?.username} a été associé à ${this?.selectedProvider?.display_name}.`,
        icon: "success",
        confirmButtonText: "OK"
      });

      // Réinitialisation des sélections
      this.selectedUser = null;
      this.selectedProvider = null;
      this.userSearch = "";
      this.providerSearch = "";

    }, error => {
      console.error("❌ Erreur lors de la liaison:", error);
      Swal.fire({
        title: "Erreur!",
        text: "Impossible d'associer l'utilisateur au provider.",
        icon: "error",
        confirmButtonText: "OK"
      });
    });
}


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
