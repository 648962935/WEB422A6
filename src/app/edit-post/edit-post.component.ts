import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor(private data : PostService, private route: ActivatedRoute, private router: Router) { }

  blogPost: BlogPost;
  tags: String;

  ngOnInit() {
    this.data.getPostById(this.route.snapshot.params['id'])
    .subscribe(data => {
      this.blogPost = data;
      this.tags = this.blogPost.tags.toString();
    });
  }

  updatePost() {    
    this.tags.split(",").map(tag => tag.trim());

    this.data.updatePostById(this.blogPost._id, this.blogPost)
    .subscribe(data => { 
      this.router.navigate(['admin']) 
    });
  }

  deletePost(){
    this.data.deletePostById(this.blogPost._id)
    .subscribe(data => { 
      this.router.navigate(['admin']) 
    });
  }


}
