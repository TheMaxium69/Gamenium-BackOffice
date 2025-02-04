import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { WarnInterface } from 'src/app/-interface/warn.interface';
import { WarnService } from 'src/app/-service/warn.service';
import { AppComponent } from 'src/app/app.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.css'],
})
export class WarnComponent implements OnInit{
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  displayedColumns: string[] = ['id', 'warn_by', 'why', 'type', 'object','date_at', 'content', 'manage'];
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

  manage(id:number) {
    this.router.navigateByUrl("/warnedItem/" + id);
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
