import { Auth, user, User } from '@angular/fire/auth';
import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

interface AppStore {
  user: User | null;
}

export const appStore = signalStore(
  { providedIn: 'root' },
  withState<AppStore>({ user: null }),
  withComputed((_, auth = inject(Auth)) => ({
    user: computed(() => toSignal(user(auth)))
  })),
  withComputed(({ user }) => ({
    isLoggedIn: computed(() => !!user),
  })),
  withMethods((_, authService = inject(AuthService)) => ({
    login: (email: string, password: string) => authService.login(email, password),
  })),
);
