import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PortfolioPageComponent } from './components/portfolio-page/portfolio-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'portfolio',
    component: PortfolioPageComponent,
  },
  {
    path: 'portfolio/:portfolioTitle',
    component: PortfolioPageComponent
  }
];
