import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IngresarComponent } from './ingresar/ingresar.component';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule} from "@angular/common/http";


/* Angular Materials */
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
/* Firebase */ 
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire'
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    IngresarComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[IngresarComponent]
})
export class AppModule { }
