import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-role-one',
  templateUrl: './role-one.component.html',
  styleUrls: ['./role-one.component.css']
})
export class RoleOneComponent implements OnInit {

  ROLE_NAME: string | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.ROLE_NAME = this.route.snapshot.paramMap.get('name');
  }
}
