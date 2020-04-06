import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ilustracion-tarjeta',
  templateUrl: './ilustracion-tarjeta.component.html',
  styles: [
  ],
})
export class IlustracionTarjetaComponent implements OnInit {

  @Input() illustration: any = {};
  constructor( private _router: Router) { }

  ngOnInit(): void {
  }

  showIllustrationDetails(): void{
    this._router.navigate(['/ilustracion',this.illustration.id]);
  }

}
