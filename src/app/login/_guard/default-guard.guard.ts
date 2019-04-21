import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthapiService } from '../../app-shared/_service/authapi.service';

@Injectable()

export class DefaultGuardGuard implements CanActivate {
  constructor(private authApiService: AuthapiService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('reached guard');
    //return true;
      return this.authApiService.bootstrapLogin();
  }
}
