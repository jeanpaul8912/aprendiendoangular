import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public searchString: String;

  constructor(
    private _router: Router
  ) {}

  ngOnInit(): void {
  }

  onSubmit(){
    this._router.navigate(['/buscar', this.searchString])
  }

}