import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IlustracionesService, Illustration } from '../../services/ilustraciones.service';

@Component({
  selector: 'app-ilustracion',
  templateUrl: './ilustracion.component.html',
  styles: [
  ],
})
export class IlustracionComponent implements OnInit {

  illustration: Illustration;

  constructor(
    private activeRoute: ActivatedRoute,
    private service: IlustracionesService
  ) {
    this.activeRoute.params.subscribe((params) => {
      this.illustration = this.service.getIllustrationById(params['id']);
    });
  }

  ngOnInit(): void {
  }

}
