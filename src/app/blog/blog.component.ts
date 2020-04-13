import { Component, OnInit } from '@angular/core';
import blogData from '../blogData.json';
import { BlogPost } from '../BlogPost';
 import { PostService } from '../post.service.js';
 import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

blogPosts: Array<BlogPost>;

page:number = 1;
tag:string = null;
category:string = null;
querySub: any;

   constructor(private postData: PostService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {

    this.querySub = this.route.queryParams.subscribe(params => {

      if (params['tag']) {
        this.tag = params['tag'];
        this.category = null;
      }else{
        this.tag = null;
      }

      if (params['category']) {
        this.category = params['category'];
        this.tag = null;
      }else{
        this.category = null;
      }
      
      this.getPage(+params['page'] || 1);
    });

  }

  getPage(num){
    this.postData.getPosts(num, this.tag, this.category).subscribe(data =>{
      if(data.length > 0){
        this.blogPosts = data;
        this.page=num;
        // Extra Challenge
        window.scrollTo(0,0);
      }
    });
}

  

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }

}
