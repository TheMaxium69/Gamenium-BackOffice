import {Component, Input, numberAttribute, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {BadgeInterface} from "../../-interface/badge.interface";
import {ApicallInterface} from "../../-interface/apicall.interface";
import {BadgeService} from "../../-service/badge.service";
import {AppComponent} from "../../app.component";
import {UserInterface} from "../../-interface/user.interface";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-badge-preview',
  templateUrl: './badge-preview.component.html',
  styleUrls: ['./badge-preview.component.css']
})
export class BadgePreviewComponent implements OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input({transform: numberAttribute})
  public id: number|null = null;

  badgeSelected: BadgeInterface | undefined;
  usersHaveBadge: UserInterface[] = [];

  displayedColumns: string[] = ['id', 'displayname', 'badge'];
  dataSource = new MatTableDataSource<UserInterface>(this.usersHaveBadge);

  constructor(
    protected app: AppComponent,
    private badgeService: BadgeService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.id = changes['id'].currentValue;
      if (this.id) {
        this.getBadge(this.id);
      }
    }
  }

  getBadge(id: number) {
    this.badgeService.getUserWithBadge(id, this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
      if (response.message === "good") {
        this.badgeSelected = response.result;
        this.usersHaveBadge = response.result2;
        this.dataSource = new MatTableDataSource<UserInterface>(this.usersHaveBadge);
        this.dataSource.paginator = this.paginator;
      } else {
        console.log("une erreur est survenue");
      }
    })
  }
}
