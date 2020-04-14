import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService, Project } from '../../services/projects.service';

@Component({
  selector: 'app-ilustracion',
  templateUrl: './ilustracion.component.html',
  styles: [
    '.carousel .carousel-inner .carousel-item .img-fluid {max-height: 500px;}',
  ],
})
export class IlustracionComponent implements OnInit {

  illustration: Project;
  imageDefault = 'assets/img/system/screenWait.png';
  maxHeight = '500px';  // Max-height del CSS

  constructor(
    private activeRoute: ActivatedRoute,
    private service: ProjectsService
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.illustration = this.service.getProjectById(params.id);
    });
  }

  ngOnInit(): void {
  }

}
