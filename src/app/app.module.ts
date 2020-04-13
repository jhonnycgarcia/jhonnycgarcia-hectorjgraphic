import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Components
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { IlustracionesComponent } from './components/ilustraciones/ilustraciones.component';
import { IlustracionTarjetaComponent } from './components/ilustracion-tarjeta/ilustracion-tarjeta.component';

// Services
import { IlustracionesService } from './services/ilustraciones.service';
import { IlustracionComponent } from './components/ilustracion/ilustracion.component';
import { AnimacionesComponent } from './components/animaciones/animaciones.component';
import { TresdComponent } from './components/tresd/tresd.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CarouselImageComponent } from './components/carousel-image/carousel-image.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    FooterComponent,
    IlustracionesComponent,
    IlustracionTarjetaComponent,
    IlustracionComponent,
    AnimacionesComponent,
    TresdComponent,
    ContactoComponent,
    CarouselImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    IlustracionesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
