import {Component, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";
import {GameService} from "../../-service/game.service";
import {TestService} from "../../-service/test.service";
import {MatTableDataSource} from "@angular/material/table";
import {TestInterface} from "../../-interface/test.interface";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor(
    protected app:AppComponent,
    private gameService:GameService,
    private testService:TestService,
  ) { }


  game_id: number | null = null;
  gameSearch: string = "";
  gameResults: any[] = [];


  displayedColumns: string[] = ['id', 'game', 'note', 'content', 'test_at', 'user'];
  tests: TestInterface[] = [];
  dataSource = new MatTableDataSource<TestInterface>(this.tests);


  ngOnInit(): void {
    this.testService.getTestAll(this.app.fetchLimit, this.app.setURL(), this.app.createCorsToken()).subscribe(testsAll => {
      this.tests = testsAll;
      this.dataSource = new MatTableDataSource<TestInterface>(this.tests);
      this.dataSource.paginator = this.paginator;
    });
  }


  getTests(id:number){

    this.testService.getTestByGame(id, this.app.setURL(), this.app.createCorsToken()).subscribe((response:{message:string,result:TestInterface[]}) => {

      if (response.message === "good"){

        this.tests = response.result;
        this.dataSource = new MatTableDataSource<TestInterface>(this.tests);
        this.dataSource.paginator = this.paginator;

      } else {
        console.error(response)
      }


    })

  }


  // Recherche de jeux
  searchGames() {
    if (this.gameSearch.length > 2) { // Démarre recherche après 3 caractère
      const url = this.app.setURL();
      const option = this.app.createCorsToken();
      const body = {
        searchValue: this.gameSearch,
        limit: 10
      };

      this.gameService.searchGames(body, url, option).subscribe(response => {
        this.gameResults = response;
      });
    }
  }

  selectGame(game: any) {
    this.game_id = game.id;
    this.gameSearch = game.name; // montre le nom du jeux
    this.gameResults = []; // cache la liste apres
    this.getTests(game.id);
  }
}
