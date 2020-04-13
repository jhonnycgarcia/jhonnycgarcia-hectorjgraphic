import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-image',
  templateUrl: './carousel-image.component.html',
  styles: [
    '.img-fluid {max-height: 500px;}'
  ],
})
export class CarouselImageComponent implements OnInit {

  @Input() image: string; // Nombre de la iamgen
  @Input() title: string; // Titulo del proyecto
  @Input() imageSrc: string;  // Path de la imagen
  @Input() maxHeight: string; // MaxHeight definido para el CSS
  imageDefault = 'assets/img/system/screenWait.png';
  showDefault = true;
  wait = true;
  error = false;

  constructor() { }

  ngOnInit(): void {
  }

  showImage(){
    this.wait = false;
    this.showDefault = false;
  }

  showError(){
    this.wait = false;
    this.error = true;
  }

}
