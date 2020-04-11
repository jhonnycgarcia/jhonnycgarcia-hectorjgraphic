import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ilustracion-tarjeta',
  templateUrl: './ilustracion-tarjeta.component.html',
  styleUrls: []
})

export class IlustracionTarjetaComponent implements OnInit {

  @Input() illustration: any = {};
  showCard = false; // Mostrar tarjeta
  imageDefault = 'assets/img/system/screenWait.png';
  showDefault = true; // Mostrar imagen por defecto
  showWait = true;  // Mostrar icono de espera
  showErrorMessage = false; // Mostrar mensaje de error
  disableButton = true;  // Habilitar o Inhabilitar boton

  constructor( private router: Router) {}

  ngOnInit(): void {}

  /**
   * Mostrar imagen al culminar su carga
   */
  showImage(){
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
  showIllustrationDetails(): void{
    this.router.navigate(['/ilustracion', this.illustration.id]);
  }

}
