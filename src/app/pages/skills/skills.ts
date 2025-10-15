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

   colClass(i: number, len: number) {
    // default: 1-up (xs), 2-up (md), 3-up (lg+)
    const classes = ['col-12', 'col-md-6', 'col-lg-4'];

    const rem = len % 3;
    const last = len - 1;

    // If exactly 1 item in the last row, have full width on lg+
    if (rem === 1 && i === last) classes.push('col-lg-12');

    // If exactly 2 items in the last row, each half width on lg+
    if (rem === 2 && (i === last || i === last - 1)) classes.push('col-lg-6');

    return classes.join(' ');
  }
}
