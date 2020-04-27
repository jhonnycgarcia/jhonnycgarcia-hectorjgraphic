import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: [
    '.carousel .carousel-inner .carousel-item .img-fluid {max-height: 500px;}'
  ]
})
// styleUrls: ['./details.component.css']
export class DetailsComponent implements OnInit {

  item: Project;

  waitData = true;  // Loop de espera
  notFoundData = false; // Mensaje de NotFound
  errorData = false;  // Mensaje de error

  maxHeight = '500px';  // Max-height del CSS

  constructor(
    private activeRoute: ActivatedRoute,
    private service: ProjectsService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.getDetails(params.id);
    });
  }

  /**
   * Evento para detectar, desde el componente hijo,
   * que ya se cargo la imagen por defecto
   */
  imgDefaultLoaded(): void{
    this.waitData = false;
  }

  /**
   * Metodo para obtener detalles del registro a traves del ID
   * @param id<string> Identificador del registro
   */
  getDetails(id: string): void{
    this.service.getProjectById(id).subscribe(docs => {
      if (!docs) {
        this.waitData = false;
        this.notFoundData = true;
      } else {
        this.item = docs;
      }
    });
  }

}
