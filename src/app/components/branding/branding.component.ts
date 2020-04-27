import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branding',
  templateUrl: './branding.component.html',
  styles: [
  ],
})
export class BrandingComponent implements OnInit {

  sectionTitle = 'Branding';
  sectionCategory = 'branding';
  sectionRouter = 'branding';

  constructor() { }

  ngOnInit(): void { }

}
