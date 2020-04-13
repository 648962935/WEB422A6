import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import {PostService} from '../post.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {

  post: BlogPost;
  querySub: any;

  commentName: string;
  commentText: string;

  constructor(private postData: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.querySub = this.route.params.subscribe(params =>{
      this.postData.getPostById(params['id']).subscribe(data => {
        this.post = data;
        this.post.views++;
        this.postData.updatePostById(this.post._id, this.post).subscribe();
      });
    });

  }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }

  submitComment() {
    this.post.comments.push({author: this.commentName, comment: this.commentText, date: new Date().toLocaleDateString()});
    this.postData.updatePostById(this.post._id, this.post).subscribe(data => {
      this.commentName = "";
      this.commentText = "";
    })

  }

}
