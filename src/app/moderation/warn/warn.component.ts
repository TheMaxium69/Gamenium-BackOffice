import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { WarnInterface } from 'src/app/-interface/warn.interface';
import { WarnService } from 'src/app/-service/warn.service';
import { AppComponent } from 'src/app/app.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule]
})
export class WarnComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['ID', 'Signalé par', 'Motif', 'Objet', 'Date du signalement', 'Description'];
  allWarns: WarnInterface[] = [];
  dataSource = new MatTableDataSource<WarnInterface>(this.allWarns);
 
 constructor(
  private warnService: WarnService,
  private app:AppComponent
 ){}


 ngOnInit(): void {
   this.getAllWarn()
 }

 @ViewChild(MatPaginator) paginator: MatPaginator;

 ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
 }
 

 getAllWarn(){
  this.warnService.getAllWarn(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {
    message: string, result:WarnInterface[]}) => {
      if(response.message === "good"){
        this.allWarns = response.result;
      } else {
        console.log('erreur recupération warns' + response.message);
      }
    })
 }
}
