import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ilustracion-tarjeta',
  templateUrl: './ilustracion-tarjeta.component.html',
  styleUrls: []
})

export class IlustracionTarjetaComponent implements OnInit {

  @Input() illustration: any = {};
  @Input() waitParent: boolean; // Variable del padre para el render de la espera

  showCard = false; // Mostrar tarjeta
  imageDefault = 'assets/img/system/screenWait.png';
  showDefault = true; // Mostrar imagen por defecto
  showWait = true;  // Mostrar icono de espera
  showErrorMessage = false; // Mostrar mensaje de error
  disableButton = true;  // Habilitar o Inhabilitar boton

  @Output() illustrationDetails = new EventEmitter<string>();
  @Output() waitParentEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Event Emitter para notificar al padre que ya se cargo el primer contenido
   */
  closeWaitParent(){
    if (this.waitParent) {  // Si el padre aun esta esperando
      this.waitParentEvent.emit(false);
      this.waitParentEvent.unsubscribe();
    }
  }

  /**
   * Obtener cadena de string con la direccion de la imagen
   */
  getImageSrc(){
    return this.illustration.path + this.illustration.cover + this.illustration.imageExtention;
  }

  /**
   * Mostrar imagen al culminar su carga
   */
  showImage(){
    this.closeWaitParent();
    setTimeout(() => {
      this.showWait = !this.showWait;
      this.showDefault = !this.showDefault;
      this.disableButton = !this.disableButton;
    }, 1500);
  }

  /**
   * Mostrar mensage de Error al no cargar la imagen
   */
  showErrorImage(){
    this.closeWaitParent();
    setTimeout(() => {
      this.showWait = !this.showWait;
      this.showErrorMessage = !this.showErrorMessage;
      this.disableButton = !this.disableButton;
      console.log('Error on load image');
    }, 1500);
  }

  /**
   * Mostrar ficha detallada de la Ilustracion
   */
  showDetails(): void{
    this.illustrationDetails.emit(this.illustration.id);
  }

}
