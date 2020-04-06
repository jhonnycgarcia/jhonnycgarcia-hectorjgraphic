import { Component, OnInit } from '@angular/core';
import { IlustracionesService, Illustration } from '../../services/ilustraciones.service';

@Component({
  selector: 'app-ilustraciones',
  templateUrl: './ilustraciones.component.html',
  styles: [
  ],
})
export class IlustracionesComponent implements OnInit {

  illustrations: Illustration[];

  constructor(
    private _service : IlustracionesService
  ) { }

  ngOnInit(): void {
    this.illustrations = this._service.getIllustrations();
  }

}
