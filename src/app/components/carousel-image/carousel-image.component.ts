import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectsService, Project, ImageOfProject } from '../../services/projects.service';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-carousel-image',
  templateUrl: './carousel-image.component.html',
  styles: [
    '.img-fluid {max-height: 500px;}'
  ],
})
export class CarouselImageComponent implements OnInit {

  @Input() detailParentData: Project; // Registro del proyecto
  @Input() image: ImageOfProject; // Arreglo de datos de la imagen
  @Input() maxHeight: string; // MaxHeight definido para el CSS
  @Input() waitParent: boolean; // Variable del padre que indica si se encuentra esperando
  @Output() waitLoaded = new EventEmitter(); // Evento par indicarle al padre que ya se cargo un elemento

  imageDefault = 'assets/img/system/screenWaitcarousel.png';  // Imagen por defecto
  showDefault = true; // Mostrar imagen por defecto
  imageWebPath: string; // Url WEB de la imagen

  wait = true;  // Loop de espera
  error = false;  // Mostrar mensaje de error
  errorMessage = 'Not found!'; // Mensaje de error

  constructor(
    private service: ProjectsService
  ) { }

  ngOnInit(): void {
    this.getImageSrc(); // Obtener SRC de la imagen
  }

  /**
   * Funcion pata obtener el URL de las imagenes
   */
  getImageSrc(): void{
    this.validateLocation()
    .subscribe(
      (url) => this.imageWebPath = url,
      (err) => {
        if (err.code) {
          console.log(err.code);
        }
        this.showError(); // Mostrar error
      }
    );
  }

  /**
   * Validar el origen de las imagenes
   */
  validateLocation(): Observable<string | null>{
    switch (true) {
      case this.detailParentData.firebaseLocation:  // Proviene de Firebase Storage
        const path = this.detailParentData.path + this.image.id + this.detailParentData.imageExtention;
        return this.service.getImgUrlToFirebase(path);
      case this.detailParentData.googleDriveLocation: // Proviene de Google Drive
        return this.service.getImgUrlToGoogleDrive(this.image.id);
      default:  // Notificar error
        return throwError(`Error when try to get URL path of ${this.image.title}`);
    }
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
    if (!this.error) {  // Si no se ha desplegado el mensaje de error
      this.wait = false;
      this.error = true;
    }
  }

  /**
   * Evento para indicarle al padre, solo una vez,
   * que detenga el loop de esperar al hijo
   */
  stopWait(): void{
    if (this.waitParent) {  // Si el padre esta a la espera
      setTimeout(() => this.waitLoaded.emit(), 0);
    }
  }

}
