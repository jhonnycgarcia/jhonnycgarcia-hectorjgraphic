import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { InicioComponent } from './components/inicio/inicio.component';
import { IlustracionesComponent } from './components/ilustraciones/ilustraciones.component';
import { IlustracionComponent } from './components/ilustracion/ilustracion.component';
import { AnimacionesComponent } from './components/animaciones/animaciones.component';
import { TresdComponent } from './components/tresd/tresd.component';
import { ContactoComponent } from './components/contacto/contacto.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'ilustraciones', component: IlustracionesComponent},
  {path: 'ilustracion/:id', component: IlustracionComponent},
  {path: 'animaciones', component: AnimacionesComponent},
  {path: 'tresd', component: TresdComponent},
  {path: 'contacto', component: ContactoComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
