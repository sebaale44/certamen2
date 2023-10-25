import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/modelos/user.model';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-olvido-contrasena',
  templateUrl: './olvido-contrasena.page.html',
  styleUrls: ['./olvido-contrasena.page.scss'],
})
export class OlvidoContrasenaPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  FirebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilSvc.loading();
      await loading.present();

      this.FirebaseSvc.sendRecoveryEmail(this.form.value.email).then(res => { 
        

        //================ mensaje para recuperar contraseña
        this.utilSvc.presentToast({
          message: 'correo envieado con exito',
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'mail-outline'
        })
        //=========redirije al login
        this.utilSvc.routertLink('/auth');
        this.form.reset();


      }).catch(error => {
        console.log(error);

        //====================contraseña o usuario invalida
        this.utilSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })
        //=========================================
      }).finally(() => {
        loading.dismiss();
      })
    }

  }


}
