import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ViewportScroller } from '@angular/common';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-navbar-desktop',
  standalone: true,
  imports: [],
  templateUrl: './navbar-desktop.component.html',
  styleUrl: './navbar-desktop.component.scss',
})
export class NavbarDesktopComponent implements OnInit {
  constructor(
    private theme: ThemeService,
    private appComponent: HomeComponent,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.theme.initializeTheme();
  }

  switchTheme(): void {
    this.theme.switch();
    this.appComponent.arrowIcon = this.theme.getArrowIcon();
    this.appComponent.figmaIcon = this.theme.getFigmaIcon();
    this.appComponent.githubIcon = this.theme.getGithubIcon();
    this.appComponent.linkedinIcon = this.theme.getLinkedinIcon();
    this.appComponent.mailIcon = this.theme.getMailIcon();
  }

  onClickScroll(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
