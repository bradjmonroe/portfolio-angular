import { DecimalPipe, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface RecCategory {
  index: number;        // 1..n
  title: string;        // e.g. "Frontend"
  items: string[];      // bullet list
}

@Component({
  selector: 'app-rec-card',
  standalone: true,
  imports: [NgFor, DecimalPipe],
  templateUrl: './rec-card.html',
  styleUrl: './rec-card.scss'
})
export class RecCard {
  @Input() index!: number;
  @Input() title!: string;
  @Input() items: string[] = [];
}
