import { Injectable } from '@angular/core';

export interface Project {
  title: string; slug: string; summary: string; image?: string; repo?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  list(): Project[] {
    return [
      { title: 'Test 1', slug: 'slug-one', summary: '', repo: 'https://github.com/...' },
      { title: 'Test 2', slug: 'slug-two', summary: '' },
      { title: 'Test 3', slug: 'slug-three', summary: '' },
    ];
  }
}
