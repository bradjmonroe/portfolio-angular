import { Component, Input } from '@angular/core';

export interface AboutFeature {
  icon: string;          // bootstrap icon class
  title: string;
  description: string;
}

@Component({
  selector: 'app-square-card',
  imports: [],
  templateUrl: './square-card.html',
  styleUrl: './square-card.scss'
})
export class SquareCard {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() description!: string;
}
