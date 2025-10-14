import { Component, HostBinding } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'animated-section',
  standalone: true,
  template: `<ng-content></ng-content>`,
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('350ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class AnimatedSectionComponent {
  @HostBinding('@fadeSlide') anim = true;
}
