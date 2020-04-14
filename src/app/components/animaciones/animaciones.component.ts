import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animaciones',
  templateUrl: './animaciones.component.html',
  styles: [
  ],
})
export class AnimacionesComponent implements OnInit {

  sectionTitle = 'Animaciones';
  sectionCategory = 'animation';
  sectionRouter = 'animacion';

  constructor() { }

  ngOnInit(): void {
  }

}
