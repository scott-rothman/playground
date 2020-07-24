import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { StageComponent } from './stage/stage.component';
import { CharacterComponent } from './character/character.component';
import { OtherCharacterComponent } from './other-character/other-character.component';

@NgModule({
  declarations: [
    AppComponent,
    StageComponent,
    CharacterComponent,
    OtherCharacterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule
  ],
  providers: [ CharacterComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
