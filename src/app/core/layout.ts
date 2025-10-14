import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from './theme/theme';

type Mode = 'light' | 'dark' | 'auto';
function isMode(x: string): x is Mode {
  return x === 'light' || x === 'dark' || x === 'auto';
}


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout implements OnInit {
  year = new Date().getFullYear();
  current: Mode = 'auto';

  constructor(private theme: ThemeService) {}

  ngOnInit() {
    this.theme.init();
    this.current = this.theme.current() as Mode;
  }

  setTheme(v: string) {
    const mode: Mode = isMode(v) ? v : 'auto';
    this.theme.set(mode);
    this.current = this.theme.current() as Mode;
  }
}
