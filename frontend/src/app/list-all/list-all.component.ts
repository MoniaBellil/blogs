import { Component, OnInit } from '@angular/core';
import { blogService } from '../service/blog.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Blog } from '../Model/blog';
@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss']
})
export class ListALLComponent implements OnInit {
  blogList: Blog[] = [];
  allBlogs: Blog[] = [];
  searchBlogList: Blog[] = [];
  selectedblog: any;
  searchText:'';
  style:any;
  constructor(private blogService: blogService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.blogService.getAllblogs(null).subscribe(result => {
      if (result) {
        this.allBlogs=result.data;
        this.blogList = this.allBlogs;
      }
    });
  }
  SearchResult(){
    console.log(this.searchText)
    if(this.SearchResult!=undefined)
    {
      this.searchBlogList=[];
      for(let blog of this.allBlogs){
        if(blog.title.indexOf(this.searchText)>-1 || blog.author.indexOf(this.searchText)>-1 ||blog.content.indexOf(this.searchText)>-1)
        {
          this.searchBlogList.push(blog)
        }
      }
      this.blogList=this.searchBlogList;
    }
    else
    {
      this.blogList=this.allBlogs;
    }
  }
  deleteblog() {
    console.log(this.selectedblog, 'xxxxxxxxxxx');
    this.blogService.deleteblog(this.selectedblog._id).subscribe(result => {
      if (result) {
        this.getAll();
      }
    });
  }

  selectblog(blog) {
    console.log(blog, 'xxxxxxxxxxx');
    this.selectedblog = blog;
  }

  downVote(blog) {
    const formData = new FormData();
    formData.append('author', blog.author);
    formData.append('title', blog.Title);
    formData.append('content', blog.content);
    formData.append('profileImg', blog.profileImg);
    if(!isNaN(parseInt(blog.downvote)))
      formData.append('downvote', (parseInt(blog.downvote)+1).toString());
    else
      formData.append('downvote', "1");
    this.blogService.editblog(blog._id, formData).subscribe(result => {
      if (result.status) {
        this.toastr.success("Down Vote successful !");
        this.ngOnInit();
      } else {
        this.toastr.error(result.msg);
      }
      });
    }

    upVote(blog) {
      const formData = new FormData();
      formData.append('author', blog.author);
      formData.append('title', blog.Title);
      formData.append('content', blog.content);
      formData.append('profileImg', blog.profileImg);
      if(!isNaN(parseInt(blog.upvote)))
        formData.append('upvote', (parseInt(blog.upvote)+1).toString());
      else
        formData.append('upvote', "1");
      this.blogService.editblog(blog._id, formData).subscribe(result => {
        if (result.status) {
          this.toastr.success("Up Vote successful !");
          this.ngOnInit();
        } else {
          this.toastr.error(result.msg);
        }
        });
      }

      getBorderColor(blog){
        var upvote=0;
        if(!isNaN(parseInt(blog.upvote))){
          upvote=blog.upvote;
        }
        var downvote=0;
        if(!isNaN(parseInt(blog.downvote))){
          downvote=blog.downvote;
        }
        if(downvote<upvote)
        {
          return "4mm solid green";
        }
        else if(downvote>upvote){
          return "4mm solid red";
        }
      }
}
