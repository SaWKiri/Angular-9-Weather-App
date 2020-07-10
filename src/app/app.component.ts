import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WeatherApp';
  private isDark = false;

  @HostBinding('class')
  get themeMode() {
    return this.isDark ? 'unicorn-dark-theme': 'theme';
  }
}
