import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { InicioComponent } from './components/inicio/inicio.component';
import { IlustracionesComponent } from './components/ilustraciones/ilustraciones.component';
import { IlustracionComponent } from './components/ilustracion/ilustracion.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'ilustraciones', component: IlustracionesComponent},
  {path: 'ilustracion/:id', component: IlustracionComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
