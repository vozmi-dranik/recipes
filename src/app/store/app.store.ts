import { Auth, user, User } from '@angular/fire/auth';
import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

interface AppStore {
  user: User | null;
}

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState<AppStore>({ user: null }),
  withComputed((_, auth = inject(Auth)) => ({
    user: toSignal(user(auth), { initialValue: null })
  })),
  withComputed(({ user }) => ({
    isLoggedIn: computed(() => {
      console.log(user(), 'user');
      return !!user();
    }),
  })),
  withMethods((_, authService = inject(AuthService)) => ({
    login: (email: string, password: string) => authService.login(email, password),
    logout: () => authService.logout(),
  })),
);
