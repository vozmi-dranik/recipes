import { Auth, idToken, user } from '@angular/fire/auth';
import { signalStore, withComputed, withMethods } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

export const AppStore = signalStore(
  { providedIn: 'root' },
  withComputed((_, auth = inject(Auth)) => ({
    user: toSignal(user(auth), { initialValue: null, pipe: tap((user) => console.log('Signal is loading', user)), }),
    token: toSignal(idToken(auth), { initialValue: null, pipe: tap((token) => console.log('Signal is loading', token)), }),
  })),
  withComputed(({ user }) => ({
    isLoggedIn: computed(() => {
      return !!user();
    }),
  })),

  // withComputed(({ user }) => ({
  //   token: computed(() => (user()?).accessToken),
  // })),
  withMethods((_, authService = inject(AuthService)) => ({
    login: (email: string, password: string) => authService.login(email, password),
    logout: () => authService.logout(),
    signUp: (email: string, password: string) => authService.signUp(email, password),
  })),
);
