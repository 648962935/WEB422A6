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

  constructor(private postData: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.querySub = this.route.params.subscribe(params =>{
      this.postData.getPostById(params['id']).subscribe(data => this.post = data);
    });

  }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }

}
