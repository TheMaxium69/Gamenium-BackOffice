import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {WarnInterface} from "../../-interface/warn.interface";
import {MatTableDataSource} from "@angular/material/table";
import {WarnService} from "../../-service/warn.service";
import {AppComponent} from "../../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-warn-search',
  templateUrl: './warn-search.component.html',
  styleUrls: ['./warn-search.component.css']
})
export class WarnSearchComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Input() displayedColumns: string[] = ['id'];
  @Input() admin!: boolean;
  allWarns: WarnInterface[] = [];
  dataSource = new MatTableDataSource<WarnInterface>(this.allWarns);

  constructor(
    private warnService: WarnService,
    protected app:AppComponent,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllWarn()
  }

  getAllWarn(){
    if (this.admin){

      this.warnService.getAllWarnAdmin(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {
        message: string, result:WarnInterface[]}) => {
        if(response.message === "good"){
          this.allWarns = response.result;
          this.dataSource = new MatTableDataSource<WarnInterface>(this.allWarns);
          this.dataSource.paginator = this.paginator;
        } else {
          console.log('erreur recupération warns' + response.message);
        }
      })

    } else {

      this.warnService.getAllWarn(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {
        message: string, result:WarnInterface[]}) => {
        if(response.message === "good"){
          this.allWarns = response.result;
          this.dataSource = new MatTableDataSource<WarnInterface>(this.allWarns);
          this.dataSource.paginator = this.paginator;
        } else {
          console.log('erreur recupération warns' + response.message);
        }
      })

    }
  }

  toggleManage(id: number) {

    this.warnService.updateWarn(id, this.app.setURL(), this.app.createCorsToken()).subscribe((response: {message:string, result:WarnInterface}) => {

      if (response.message === "good") {
        let warnSelected: WarnInterface = response.result;

        let warnSelectedItem = this.allWarns.find(warn => warn.id === id);
        if (warnSelectedItem) {
          warnSelectedItem.is_manage = warnSelected.is_manage;
        }

      } else {
        console.log("une erreur est survenue");
      }


    })

  }

}
