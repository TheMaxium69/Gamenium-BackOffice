import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";
import {UserInterface} from "../../-interface/user.interface";
import {catchError, debounceTime, of, Subject, switchMap, takeUntil} from "rxjs";
import {AdministrationService} from "../../-service/administration.service";
import {MatPaginator} from "@angular/material/paginator";
import {WarnInterface} from "../../-interface/warn.interface";
import {MatTableDataSource} from "@angular/material/table";
import {ApicallInterface} from "../../-interface/apicall.interface";
import Swal from "sweetalert2";
import {BadgeInterface} from "../../-interface/badge.interface";
import {BadgeService} from "../../-service/badge.service";

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, OnDestroy{
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input()
  public displayedColumns: string[] = ['id'];
  @Input()
  public profilRequest!: boolean;
  @Input()
  public statRequest!: boolean;

  private unsubscribe$ = new Subject<void>();
  private searchProfilSubject = new Subject<string>();

  searchValue: string = '';
  users: UserInterface[] = [];
  dataSource = new MatTableDataSource<UserInterface>(this.users);
  badgeAll:BadgeInterface[] = [];

  constructor(protected app:AppComponent,
              private administrationService:AdministrationService,
              private badgeService:BadgeService) {}

  ngOnInit() {

    /* SET SEARCH PROFIL */
    this.searchProfilSubject.pipe(
      debounceTime(this.app.deadlineSearch),
      // distinctUntilChanged(),
      switchMap((searchValue) => {
        if (this.profilRequest){

          return this.administrationService.searchProfilsAdmin(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
            catchError((error) => {
              console.error('Une erreur s\'est produite lors de la recherche : ', error);
              return of([]);
            })
          );

        } else if (this.statRequest) {

          return this.administrationService.searchProfilViewAdmin(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
            catchError((error) => {
              console.error('Une erreur s\'est produite lors de la recherche : ', error);
              return of([]);
            })
          );

        } else {

          return this.administrationService.searchUsersAdmin(searchValue, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).pipe(
            catchError((error) => {
              console.error('Une erreur s\'est produite lors de la recherche : ', error);
              return of([]);
            })
          );

        }
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe((results: any) => {
      this.users = results;
      this.dataSource = new MatTableDataSource<UserInterface>(this.users);
      this.dataSource.paginator = this.paginator;
    });


    this.searchUser()

    if (this.profilRequest){
      this.getBadges()
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  searchUser(): void {
    this.users = [];
    this.searchProfilSubject.next(this.searchValue);
  }

  addRole(id_user:number, role:string){

    this.administrationService.addRoleAdmin(id_user, role, this.app.setURL(), this.app.createCorsToken()).subscribe((response:ApicallInterface) => {

      if (response.message == "Role added successfully"){
        const user = this.users.find(user => user.id === id_user);
        if (user) {
          user.roles.push(role);

          if (id_user == this.app.userConnected.id) {
            this.app.userConnected.userRole.push(role);
          }
        }

      } else {
        console.error(response);
      }

    })
  }

  removeRole(id_user:number, role:string){

    this.administrationService.removeRoleAdmin(id_user, role, this.app.setURL(), this.app.createCorsToken()).subscribe((response:ApicallInterface) => {

      if (response.message == "Role remove successfully"){
        const user = this.users.find(user => user.id === id_user);
        if (user) {
          user.roles = user.roles.filter(r => r !== role);

          if (id_user == this.app.userConnected.id) {
            this.app.userConnected.userRole = this.app.userConnected.userRole.filter((r: string) => r !== role);
          }
        }

      } else {
        console.error(response);
      }

    })
  }

  isBan(roles: string[]) {
    return roles.includes("ROLE_BAN");
  }

  toggleBan(user_id:number, ban:boolean) {

    if (ban) {


      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Souhaitez-vous vraiment bannire cette utilisateur ?",
        icon: "question",
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Bannire`,
        cancelButtonText: `Annuler`,
      }).then((result) => {
        if (result.isDenied) {
          this.toggleBanConfirm(user_id, true);
        }
      });

    } else {

      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Souhaitez-vous vraiment debannire cette utilisateur ?",
        icon: "question",
        showConfirmButton: false,
        showDenyButton: true,
        showCancelButton: true,
        denyButtonText: `Debannire`,
        cancelButtonText: `Annuler`,
      }).then((result) => {
        if (result.isDenied) {
          this.toggleBanConfirm(user_id, false);
        }
      });


    }


  }

  toggleBanConfirm(user_id:number, ban:boolean) {
    this.administrationService.toggleBanAdmin(user_id, this.app.setURL(), this.app.createCorsToken()).subscribe((response:ApicallInterface) => {

      if (response.message == "toggle ban successfully"){
        if (ban) {
          Swal.fire("Bannie!", "Utilisateur Bannie", "success");
        } else {
          Swal.fire("Debannie!", "Utilisateur Debannie", "success");
        }
        const user = this.users.find(user => user.id === user_id);
        if (user) {
          if (!user.roles.includes("ROLE_BAN")) {
            user.roles.push("ROLE_BAN");
          } else {
            user.roles = user.roles.filter((r: string) => r !== "ROLE_BAN");
          }
        }

        this.dataSource = new MatTableDataSource<UserInterface>(this.users);
      }

    });
  }

  getBadges() {

    this.badgeService.getBadgeAll(this.app.setURL(), this.app.createCorsToken()).subscribe((response:ApicallInterface) => {

      if (response.message === "good") {
        this.badgeAll = response.result;
      } else {
        console.error(response);
      }

    });

  }

  toggleBadge(id_user:number, badge: any) {
    this.badgeService.toggleBadge(badge.id, id_user, this.app.setURL(), this.app.createCorsToken()).subscribe((response:ApicallInterface) => {
      if (response.message === "add success") {

        const user = this.users.find(user => user.id === id_user);
        if (user && user.badges) {
          user.badges.push(badge);
        }

      } else if (response.message === "delete success") {

        const user = this.users.find(user => user.id === id_user);
        if (user && user.badges) {
          user.badges = user.badges.filter(b => b.id !== badge.id);
        }


      } else {
        console.error(response);
      }



    })
  }


  haveBadge(badgeAllUser: { id:number }[], oneBadge: BadgeInterface): boolean {

    for (const badge of badgeAllUser) {
      if (badge.id === oneBadge.id) {
        return false; // Le badge est présent
      }
    }
    return true;

  }
}
