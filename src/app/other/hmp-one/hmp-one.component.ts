import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hmp-one',
  templateUrl: './hmp-one.component.html',
  styleUrls: ['./hmp-one.component.css']
})
export class HmpOneComponent implements OnInit {

  id: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}

