import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  private _auth: Auth = inject(Auth);

  public login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  public async logout(): Promise<void> {
    return this._auth.signOut()
  }
}
