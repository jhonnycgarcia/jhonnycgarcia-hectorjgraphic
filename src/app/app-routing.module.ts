import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { InicioComponent } from './components/inicio/inicio.component';
import { IlustracionesComponent } from './components/ilustraciones/ilustraciones.component';
import { AnimacionesComponent } from './components/animaciones/animaciones.component';
import { TresdComponent } from './components/tresd/tresd.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { DetailsComponent } from './components/details/details.component';
import { BrandingComponent } from './components/branding/branding.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'ilustraciones', component: IlustracionesComponent},
  { path: 'ilustracion/:id', component: DetailsComponent},
  {path: 'animaciones', component: AnimacionesComponent},
  { path: 'animacion/:id', component: DetailsComponent},
  {path: 'branding', component: BrandingComponent},
  { path: 'branding/:id', component: DetailsComponent},
  {path: 'tresd', component: TresdComponent},
  {path: 'tresd/:id', component: DetailsComponent},
  {path: 'contacto', component: ContactoComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
