import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../_services/articles.service";
import {Articles} from "../_models/articles";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
   articles: Articles[]=[];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.getAllArticles()
  }


getAllArticles(){
    this.articlesService.getArticle().subscribe(data=>{
      this.articles = data
      console.log(this.articles)
    })
}
}
