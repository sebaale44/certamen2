import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/modelos/user.model';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})

export class RegistrarUsuarioPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required,Validators.minLength(4)])
  })

  FirebaseSvc = inject(FirebaseService);
  utilSvc = inject(UtilsService);

  ngOnInit() {
  }

  async submit() {
    if (this.form.valid) {

     const loading =await this.utilSvc.loading();
     await loading.present();

      this.FirebaseSvc.Registrar(this.form.value as User).then(async res => {
       await this.FirebaseSvc.updateUser(this.form.value.name);

       let uid=res.user.uid;
       this.form.controls.uid.setValue(uid);
       this.setUserinfo(uid);
       

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



  async setUserinfo(uid: string) {
    if (this.form.valid) {

     const loading =await this.utilSvc.loading();
     await loading.present();

     let path =  'users/${uid}'; 
     delete this.form.value.password;

      this.FirebaseSvc.setdocument(path, this.form.value).then(async res => {
       
        this.utilSvc.saveinlocalstorage('user', this.form.value);
        this.utilSvc.routertLink('/auth');
        this.form.reset();

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
