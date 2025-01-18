import { Component } from '@angular/core';
import { ThemeToggleService } from 'src/app/core/utils/theme-toggle.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: false,
})
export class HomePage {

  constructor(
    private themeToggleService: ThemeToggleService
  ) {}

  public toggleTheme(): void {
    this.themeToggleService.toggleTheme();
  }

}
