import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() waitParent: boolean; // Variable del padre que indica si se encuentra esperando
  @Output() waitLoaded = new EventEmitter(); // Evento par indicarle al padre que ya se cargo un elemento
  imageDefault = 'assets/img/system/screenWaitcarousel.png';  // Imagen por defecto
  showDefault = true; // Mostrar imagen por defecto
  wait = true;  // Loop de espera
  error = false;  // Mostrar mensaje de error

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Evento para mostrar la imagen correspondiente cuando esta termine de cargar
   */
  showImage(){
    this.stopWait();
    this.wait = false;
    this.showDefault = false;
  }

  /**
   * Funcion para mostrar el mensaje de error al no poder cargar la imagen
   */
  showError(){
    this.wait = false;
    this.error = true;
  }

  /**
   * Evento para indicarle al padre, solo una vez,
   * que detenga el loop de esperar al hijo
   */
  stopWait(): void{
    if (this.waitParent) {
      this.waitLoaded.emit();
    }
  }

}
