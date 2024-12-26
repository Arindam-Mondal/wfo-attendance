import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {UserStore} from '../store/user.store';
import {AuthService} from '../service/auth.service';

export const loginCanActivateGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(UserStore);
  const router = inject(Router);
  const authService = inject(AuthService);


  await router.navigate(['/login']);
  return false;
}
