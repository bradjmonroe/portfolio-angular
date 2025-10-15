import { Component } from '@angular/core';
import { RecCategory , RecCard } from "../../shared/rec-card/rec-card";

@Component({
  selector: 'app-skills',
  imports: [RecCard],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {
  categories: RecCategory[] = [
    { index: 0, title: 'Languages', subheader: 'The basics',                      items: ['C#', 'Python', 'Javascript', 'Typescript', 'CSS'] },
    { index: 1, title: 'Frontend', subheader: 'UI Frameworks and technologies',   items: ['Angular', 'React', 'TypeScript', 'SASS', 'Bootstrap'] },
    { index: 2, title: 'Backend', subheader: 'The backbone of the application',   items: ['Node.js', '.NET Core', 'GraphQL', 'REST APIs'] },
    { index: 3, title: 'Database', subheader: 'Storage of your information',      items: ['SQL Server', 'Oracle SQL', 'MongoDB'] },
    { index: 4, title: 'DevOps',  subheader: 'Deploy and track',                  items: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux', 'IIS'] },
  ];

   steps = ['Design', 'Develop', 'Test', 'Deploy', 'Iterate'];
}
