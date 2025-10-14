import { Injectable } from '@angular/core';
type Mode = 'light' | 'dark' | 'auto';
const KEY = 'bm_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  init() { this.set((localStorage.getItem(KEY) as Mode) || 'auto'); }
  set(mode: Mode) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const effective = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode;
    document.documentElement.setAttribute('data-bs-theme', effective);
    localStorage.setItem(KEY, mode);
  }
  current(): Mode { return (localStorage.getItem(KEY) as Mode) || 'auto'; }
}
