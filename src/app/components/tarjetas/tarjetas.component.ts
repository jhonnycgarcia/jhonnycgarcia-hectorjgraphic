import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Project, ProjectsService } from '../../services/projects.service';
import { Observable, throwError } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: [],
})
export class TarjetasComponent implements OnInit, OnDestroy {
  @Input() waitParent: boolean; // Mostrar evento de carga del padre
  waitParentCalled = false; // Validar si se ha llamado anteriormente al evento padre

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
  imageUrlPath: string; // Link de la imagen a traves del servidor remoto

  constructor(
    private service: ProjectsService
  ) { }

  ngOnInit(): void {
    this.getImageSrc(); // Obtener URL del cover
  }

  /**
   * La imagen por defecto se ha cargado completamente
   */
  defaultLoadCompleted(){
    this.closeWaitParent();
    this.verifyShowCard();
  }

  /**
   * Verificar si la tarjeta ha sido mostrada
   */
  verifyShowCard(): void{
    if (!this.showCard) {
      this.showCard = true;
    }
  }

  /**console.log('Evento padre ===> ', this.waitParent);
   * Event Emitter para notificar al padre que ya se cargo el primer contenido
   */
  closeWaitParent(): void {
    if (this.waitParent && !this.waitParentCalled) {  // Si el padre aun esta esperando
      setTimeout(() => this.waitParentEvent.emit(false), 0 ); // El padre deje de esperar
      this.waitParentCalled = true;  // No ejecutar mas
    }
  }

  /**
   * Funcion para validar el origen de la imagen
   */
  validateLocation(): Observable<string | null>{
    switch (true) {
      case (this.item.firebaseLocation):  // Proviene de FirebaseStorage
        const path = this.item.path + this.item.cover + this.item.imageExtention;
        return this.service.getImgUrlToFirebase(path);
      case (this.item.googleDriveLocation): // Proviene de GoogleDrive
        return this.service.getImgUrlToGoogleDrive(this.item.cover);
      default:
        return throwError(`Default result when try to get URL of the image Cover ${this.item.firebaseLocation}`);
    }
  }

  /**
   * Obtener SRC de la imagen
   */
  getImageSrc(): void {
    this.validateLocation()  // Validar origen de la imagen
    .pipe( take(1) )
      .subscribe(
        (url) => this.imageUrlPath = url,
        (err) => this.showErrorImage()
      );
  }

  /**
   * Mostrar ficha detallada de la Ilustracion
   */
  showDetails(): void {
    this.itemDetails.emit(this.item.id);
  }

  /**
   * Funcion para mostrar la imagen de la tarjeta
   * al culminar el proceso de carga
   */
  showImage(): void{
    this.verifyShowCard();  // Verificar si se mostro la tarjeta
    this.closeWaitParent(); // Cerrar loop de espera del padre
    this.showWait = false;  // Ocultar efecto de carga
    this.showDefault = false; // Ocultar imagen por defecto
    this.disableButton = false; // Habilitar boton
  }

  showErrorImage(): void{
    this.closeWaitParent(); // Cerrar loop de espera del padre
    this.showWait = false; // Ocultar efecto de carga
    this.showErrorMessage = true; // Mostrar mensaje de error
    this.disableButton = false; // Habilitar boton
  }

  ngOnDestroy() { }
}
