import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ],
})
export class NavbarComponent implements OnInit {
  author = environment.author;
  constructor() { }

  ngOnInit(): void {
  }

}
