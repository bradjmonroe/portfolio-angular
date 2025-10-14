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
    { index: 1, title: 'Frontend', items: ['Angular', 'React', 'TypeScript', 'Next.js', 'Tailwind/Bootstrap'] },
    { index: 2, title: 'Backend',  items: ['Node.js', '.NET 8', 'Express', 'GraphQL', 'REST APIs'] },
    { index: 3, title: 'Database', items: ['PostgreSQL', 'SQL Server', 'MongoDB', 'Redis'] },
    { index: 4, title: 'DevOps',   items: ['Docker', 'AWS', 'CI/CD', 'Git', 'Linux'] },
  ];

   steps = ['Design', 'Develop', 'Test', 'Deploy', 'Iterate'];
}
