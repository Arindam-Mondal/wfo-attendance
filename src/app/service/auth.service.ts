import {computed, inject, Injectable, signal} from '@angular/core';
import {
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  User, onAuthStateChanged
} from '@angular/fire/auth';
import {AngularFireAuth} from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  async loginWithGmail() :Promise<User> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth,provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken ?? '';
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        localStorage.setItem("isLoggedIn", 'true');
        return user;
      });
  }

  logout() {
    this.auth.signOut();
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }

}
