import { Injectable, inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);

//====== funcion Loading=======
loading(){
  return this.loadingCtrl.create({spinner:'bubbles'})
}
}
