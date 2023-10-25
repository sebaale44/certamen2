import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth, signInWithEmailAndPassword, sendPasswordResetEmail,
  createUserWithEmailAndPassword, updateProfile
} from 'firebase/auth';
import { User } from '../modelos/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc,getDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilSvc = inject(UtilsService);

  //==============Autenticacion(proteccion rutas )
  getAuth() {
    return getAuth();
  }
  //============= Acceder========
  acceder(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password)
  }

  //=====================registrar usuario
  Registrar(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password)
  }
  //=========actualizar usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

  //=========enviar mensaje para restablecer contraseña
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);

  }

  //=====================cerrar sesion
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilSvc.routertLink('/auth');
  }

  ///============================base datos=============================
  //================setear documento==============
  setdocument(path: string, data:any){
    return setDoc(doc(getFirestore(),path),data);
  }
//===============================OBTENER DOCUMENTO
  async getdocument(path: string){
    return (await getDoc(doc(getFirestore(),path))).data();
  }
}
