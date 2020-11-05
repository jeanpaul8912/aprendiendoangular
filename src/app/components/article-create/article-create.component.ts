import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css'],
  providers: [ArticleService]
})
export class ArticleCreateComponent implements OnInit {

  public article: Article;
  public articleService: ArticleService;
  public status: String;
  public page_title: string;
  public url: string;
  public is_edit: boolean;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: Global.url+'upload-image'
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
    private _router: Router
  ) {
    this.article = new Article('', '', '', null, null);
    this.page_title = 'Crear Articulo';
    this.url = Global.url;
    this.is_edit = false;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.article);
    this._articleService.create(this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success';
          this._router.navigate(['/blog']);

          Swal.fire(
              "Articulo Creado",
              "El articulo fue creado correctamente!",
              "success"
              );
              
              
        } else {
          console.log('Error: ' + response.message);
          this.status = 'error';
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