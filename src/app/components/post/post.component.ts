import { Component, Input, OnInit } from '@angular/core';
import { PostResponse } from '../shared/models/post-response';
import * as moment from 'moment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() postResponse: PostResponse;

  constructor() {
  }

  ngOnInit(): void {
    this.postResponse.date = moment(this.postResponse.date).fromNow();
  }

}
