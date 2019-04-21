import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthapiService } from '../../app-shared/_service/authapi.service';

@Injectable()
export class DefaultGuard implements CanActivate {
  constructor(private authApiService: AuthapiService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authApiService.bootstrapLogin();
  }
}
