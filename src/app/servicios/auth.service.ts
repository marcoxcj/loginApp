import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import  {app} from 'firebase/app';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
  }


  //logout...
  logout(){
     return this.afAuth.auth.signOut();
  }

  //Creacion de un nuevo usuario
  registerUser(email:string, pass:string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData=> resolve(userData),
      err => reject(err));
    });
  }

  //login con email y contraseña
  loginEmail(email:string, pass:string){
    return new Promise((resolve, reject)=>{
      this.afAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData=> resolve(userData),
      err => reject(err));
    });
  }

  //Datos del usuario logeado
  getAuth(){
    return this.afAuth.authState.pipe(map(auth=>auth));
  }


}
