import { Component, inject, Signal } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { AppStore } from 'src/app/store/app.store';
import { MatButton, MatIconButton } from '@angular/material/button';
import { User } from '@angular/fire/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButton,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly _appStore = inject(AppStore);
  isLoggedIn = this._appStore.isLoggedIn;
  user: Signal<User | null | undefined> = this._appStore.user;

  logout() {
    this._appStore.logout();
  }
}
