import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ],
})
export class FooterComponent implements OnInit {

  author = environment.author;
  instagram = environment.instagram;
  behance = environment.behance;
  anio: number;
  constructor() {
    this.anio = new Date().getFullYear();
  }

  ngOnInit(): void {
  }

}
