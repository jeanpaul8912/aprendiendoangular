import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-create/article-create.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {

  public article: Article;
  public articleService: ArticleService;
  public status: String;
  public is_edit: boolean;
  public page_title: string;
  public url: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI: {
      url: Global.url + 'upload-image'
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Selecciona imagen...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
  };


  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.article = new Article('', '', '', null, null);
    this.is_edit = true;
    this.page_title = 'Editar Articulo';
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

  onSubmit() {
    console.log(this.article);
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';

          Swal.fire(
            'Articulo editado!',
            'El articulo se ha editado correctamente!',
            'success'
          );

          this._router.navigate(['/blog/articulo', this.article._id]);
        } else {
          console.log('Error: ' + response.message);
          this.status = 'error';
          Swal.fire(
            'Edición fallida!',
            'El articulo no se ha editado!',
            'error'
          );
        }
      },
      error => {
        console.log('Error: ' + error);
        this.status = 'error';
      }
    );
  }

  imageUpload(data){
    console.log(data.body);
    let image_data = data.body;
    this.article.image = image_data.image;
  }
}