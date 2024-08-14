import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemeService } from './services/theme.service';

import { NavbarDesktopComponent } from './components/navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { EducationComponent } from './components/education/education.component';
import { ProfessionalSkillsComponent } from './components/professional-skills/professional-skills.component';
import { WorkComponent } from './components/work/work.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarDesktopComponent,
    NavbarMobileComponent,
    EducationComponent,
    ProfessionalSkillsComponent,
    WorkComponent,
    PortfolioComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'portfolio-website';

  isMobile: boolean = false;

  arrowIcon!: string;
  figmaIcon!: string;
  githubIcon!: string;
  linkedinIcon!: string;
  mailIcon!: string;

  constructor(
    private theme: ThemeService,
    private viewportScroller: ViewportScroller
  ) {}

  // Detect window resize in realtime
  @HostListener('window:resize', ['$event'])
  ngOnInit(): void {
    this.checkWindow();
  }

  ngAfterViewInit() {
    this.arrowIcon = this.theme.getArrowIcon();
    this.figmaIcon = this.theme.getFigmaIcon();
    this.githubIcon = this.theme.getGithubIcon();
    this.linkedinIcon = this.theme.getLinkedinIcon();
    this.mailIcon = this.theme.getMailIcon();
  }

  checkWindow(): void {
    this.isMobile = window.innerWidth <= 800;
  }

  onClickScroll(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
