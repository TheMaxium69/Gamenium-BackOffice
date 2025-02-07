import { Component, OnInit } from '@angular/core';
import { UserProviderInterface } from 'src/app/-interface/userProvider.interface';
import { UserProviderService } from 'src/app/-service/user-provider.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-provider-list',
  templateUrl: './user-provider-list.component.html',
  styleUrls: ['./user-provider-list.component.css']
})
export class UserProviderListComponent implements OnInit {
  userProviders: UserProviderInterface[] = [];

  constructor(
    private userProviderService: UserProviderService,
    protected app: AppComponent
  ) {}

  ngOnInit() {
    this.fetchUserProviders();
  }

  /** Recupere User link avec provider */
  fetchUserProviders() {
    const url = this.app.setURL();
    const options = this.app.createCorsToken();

    this.userProviderService.getUserProviders(url, options).subscribe(
      response => {
        console.log(response)
        // this.userProviders = response
      },
      error => {
        console.error("❌ Error fetching user-provider associations:", error);
      }
    );
  }

  /** Confirm de vouloir supprimer un lien */
  confirmDeleteUserProvider(userId: number, providerId: number) {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Ce lien utilisateur-provider sera supprimé définitivement.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer!",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUserProvider(userId, providerId);
      }
    });
  }

  /** Supprime un lien */
  deleteUserProvider(userId: number, providerId: number) {
    const url = this.app.setURL();
    const options = this.app.createCorsToken();

    this.userProviderService.deleteUserProvider(userId, providerId, url, options).subscribe(
      () => {
        Swal.fire("Supprimé!", "Le lien utilisateur-provider a été supprimé.", "success");
        this.fetchUserProviders(); // Rafraichis la liste
      },
      error => {
        Swal.fire("Erreur", "Impossible de supprimer ce lien.", "error");
        console.error("❌ Error deleting user-provider association:", error);
      }
    );
  }
}
