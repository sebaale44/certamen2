import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/service/firebase.service';
import { UtilsService } from 'src/app/service/utils.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';



@Component({
  selector: 'app-menu-profe',
  templateUrl: './menu-profe.page.html',
  styleUrls: ['./menu-profe.page.scss'],
})
export class MenuProfePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);


  //====generar qr
  texto:any;


  ngOnInit() {
  }


//=====================Cerrar sesion
  signOut(){
    this.firebaseSvc.signOut();
  }

}
