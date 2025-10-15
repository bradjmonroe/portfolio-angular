import { Injectable } from '@angular/core';

export type ProjectProgress = 'Ideation' | 'In Development' | 'In Testing' | 'On Hold' | 'Finished';

export interface Project {
  title: string;
  progress: ProjectProgress;
  slug: string;
  summary: string;
  image?: string;
  repo?: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  list(): Project[] {
    return [
      {
        title: 'Personal Task Tracker',
        progress: 'Finished',
        slug: 'slug-one',
        image: 'assets/imgs/task-list.jpg',
        summary: 'A full-stack To-Do Task Tracker web app demonstrating secure authentication, clean architecture, and RESTful design.',
        repo: 'https://github.com/bradjmonroe/task-manager',
        description: `
          This Personal Task Tracker is a .NET Core web application designed to showcase a modern full-stack workflow within a compact, reviewable codebase.
          It features JWT-based authentication, Entity Framework Core with SQLite for persistence, and a modular architecture that emphasizes clarity and scalability.
          The project demonstrates CRUD operations, authentication flows, and reusable UI components for managing daily tasks efficiently.
        `
      },
      {
        title: 'Package Sorter',
        progress: 'Finished',
        slug: 'slug-two',
        image: 'assets/imgs/sorting-robot.jpg',
        summary: 'An algorithmic tool that classifies packages by weight and dimensions to optimize warehouse stacking and handling.',
        repo: 'https://github.com/bradjmonroe/package-sorter',
        description: `
          This Package Sorter is a lightweight JavaScript function created for a technical interview challenge.
          It processes a set of packages, evaluating each item’s weight and size to assign it to the optimal stack for distribution or storage.
          The implementation focuses on algorithmic efficiency and clear, maintainable logic while remaining easy to extend for real-world warehouse automation scenarios.
        `
      },
      {
        title: 'Recipe Manager',
        progress: 'In Development',
        slug: 'slug-three',
        image: 'assets/imgs/chef-baking.jpg',
        summary: 'An Angular-based application for organizing recipes, tracking pantry items, and generating smart shopping lists.',
        repo: 'https://github.com/bradjmonroe/recipe-manager',
        description: `
          This Recipe Manager is an ongoing Angular web application that helps home cooks streamline meal planning and grocery shopping.
          Users can store recipes, track available pantry items, and automatically generate shopping lists based on selected meals.
          The project highlights the use of Angular’s standalone component architecture, reactive forms, and real-time list computation to create a smooth, intuitive experience.
        `
      }
    ];
  }
}
