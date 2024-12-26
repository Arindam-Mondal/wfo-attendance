import {Component, inject} from '@angular/core';
import {AuthService} from '../service/auth.service';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly authService: AuthService = inject(AuthService);
  get username(){
    return this.authService.getCurrentUser()?.displayName;
  }

  get userImageSrc() {
    return this.authService.getCurrentUser()?.photoURL;
  }
}
