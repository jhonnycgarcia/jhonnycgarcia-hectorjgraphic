import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ilustracion-tarjeta',
  templateUrl: './ilustracion-tarjeta.component.html',
  styleUrls: []
})

export class IlustracionTarjetaComponent implements OnInit {

  @Input() illustration: any = {};
  imageDefault = 'assets/img/system/screenWait.png';
  showDefault = true;

  constructor( private router: Router) {}

  ngOnInit(): void {}

  showIllustrationDetails(): void{
    this.router.navigate(['/ilustracion', this.illustration.id]);
  }

}
