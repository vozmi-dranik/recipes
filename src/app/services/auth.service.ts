import { inject, Injectable, Signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user, User } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _auth: Auth = inject(Auth);
  // todo: check where is better to use that
  public readonly user: Signal<User | null | undefined> = toSignal(user(this._auth));

  public login(email: string, password: string) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  public signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this._auth, email, password);
  }

  public async logout() {
    return this._auth.signOut();
  }
}
