import { Injectable, inject } from '@angular/core';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router);
  //====== funcion Loading=======
  loading() {
    return this.loadingCtrl.create({ spinner: 'bubbles' })
  }

  //====================toast
  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
  //===============enruta a cualquier pagina disponible
  routertLink(url: string) {
    return this.router.navigateByUrl(url);
  }
  ///======================guarda datos en localstorage
  saveinlocalstorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  //=================ontiene elementos del loastorage
  getfromlocalsotarge(key: string) {
    return JSON.parse(localStorage.getItem(key))
  }
}
