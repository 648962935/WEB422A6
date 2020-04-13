import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {

  constructor(private data : PostService, private router: Router) { }

  blogPosts: Array<BlogPost> = [];

  ngOnInit(): void {
    this.data.getAllPosts().subscribe(data => this.blogPosts = data);
  }

  rowClicked(e, id) {
    this.router.navigate(['admin/post', id]);
  }

}
