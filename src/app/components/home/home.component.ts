import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ViewportScroller } from '@angular/common';

import { ThemeService } from '../../services/theme.service';
import { NavbarDesktopComponent } from '../HomeComponents/navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from '../HomeComponents/navbar-mobile/navbar-mobile.component';
import { EducationComponent } from '../HomeComponents/education/education.component';
import { ProfessionalSkillsComponent } from '../HomeComponents/professional-skills/professional-skills.component';
import { WorkComponent } from '../HomeComponents/work/work.component';
import { PortfolioComponent } from '../HomeComponents/portfolio/portfolio.component';

// Smoothing and Animations
import Lenis from 'lenis';
import gsap from 'gsap';
import { Observer, ScrollTrigger } from 'gsap/all';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavbarDesktopComponent,
    NavbarMobileComponent,
    EducationComponent,
    ProfessionalSkillsComponent,
    WorkComponent,
    PortfolioComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
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
    private viewportScroller: ViewportScroller,
    private router: Router
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

    this.arrowIcon = this.theme.getArrowIcon();

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

    const breathingTimeline = gsap.timeline({ repeat: -1, yoyo: true });
    aboutItems.forEach((item: HTMLElement) => {
      breathingTimeline.fromTo(
        item,
        { y: 0, rotate: 0 },
        {
          y: () => Math.random() * (-3.5 * 3.5) + 1,
          rotate: () => Math.random() * (-1.25 * 1.25) + 0.5,
          ease: 'elastic.inOut',
          stagger: 1,
          duration: 2,
          overwrite: 'auto',
        },
        0
      );
      // Observer.create({
      //target: item, // Attach the observer to each item individually
      // type: 'pointer', // Handle pointer events
      // onHover: () => {
      //   gsap.to(item, {
      //     // Math.random() * (max - min): Scales the random number to be within the range of 0 to (max - min).
      //     // + min: Shifts the scaled number to the desired range [min, max].
      //     rotateZ: Math.random() * (-0.25 - 0.5) + 0.5,
      //     duration: 0.25,
      //   });
      // },
      // onHoverEnd: () => {
      //   gsap.to(item, {
      //     rotateZ: 0,
      //     duration: 0.25,
      //   });
      // },
      // });
    });

    // ScrollTrigger Timelines
    const educationTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#education',
        start: 'top 100%',
        end: 'top 50%',
        scrub: true,
        markers: this.themeDebug,
      },
    });

    const workTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#work',
        start: 'top 100%',
        end: 'top 50%',
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
        start: 'middle 85%',
        end: 'bottom 65%',
        scrub: true,
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

    portfolioTimeline
      .fromTo(
        '.portfolio-container',
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1.5, y: 0, scale: 1, stagger: 0.4 }
      )
      .fromTo(
        '.portfolio-title div span',
        { opacity: 0 },
        { opacity: 1, stagger: 0.075 },
        0
      );
  }

  ngOnDestroy(): void {
    // this.scrollSmooth.destroy();
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

  openResume(): void {
    const fileURL = './assets/anthony-hajjar-resume.pdf';

    window.open(fileURL);
  }

  openPortfolio(): void {
    if (!this.isMobile) this.scrollSmooth.destroy();

    this.router.navigate(['/portfolio']);
  }
}
