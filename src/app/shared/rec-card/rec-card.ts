import { DecimalPipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface RecCategory {
  index: number;        // 1..n
  title: string;        // e.g. "Frontend"
  subheader: string;    // e.g. "The basics"
  items: string[];      // bullet list
}

@Component({
  selector: 'app-rec-card',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './rec-card.html',
  styleUrl: './rec-card.scss'
})
export class RecCard {
  @Input() index!: number;
  @Input() title!: string;
  @Input() subheader!: string;
  @Input() items: string[] = [];

}
