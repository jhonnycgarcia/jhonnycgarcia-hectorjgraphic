import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../services/projects.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: [],
})
export class TarjetasComponent implements OnInit {
  @Input() waitParent: boolean;
  @Input() item: Project;

  @Output() itemDetails = new EventEmitter<string>();
  @Output() waitParentEvent = new EventEmitter<boolean>();

  showCard = false;
  imageDefault = 'assets/img/system/screenWait.png';
  showDefault = true;
  showWait = true;
  showErrorMessage = false;
  disableButton = true;  // Habilitar o Inhabilitar boton

  constructor() { }

  ngOnInit(): void {}

  defaultLoadCompleted(){
    this.closeWaitParent();
    this.verifyShowCard();
  }

  verifyShowCard(): void{
    if (!this.showCard) {
      this.showCard = true;
    }
  }

  /**
   * Event Emitter para notificar al padre que ya se cargo el primer contenido
   */
  closeWaitParent() {
    if (this.waitParent) {  // Si el padre aun esta esperando
      this.waitParentEvent.emit(false);
    }
  }

 /**
  * Obtener cadena de string con la direccion de la imagen
  */
  getImageSrc() {
    return this.item.path + this.item.cover + this.item.imageExtention;
  }

  /**
   * Mostrar ficha detallada de la Ilustracion
   */
  showDetails(): void {
    this.itemDetails.emit(this.item.id);
  }

  showImage(): void{
    this.verifyShowCard();
    this.closeWaitParent();
    this.showWait = false;
    this.showDefault = false;
    this.disableButton = !this.disableButton;
  }
  
  showErrorImage(): void{
    this.closeWaitParent();
    this.showWait = false;
    this.showErrorMessage = true;
    this.disableButton = !this.disableButton;
  }

}
