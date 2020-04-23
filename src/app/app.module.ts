import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Components
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { IlustracionesComponent } from './components/ilustraciones/ilustraciones.component';
import { AnimacionesComponent } from './components/animaciones/animaciones.component';
import { TresdComponent } from './components/tresd/tresd.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CarouselImageComponent } from './components/carousel-image/carousel-image.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { DetailsComponent } from './components/details/details.component';

// Services
import { ProjectsService } from './services/projects.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InicioComponent,
    FooterComponent,
    IlustracionesComponent,
    AnimacionesComponent,
    TresdComponent,
    ContactoComponent,
    CarouselImageComponent,
    CategoriasComponent,
    TarjetasComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    ProjectsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
