import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {User} from '@angular/fire/auth';

/**
 * Not Using it
 * TODO: Delete it
 */
interface UserState {
  username: string | null,
  isLoggedIn: boolean,
}

const initialState : UserState = {
  username : null,
  isLoggedIn: false,
}

//this store is singleton
export const UserStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withMethods(
    (store, authService = inject(AuthService)) => ({
      async loginWithGoogle(){
        const user: User = await authService.loginWithGmail();
        patchState(store, { username: user.displayName, isLoggedIn: true})
      }
    })
  )
)
