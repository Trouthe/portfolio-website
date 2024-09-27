import { Component } from '@angular/core';
import portfolioContent from '../HomeComponents/portfolio/portfolio-content.json';
import { Portfolio } from '../HomeComponents/portfolio/portfolio.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { NavbarDesktopComponent } from '../HomeComponents/navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from '../HomeComponents/navbar-mobile/navbar-mobile.component';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [CommonModule, NavbarDesktopComponent, NavbarMobileComponent],
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss'],
})
export class PortfolioPageComponent {
  portfolioContentFull: Portfolio[] = portfolioContent;
  isPanelOpen: boolean = false;
  selectedPortfolio?: Portfolio | null = null; // Manage selected portfolio

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private theme: ThemeService
  ) {}

  ngOnInit(): void {
    this.theme.getCurrentTheme();

    // Listen for route changes to detect when to open the sliding panel
    this.route.paramMap.subscribe((params) => {
      const portfolioTitle = params.get('portfolioTitle');
      if (portfolioTitle) {
        // Find the selected portfolio based on the title from the URL
        this.selectedPortfolio = this.portfolioContentFull.find(
          (p) =>
            p.title.replace(/[\s/]+/g, '-').toLowerCase() === portfolioTitle
        );

        // Open the panel if a portfolio is found
        this.isPanelOpen = !!this.selectedPortfolio;
      }
    });
  }

  closePanel(): void {
    this.isPanelOpen = false;
    this.toggleScroll();
    setTimeout(() => {
      this.router.navigate(['/portfolio']);
    }, 350);
  }

  openPortfolio(portfolio: Portfolio): void {
    this.selectedPortfolio = portfolio;
    const formattedTitle = portfolio.title.replace(/\s+/g, '-').toLowerCase();
    this.isPanelOpen = true;

    this.toggleScroll();
    this.router.navigate([`/portfolio/${formattedTitle}`]);
  }

  toggleScroll(): void {
    if (this.isPanelOpen) {
      document
        .getElementsByTagName('body')[0]
        .setAttribute('style', 'overflow: hidden');
    } else {
      document.getElementsByTagName('body')[0].removeAttribute('style');
    }
  }

  back(): void {
    this.router.navigate([`/`])
  }
}
