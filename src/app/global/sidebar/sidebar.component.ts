import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              protected app:AppComponent) {}

  isUnrolled= false;
  whichUnrolled:string = "";

  toggleUnrolled(which:string) {
    if (this.whichUnrolled == which && this.isUnrolled) {
      this.isUnrolled = false;
      this.whichUnrolled = "";
    } else if (this.whichUnrolled != which) {
      this.isUnrolled = true;
      this.whichUnrolled = which;
    }
  }







}
