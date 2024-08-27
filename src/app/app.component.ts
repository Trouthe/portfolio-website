import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewportScroller } from '@angular/common';

import { ThemeService } from './services/theme.service';
import { NavbarDesktopComponent } from './components/navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { EducationComponent } from './components/education/education.component';
import { ProfessionalSkillsComponent } from './components/professional-skills/professional-skills.component';
import { WorkComponent } from './components/work/work.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

// Smoothing and Animations
import Lenis from 'lenis';
import gsap from 'gsap';
import { Observer, ScrollTrigger } from 'gsap/all';

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
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'portfolio-website';

  isMobile: boolean = false;

  arrowIcon!: string;
  figmaIcon!: string;
  githubIcon!: string;
  linkedinIcon!: string;
  mailIcon!: string;

  scrollSmooth!: Lenis;

  themeDebug: boolean = false;

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

    // Do not apply smooth scroll on mobile devices
    if (!this.isMobile) {
      this.scrollSmooth = new Lenis({
        duration: 0.85,
        syncTouch: true,
      });

      this.smoothScroll();
    }

    gsap.registerPlugin(Observer, ScrollTrigger);
    const aboutItems = gsap.utils.toArray('.about-item') as HTMLElement[];

    gsap.fromTo(
      '.header-item',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power4.out', stagger: 0.1, duration: 1.2 }
    );

    gsap.fromTo(
      '.about-item',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power4.out', stagger: 0.15, duration: 1 }
    );

    gsap.fromTo(
      '.about-me',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power4.out', duration: 1.75 }
    );

    aboutItems.forEach((item: HTMLElement) => {
      Observer.create({
        target: item, // Attach the observer to each item individually
        type: 'pointer', // Handle pointer events
        onHover: () => {
          gsap.to(item, {
            // Math.random() * (max - min): Scales the random number to be within the range of 0 to (max - min).
            // + min: Shifts the scaled number to the desired range [min, max].
            rotateZ: Math.random() * (-0.25 - 0.5) + 0.5,
            duration: 0.25,
          });
        },
        onHoverEnd: () => {
          gsap.to(item, {
            rotateZ: 0,
            duration: 0.25,
          });
        },
      });
    });

    // ScrollTrigger Timelines
    const educationTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#education',
        start: 'top 100%',
        end: 'top 50%`',
        scrub: true,
        markers: this.themeDebug,
      },
    });

    const workTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#work',
        start: 'top 100%',
        end: 'top 50%`',
        scrub: true,
        markers: this.themeDebug,
      },
    });

    const profSkillTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#skills',
        start: 'top 87.5%',
        end: 'top 50%',
        markers: this.themeDebug,
      },
    });

    const portfolioTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#portfolio',
        start: 'top 87.5%',
        end: 'top 50%',
        markers: this.themeDebug,
      },
    });

    educationTimeline
      .fromTo('.education small', { opacity: 0, x: 50 }, { opacity: 1, x: 0 })
      .fromTo('.education h1', { opacity: 0, x: -50 }, { opacity: 1, x: 0 }, 0)
      .fromTo(
        '.education-content',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, stagger: 0.25 }
      );

    profSkillTimeline
      .fromTo('.prof-title small', { opacity: 0, x: -50 }, { opacity: 1, x: 0 })
      .fromTo('.prof-title h1', { opacity: 0, x: 50 }, { opacity: 1, x: 0 }, 0)
      .fromTo(
        '.prof-skill-card',
        { opacity: 0, y: 25, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.3, ease: 'sine.out' },
        0
      );

    workTimeline
      .fromTo('.work-title small', { opacity: 0, x: 50 }, { opacity: 1, x: 0 })
      .fromTo('.work-title h1', { opacity: 0, x: -50 }, { opacity: 1, x: 0 }, 0)
      .fromTo(
        '.work-content',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, stagger: 0.25 }
      );
  }

  ngOnDestroy(): void {
    this.scrollSmooth.stop();
  }

  smoothScroll(): void {
    // Debugging
    // this.lenis.on('scroll', (e: any) => {
    //   console.log(e);
    // });

    const raf = (time: number) => {
      this.scrollSmooth.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }

  checkWindow(): void {
    this.isMobile = window.innerWidth <= 1023;
  }

  onClickScroll(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
