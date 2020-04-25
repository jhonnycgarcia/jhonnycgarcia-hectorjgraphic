import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../services/projects.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subscription, of } from 'rxjs';
import { take, catchError} from 'rxjs/operators';

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
  imageAfsUrl: Observable<string>;  // Evento al cual subcribirse para obtener el link
  subscription: Subscription; // Subscripcion al evento de firebase para obtener URL de la imagen

  constructor(
    private storage: AngularFireStorage
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
  closeWaitParent() {
    if (this.waitParent) {  // Si el padre aun esta esperando
      this.waitParentEvent.emit(false);
    }
  }

 /**
  * Obtener cadena de string con la direccion de la imagen
  */
  getImageSrc() {
    const path = this.item.path + this.item.imageSuffix + '/' + this.item.cover + this.item.imageExtention;
    const ref = this.storage.ref(path);
    this.imageAfsUrl = ref.getDownloadURL();

    this.subscription = this.imageAfsUrl
      .pipe(
        catchError((err) => { // Capturar error
          switch (err.code) {
            case 'storage/retry-limit-exceeded':  // Excede limite de espera
              console.error(`(${this.item.cover})`, err.message_);
              this.errorMessage = 'Try to reload the page';
              break;
            case 'storage/object-not-found':  // No se encontro el objeto
              console.error(`(${this.item.cover})`, err.message_);
              break;
          }
          return of(null);  // Retornar vacio
        }),
        take(1))  // Tomar una sola peticion
      .subscribe((data) => {
        if (!data) {  // No se consigieron datos
          this.showErrorImage();  // Mostrar mensaje de error
        }else{  // Obtiene respuesta
          this.imageUrlPath = data; // Asignar URL del cover a la imagen
        }
      });
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

  ngOnDestroy() {
    this.subscription.unsubscribe();  // Dejar de escuchar evento de firebase
  }
}
