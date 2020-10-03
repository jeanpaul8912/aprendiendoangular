import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public url: string;
  public article: Article;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    public _articleService: ArticleService
  ) { 
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._articleService.getArticle(id).subscribe(
        response => {
          if(response.article){
            this.article = response.article;
          } else {
            this._router.navigate(['/home']);
          }
        },error => {
          console.log(error);
          this._router.navigate(['/home']);
        }
      );
    });    
  }
}