import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Project, ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: [],
})
export class TarjetasComponent implements OnInit, OnDestroy {
  @Input() waitParent: boolean; // Mostrar evento de carga del padre
  @Input() item: Project; // Item injectado para renderizar

  @Output() itemDetails = new EventEmitter<string>(); // Evento para obtener mas detalles del elemento
  @Output() waitParentEvent = new EventEmitter<boolean>();  // Evento para notificar al padre sobre la carga

  showCard = false; // Mostrar la tarjeta
  imageDefault = 'assets/img/system/screenWait.png';  // Direccion de la imagen por defecto
  showDefault = true; // Mostrar imagen por defecto
  showWait = true; // Mostrar icono de espera
  showErrorMessage = false; // Mostrar mensaje de error
  errorMessage = 'Not Found'; // Mensaje de error
  disableButton = true;  // Habilitar o Inhabilitar boton
  imageUrlPath: string; // Link de la imagen a traves de Firebase

  constructor(
    private service: ProjectsService
  ) { }

  ngOnInit(): void {
    this.getImageSrc(); // Obtener URL del cover
  }

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
  closeWaitParent(): void {
    if (this.waitParent) {  // Si el padre aun esta esperando
      this.waitParentEvent.emit(false);
    }
  }

 /**
  * Obtener cadena de string con la direccion de la imagen
  */
  getImageSrc(): void {
    const path = this.item.path + this.item.imageSuffix + '/' + this.item.cover + this.item.imageExtention;
    this.service.getImgUrlToFirebase(path)
    .subscribe(
      (url) => this.imageUrlPath = url // Asignar URL del cover a la imagen
      , (err) => {
        if (err.code === 'storage/retry-limit-exceeded') {
          this.errorMessage = 'Try to reload the page';
        }
        this.showErrorImage();  // Mostrar mensaje de error
      }
    );
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
    this.disableButton = false;
  }

  showErrorImage(): void{
    this.closeWaitParent();
    this.showWait = false;
    this.showErrorMessage = true;
    this.disableButton = false;
  }

  ngOnDestroy() { }
}
