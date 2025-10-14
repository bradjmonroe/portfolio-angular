import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from './projects.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit {
  projects: Project[] = [];

  constructor(private svc: ProjectsService) {}

  ngOnInit() {
    this.projects = this.svc.list();
  }
}
