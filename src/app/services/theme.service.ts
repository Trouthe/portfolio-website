import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isLightTheme!: boolean;
  // hamburgerMenuSrc!: string;
  // arrowIconSrc!: string;

  constructor() {}

  initializeTheme(): void {
    // If the browser is set to light
    const prefersLight: boolean = window.matchMedia(
      '(prefers-color-scheme: light)'
    ).matches;

    // Set the value to either true or false
    this.isLightTheme = prefersLight;

    // Change the value
    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );

    // this.hamburgerMenuSrc = this.getHamburgerMenuIcon();
    // this.arrowIconSrc = this.getArrowIcon();
  }

  getCurrentTheme(): void {
    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
  }

  switch(): void {
    // Switch the boolean
    this.isLightTheme = !this.isLightTheme;

    // Switch the theme
    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );

    // this.hamburgerMenuSrc = this.getHamburgerMenuIcon();
    // this.arrowIconSrc = this.getArrowIcon();
  }

  getHamburgerMenuIcon(): string {
    return getComputedStyle(document.body)
      .getPropertyValue('--hamburger-menu')
      .replace(/['"]+/g, '');
  }

  getArrowIcon(): string {
    return getComputedStyle(document.body)
      .getPropertyValue('--arrow-icon')
      .replace(/['"]+/g, '');
  }

  getFigmaIcon(): string {
    return getComputedStyle(document.body)
      .getPropertyValue('--figma-icon')
      .replace(/['"]+/g, '');
  }

  getGithubIcon(): string {
    return getComputedStyle(document.body)
      .getPropertyValue('--github-icon')
      .replace(/['"]+/g, '');
  }

  getLinkedinIcon(): string {
    return getComputedStyle(document.body)
      .getPropertyValue('--linkedin-icon')
      .replace(/['"]+/g, '');
  }

  getMailIcon(): string {
    return getComputedStyle(document.body)
      .getPropertyValue('--mail-icon')
      .replace(/['"]+/g, '');
  }

  getCloseButton(): string {
    return getComputedStyle(document.body)
      .getPropertyValue('--close-button')
      .replace(/['"]+/g, '');
  }
}
