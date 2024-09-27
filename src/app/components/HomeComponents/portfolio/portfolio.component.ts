import { Component } from '@angular/core';
import portfolioContent from './portfolio-content.json';
import { Portfolio } from './portfolio.interface';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent {
  portfolioContent: Portfolio[] = portfolioContent.slice(0, 4);

  goto(link: string): void {
    window.open(link, '_blank');
  }
}
