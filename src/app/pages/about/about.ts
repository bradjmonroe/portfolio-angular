import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { SquareCard, AboutFeature } from '../../shared/square-card/square-card';


@Component({
  selector: 'app-about',
  imports: [NgFor, SquareCard],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  features: AboutFeature[] = [
    { icon: 'bi bi-code-slash', title: 'Clean Code',     description: 'Writing maintainable, scalable, and well-documented code' },
    { icon: 'bi bi-lightning',  title: 'Performance',    description: 'Optimizing for speed and efficiency in every project' },
    { icon: 'bi bi-lightbulb',  title: 'Innovation',     description: 'Exploring new tools and best practices' },
    { icon: 'bi bi-laptop',     title: 'Responsive',     description: 'Great experiences across all devices' },
  ];
}
