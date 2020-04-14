import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '../../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ilustraciones',
  templateUrl: './ilustraciones.component.html',
  styleUrls: ['./ilustraciones.component.css']
})

export class IlustracionesComponent implements OnInit {

  tittle = 'Ilustraciones';
  illustrations: Project[]; // Ilustraciones
  waitData = true;  // Espera mientras se renderizan las tarjetas
  notFoundData =  false;  // Habilitar contenedor de 'notFound'
  errorData =  false; // Habilitar contenedor de 'error'

  constructor(
    private projectService: ProjectsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getIllustrations();
  }

  /**
   * Funcion para obtener ilustraciones y validar si se encuentran las mismas
   */
  getIllustrations(): void{
    const data: Array<Project> = this.projectService.getProjects('illustration');
    if ( data.length === 0) {
      this.waitData = false;
      this.notFoundData  = true;
    }else{
      this.illustrations = data;
    }
  }

  /**
   * Evento para detectar si se cargo el primer elemento de las tarjetas
   * y eliminar el loop de espera
   * @param status<bolean> Para indicarle al padre si finaliza el loop de espera
   */
  waitEvent(status: boolean): void{
    this.waitData = false;
  }

  /**
   * Mostrar informacion detallada de una ilustracion
   * @event Evento realizado desde el hijo
   * @param id<string> ID del elemento a visualizar
   */
  showIllustrationDetails(id: string){
    this.router.navigate(['/ilustracion', id]);
  }

}
