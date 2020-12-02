import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRequest } from '../models/post-request';
import { PostResponse } from '../models/post-response';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postApiUrl = 'http://localhost:8080/api/post';

  constructor(private httpClient: HttpClient) { }

  public createPost(postRequest: PostRequest): Observable<void>{
    return this.httpClient.post<void>(this.postApiUrl + "/", postRequest);
  }

  public getAllPost(): Observable<Array<PostResponse>>{
    return this.httpClient.get<Array<PostResponse>>(this.postApiUrl + "/");
  }

  public getAllFollowPost(): Observable<Array<PostResponse>>{
    return this.httpClient.get<Array<PostResponse>>(this.postApiUrl + "/follow");
  }
}
