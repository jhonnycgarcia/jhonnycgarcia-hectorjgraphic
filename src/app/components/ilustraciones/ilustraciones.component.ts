import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '../../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ilustraciones',
  templateUrl: './ilustraciones.component.html',
  styleUrls: ['./ilustraciones.component.css']
})

export class IlustracionesComponent implements OnInit {

  sectionTitle = 'Ilustraciones';
  sectionCategory = 'illustration';
  sectionRouter = 'ilustracion';

  constructor() { }

  ngOnInit(): void { }
}
