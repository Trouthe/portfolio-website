import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { ViewportScroller } from '@angular/common';
import { HomeComponent } from '../../home/home.component';

@Component({
  selector: 'app-navbar-mobile',
  standalone: true,
  imports: [],
  templateUrl: './navbar-mobile.component.html',
  styleUrl: './navbar-mobile.component.scss',
})
export class NavbarMobileComponent implements OnInit {
  isOpen: boolean = false;
  hamburgerMenuSrc: string = '';

  constructor(
    private theme: ThemeService,
    private appComponent: HomeComponent,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.theme.initializeTheme();
    this.hamburgerMenuSrc = this.theme.getHamburgerMenuIcon();
  }

  switchTheme(): void {
    this.theme.switch();
    this.hamburgerMenuSrc = this.theme.getHamburgerMenuIcon();
    this.appComponent.arrowIcon = this.theme.getArrowIcon();
    this.appComponent.figmaIcon = this.theme.getFigmaIcon();
    this.appComponent.githubIcon = this.theme.getGithubIcon();
    this.appComponent.linkedinIcon = this.theme.getLinkedinIcon();
    this.appComponent.mailIcon = this.theme.getMailIcon();
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      document
        .getElementsByTagName('body')[0]
        .setAttribute('style', 'overflow: hidden');
    } else {
      document.getElementsByTagName('body')[0].removeAttribute('style');
    }
  }

  onClickScroll(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
    this.toggleMenu();
  }
}
