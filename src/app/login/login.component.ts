import {Component, inject} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {UserStore} from '../store/user.store';
import {GsiButtonComponent} from '../gsi-button/gsi-button.component';

@Component({
  selector: 'app-login',
  imports: [
    GsiButtonComponent
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  readonly userStore = inject(UserStore);
  readonly router = inject(Router);

  async signInWithGoogle() {
    await this.userStore.loginWithGoogle();
    await this.router.navigate(['/calendar']);
  }
}
