import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-comment-reply-one',
  templateUrl: './comment-reply-one.component.html',
  styleUrls: ['./comment-reply-one.component.css']
})
export class CommentReplyOneComponent  implements OnInit {

  id: string | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
