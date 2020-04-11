import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: [
  ],
})
export class InicioComponent implements OnInit {
  author = environment.author;  // Almacenar autor
  showInit = false; // Mostrar inicio
  constructor() { }

  ngOnInit(): void {}

}
