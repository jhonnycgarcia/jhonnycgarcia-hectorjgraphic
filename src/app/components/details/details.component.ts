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

  waitData = true;
  notFoundData = false;
  errorData = false;

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

  getDetails(id: string): void{
    const data: Project = this.service.getProjectById(id);
    if (!data) {
      this.waitData = false;
      this.notFoundData = true;
    }else{
      this.item = data;
      this.waitData = false;
    }
  }

}
