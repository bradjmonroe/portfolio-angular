import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  NgZone
} from '@angular/core';
import { ProjectsService, Project } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {
  projects: Project[] = [];
  expanded = new Set<number>();
  private removeFns: Array<() => void> = [];

  constructor(
    private svc: ProjectsService,
    private el: ElementRef<HTMLElement>,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.projects = this.svc.list();
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const collapses = Array.from(
        this.el.nativeElement.querySelectorAll<HTMLElement>('.accordion-collapse')
      );

      collapses.forEach((collapseEl, index) => {
        const onShown = () => {
          this.zone.run(() => {
            this.expanded.add(index);
          });
        };

        const onHidden = () => {
          this.zone.run(() => {
            this.expanded.delete(index);
          });
        };

        collapseEl.addEventListener('shown.bs.collapse', onShown);
        collapseEl.addEventListener('hidden.bs.collapse', onHidden);

        this.removeFns.push(() => {
          collapseEl.removeEventListener('shown.bs.collapse', onShown);
          collapseEl.removeEventListener('hidden.bs.collapse', onHidden);
        });
      });
    });
  }

  ngOnDestroy() {
    this.removeFns.forEach(fn => fn());
    this.removeFns = [];
  }

  isExpanded(index: number): boolean {
    return this.expanded.has(index);
  }
}
