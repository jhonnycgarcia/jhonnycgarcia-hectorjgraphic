import { Component, OnInit } from '@angular/core';
import { IlustracionesService, Illustration } from '../../services/ilustraciones.service';

@Component({
  selector: 'app-ilustraciones',
  templateUrl: './ilustraciones.component.html',
  styleUrls: ['./ilustraciones.component.css']
})

export class IlustracionesComponent implements OnInit {

  illustrations: Illustration[];

  constructor(
    private illustrationService: IlustracionesService
  ) { }

  ngOnInit(): void {
    this.illustrations = this.illustrationService.getIllustrations();
  }

}
