import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

  
// firebase
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment'; 
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/app';
    
      // Initialize Firebase
      export const  firebaseConfig = {
        
          apiKey: "AIzaSyDYFVxc1vpCntxduuFicyugaml90rNjfL0",
          authDomain: "registrapp2-b7b01.firebaseapp.com",
          projectId: "registrapp2-b7b01",
          storageBucket: "registrapp2-b7b01.appspot.com",
          messagingSenderId: "199824824904",
          appId: "1:199824824904:web:970404922f2f4bd713567d",
          measurementId: "G-J8M9ZTLT1J"
          
      };

      firebase.initializeApp(environment.firebaseConfig);     

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), 
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),
            AngularFirestoreModule
            ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
