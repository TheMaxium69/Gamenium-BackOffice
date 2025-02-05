import {Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";
import {BadgeService} from "../../-service/badge.service";
import {BadgeInterface} from "../../-interface/badge.interface";
import {MatTableDataSource} from "@angular/material/table";
import {UserInterface} from "../../-interface/user.interface";
import {MatPaginator} from "@angular/material/paginator";
import {ApicallInterface} from "../../-interface/apicall.interface";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-badge',
  templateUrl: './list-badge.component.html',
  styleUrls: ['./list-badge.component.css']
})
export class ListBadgeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  allBadge:BadgeInterface[] = [];


  displayedColumns: string[] = ['id', 'badge', 'action'];
  dataSource =  new MatTableDataSource<BadgeInterface>(this.allBadge);

  constructor(protected app: AppComponent,
              private badgeService:BadgeService) {
  }

  ngOnInit() {

    this.badgeService.getBadgeAll(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {message:string, result:BadgeInterface[]}) => {
      if (response.message === "good") {
        this.allBadge = response.result;
        this.dataSource = new MatTableDataSource<BadgeInterface>(this.allBadge);
        this.dataSource.paginator = this.paginator;
      } else {
        console.log("une erreur est survenue");
      }
    });

  }

  removeBadge(id_badge:number){

    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Souhaitez-vous vraiment supprimer ce badge ?",
      icon: "question",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Supprimer`,
      cancelButtonText: `Annuler`,
    }).then((result) => {
      if (result.isDenied) {
        this.badgeService.removeBadge(id_badge, this.app.setURL(), this.app.createCorsToken()).subscribe((response:ApicallInterface) => {
          if (response.message == "good"){

            this.allBadge = this.allBadge.filter(badge => badge.id !== id_badge);
            this.dataSource = new MatTableDataSource<BadgeInterface>(this.allBadge);
            this.dataSource.paginator = this.paginator;

            Swal.fire("Supprimé!", "Badge supprimé", "success");
          } else {
            console.log(response);
            Swal.fire("Erreur", "Une erreur est survenue", "error");
          }
        }, (error) => this.app.erreurSubcribe());
      }
    });


  }



}
