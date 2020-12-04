import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from '../shared/models/post-response';
import { PostService } from '../shared/service/post.service';

@Component({
  selector: 'app-postboard',
  templateUrl: './postboard.component.html',
  styleUrls: ['./postboard.component.css']
})

export class PostboardComponent implements OnInit {

  isLoading: Boolean;
  isPosting: Boolean;
  allPosts: Array<PostResponse>;  
  allFollowPosts: Array<PostResponse>;  
  panelOpenState: Boolean;

  constructor(
    private postService: PostService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadAllPost();
  }

  postingChangeState(): void{
    this.isPosting = !this.isPosting;
  }

  reloadPost(){
    this.loadAllPost();
    this.loadAllFollowPost();
  }

  loadAllPost(){
    this.isLoading = true;
    this.postService.getAllPost().subscribe(
      data => {
        this.allPosts = data;
        this.isLoading = false
      }, err => {
        this.toastrService.error('WE CAN´T LOAD POSTS');
        this.isLoading = false;
      }
    );
  }

  loadAllFollowPost(){
    this.isLoading = true;
    this.postService.getAllFollowPost().subscribe(
      data => {
        this.allFollowPosts = data;
        this.isLoading = false
      }, err => {
        this.toastrService.error('WE CAN´T LOAD POSTS');
        this.isLoading = false;
      }
    );
  }
}
