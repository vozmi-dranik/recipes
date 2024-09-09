import { Auth, user } from '@angular/fire/auth';
import { signalStore, withComputed, withMethods } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withComputed((_, auth = inject(Auth)) => ({
    user: toSignal(user(auth), { initialValue: null, pipe: tap(() => console.log('Signal is loading')), }),
  })),
  withComputed(({ user }) => ({
    isLoggedIn: computed(() => {
      return !!user();
    }),
  })),
  withMethods((_, authService = inject(AuthService)) => ({
    login: (email: string, password: string) => authService.login(email, password),
    logout: () => authService.logout(),
    signUp: (email: string, password: string) => authService.signUp(email, password),
  })),
);
