import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/modelos/user.model';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  FirebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);
  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

     const loading =await this.utilSvc.loading();
     await loading.present();

      this.FirebaseSvc.acceder(this.form.value as User).then(res => {

        this.getUserinfo(res.user.uid);

      }).catch(error =>{
        console.log(error);

//====================contraseña o usuario invalida
        this.utilSvc.presentToast({
          message: error.message,
          duration: 2500,
          color: 'primary',
          position: 'middle',
          icon: 'alert-circle-outline'
        })

      }).finally(()=>{
        loading.dismiss();
      })
    }

  }



  async getUserinfo(uid: string) {
    if (this.form.valid) {

     const loading =await this.utilSvc.loading();
     await loading.present();

     let path = 'users/${uid}';
     

      this.FirebaseSvc.getdocument(path).then((user: User) => {
       
        this.utilSvc.saveinlocalstorage('user',user);
        this.utilSvc.routertLink('/main/menu-profe');
        this.form.reset();

        this.utilSvc.presentToast({
          message: 'te damos la bienvenida, ${{user.name}} ',
          duration: 1500,
          color: 'primary',
          position: 'middle',
          icon: 'person-circle-outline'
        })

      }).catch(error =>{
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
      }).finally(()=>{
        loading.dismiss();
      })
    }

  }

}
