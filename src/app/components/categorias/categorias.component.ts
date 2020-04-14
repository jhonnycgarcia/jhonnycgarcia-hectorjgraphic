import { Component, OnInit, Input } from '@angular/core';
import { ProjectsService, Project } from '../../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  dataCategory: Project[];  // Data por cada categoria
  waitData = true; // Espera mientras se renderizan las tarjetas
  notFoundData = false; // Habilitar contenedor de 'notFound'
  errorData = false; // Habilitar contenedor de 'error'

  @Input() sectionTitle: string;  // Titulo de la seccion
  @Input() sectionCategory: string; // Categoria a filtrar
  @Input() sectionRouter: string; // Ruta de enlace para detalles



  constructor(
    private service: ProjectsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDataCategory();
  }

  /**
   * Funcion para obtener los projectos y validar si se encuentran las mismas
   */
  getDataCategory(): void{
    const data: Array<Project> = this.service.getProjects(this.sectionCategory);
    if (data.length === 0) {
      this.waitData = false;
      this.notFoundData = true;
    } else {
      this.dataCategory = data;
    }
  }

 /**
  * Evento para detectar si se cargo el primer elemento de las tarjetas
  * y eliminar el loop de espera
  * @param status<boolean> Para indicarle al padre si finaliza el loop de espera
  */
  waitEvent(status: boolean): void {
    if (this.waitData) {
      this.waitData = status;
    }
  }

  /**
   * Mostrar informacion detallada de una ilustracion
   * @event Evento realizado desde el hijo
   * @param id<string> ID del elemento a visualizar
   */
  showDetails(id: string) {
    if (this.sectionRouter.length > 0) {
      this.router.navigate(['/' + this.sectionRouter, id]);
    }else{
      console.log('Error400: sectionRouter is not defined!');
    }
  }

}
