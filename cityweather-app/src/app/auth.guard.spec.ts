import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AuthGuard } from './auth.guard';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      isAuthenticated$: of(true) 
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should allow access if user is authenticated', (done) => {
    guard.canActivate().subscribe(result => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should redirect to /login if user is not authenticated', (done) => {
    authServiceMock.isAuthenticated$ = of(false);

    guard.canActivate().subscribe(result => {
      expect(result).toBeFalse();
      expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
