import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostRequest } from '../shared/models/post-request';
import { PostService } from '../shared/service/post.service';

@Component({
  selector: 'app-postcreate',
  templateUrl: './postcreate.component.html',
  styleUrls: ['./postcreate.component.css']
})
export class PostcreateComponent implements OnInit {

  isLoading: Boolean;
  createPostForm: FormGroup;
  postRequest: PostRequest;

  constructor(
    private postService: PostService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      contentType: new FormControl(''),
      content: new FormControl('', Validators.required),
      privacy: new FormControl('', Validators.required)
    });
  }

  createPost(): void{
    if(this.createPostForm.valid){
      this.postRequest = new PostRequest(
        'TEXT',
        this.createPostForm.get('content').value,
        this.createPostForm.get('privacy').value
      );

      this.isLoading = true;

      this.postService.createPost(this.postRequest).subscribe(
        data =>{
          this.toastrService.success('POSTED');
          this.isLoading = false;
        }, err => {
          this.toastrService.error('SOMETHING WAS WRONG');
          this.isLoading = false;
        }
      );
    }
  }
}
