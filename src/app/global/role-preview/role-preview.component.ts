import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {UserInterface} from "../../-interface/user.interface";
import {MatTableDataSource} from "@angular/material/table";
import {AppComponent} from "../../app.component";
import {MatPaginator} from "@angular/material/paginator";
import {AdministrationService} from "../../-service/administration.service";

@Component({
  selector: 'app-role-preview',
  templateUrl: './role-preview.component.html',
  styleUrls: ['./role-preview.component.css']
})
export class RolePreviewComponent implements OnChanges{
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input()
  public ROLE_NAME: string|null = null;

  usersHaveRole: UserInterface[] = [];

  displayedColumns: string[] = ['id', 'displayname', 'role'];
  dataSource = new MatTableDataSource<UserInterface>(this.usersHaveRole);

  constructor(
    protected app: AppComponent,
    private administrationService: AdministrationService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ROLE_NAME']) {
      this.ROLE_NAME = changes['ROLE_NAME'].currentValue;
      if (this.ROLE_NAME) {
        this.getRole(this.ROLE_NAME);
      }
    }
  }

  getRole(ROLE_NAME: string) {
    this.administrationService.getRoleOne(ROLE_NAME, this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).subscribe((response: any) => {
      this.usersHaveRole = response;
      this.dataSource = new MatTableDataSource<UserInterface>(this.usersHaveRole);
      this.dataSource.paginator = this.paginator;
    })
  }
}
