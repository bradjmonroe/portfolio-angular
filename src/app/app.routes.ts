import { Routes } from '@angular/router';
import { Layout } from './core/layout';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '',         loadComponent: () => import('./pages/home/home').then(m => m.Home),         title: 'Brad Monroe — Full Stack Developer' },
      { path: 'projects', loadComponent: () => import('./pages/projects/projects').then(m => m.Projects), title: 'Projects — Brad Monroe' },
      { path: 'about',    loadComponent: () => import('./pages/about/about').then(m => m.About),       title: 'About — Brad Monroe' },
      { path: 'skills',   loadComponent: () => import('./pages/skills/skills').then(m => m.Skills),    title: 'Skills — Brad Monroe' },
      { path: 'contact',  loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),  title: 'Contact — Brad Monroe' },
    ]
  },
  { path: '**', redirectTo: '' }
];
