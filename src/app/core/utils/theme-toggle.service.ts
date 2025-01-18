import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeToggleService {

  constructor() {
    this.listenToThemeChanges();
  }

  private listenToThemeChanges(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.initializeDarkPalette(prefersDark.matches);
    prefersDark.addEventListener('change', (e) => this.initializeDarkPalette(e.matches));
  }

  private initializeDarkPalette(isDark: boolean): void {
    this.applyTheme(isDark);
  }

  private applyTheme(isDark: boolean): void {
    document.body.classList.toggle('dark-theme', isDark);
  }

  public toggleTheme(): void {
    const isDark = document.body.classList.contains('dark-theme');
    this.applyTheme(!isDark);
  }
}
