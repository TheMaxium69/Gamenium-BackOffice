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
export class WarnComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  displayedColumns: string[] = ['id', 'warn_by', 'why', 'object', 'date_at', 'content', 'manage'];
  allWarns: WarnInterface[] = [];
  dataSource = new MatTableDataSource<WarnInterface>(this.allWarns);

  constructor(
    private warnService: WarnService,
    private app:AppComponent,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllWarn()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getAllWarn(){
   this.warnService.getAllWarn(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {
     message: string, result:WarnInterface[]}) => {
       if(response.message === "good"){
         this.allWarns = response.result;
         this.dataSource = new MatTableDataSource<WarnInterface>(this.allWarns);
       } else {
         console.log('erreur recupération warns' + response.message);
       }
     })
  }

  manage(id:number) {
    this.router.navigateByUrl("/warnedItem/" + id);
  }

}
