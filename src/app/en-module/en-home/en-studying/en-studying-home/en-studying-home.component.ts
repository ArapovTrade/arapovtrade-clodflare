import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  RendererFactory2,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LangService } from '../../../../servises/lang.service';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
declare var AOS: any;
import { ThemeservService } from '../../../../servises/themeserv.service';

@Component({
  selector: 'app-en-studying-home',
  templateUrl: './en-studying-home.component.html',
  styleUrl: './en-studying-home.component.scss',
})
export class EnStudyingHomeComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private renderer: Renderer2;
  constructor(
    private router: Router,
    private meta: Meta,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeservService,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,

    private titleService: Title,
    private lang: LangService,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngAfterViewInit() {}
  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  }
  isDark!: boolean;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'en';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit(): void {
    this.removeExistingWebPageSchema();
    this.addWebSiteSchema();

    this.lang.setNumber(3);
    this.titleService.setTitle(
      'Online Trading Courses by Igor Arapov | Trading Education from Scratch',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-04-17' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Online trading courses by Igor Arapov — learn trading from scratch, remotely and for free. Study technical and fundamental analysis, trading strategies and risk management step by step.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'trading courses, online trading education, trading from scratch, remote learning, investments, trading strategies',
    });
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });
  }
  navigateToHomeWithId() {
    window.location.href = 'https://telegram.me/+380506308200';
  }
  scrollToRegistration() {
    const element = document.getElementById('registrationEn');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  ngOnDestroy() {
    // Отписка от подписок
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  hovered: string | null = null;
  toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setTheme(this.isDark);

    this.refreshAOS();
  }
  refreshAOS() {
    if (typeof AOS !== 'undefined') {
      setTimeout(() => {
        AOS.refresh(); // Обновление позиций AOS
        this.cdr.detectChanges(); // Принудительное обнаружение изменений
      }, 100); // Задержка для синхронизации
    } else {
      console.warn('AOS is not defined, refresh skipped');
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  selectLang(lang: string) {
    this.currentLang = lang;

    this.dropdownOpen = false;
  }
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  @ViewChild('programSection', { static: true }) section!: ElementRef;
  @ViewChild('timelineProgress', { static: true }) progress!: ElementRef;

  @HostListener('window:scroll', [])
  onScroll() {
    const section = this.section.nativeElement;
    const progress = this.progress.nativeElement;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // расстояние от верха страницы до секции
    const start = rect.top + window.scrollY - windowHeight;
    const end = rect.bottom + window.scrollY;
    const scrollPos = window.scrollY;

    // процент прокрутки блока
    const percent = Math.min(
      Math.max((scrollPos - start) / (end - start), 0),
      1,
    );

    progress.style.height = `${percent * 100}%`;
  }

  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        const graph = content['@graph'] || [content];
        if (graph.some((n: any) => n['@type'] === 'Course')) {
          script.remove();
        }
        // строку про WebSite убрал — не сносим сайт-узел
      } catch (e) {}
    });
  }

  private addWebSiteSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]'),
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        const graph = json['@graph'] || [json];
        return graph.some(
          (n: any) =>
            n['@type'] === 'Course' &&
            n['name'] === 'Professional Trading Course',
        );
      } catch {
        return false;
      }
    });

    if (exists) return;

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Course',
          '@id': 'https://arapov.trade/en/studying#course',
          name: 'Professional Trading Course',
          description:
            'Individual trading education from scratch under the guidance of an experienced trader. Wyckoff Method, Volume Analysis, practice on live accounts.',
          url: 'https://arapov.trade/en/studying',
          inLanguage: 'en',
          author: { '@id': 'https://arapov.trade/#person' },
          provider: { '@id': 'https://arapov.trade/#organization' },
          educationalLevel: 'Beginner to Advanced',
          teaches: [
            'Wyckoff Method',
            'Volume Analysis',
            'Technical Analysis',
            'Risk Management',
            'Market Psychology',
            'Smart Money Concepts',
          ],
          about: [
            { '@type': 'Thing', name: 'Stock Trading' },
            { '@type': 'Thing', name: 'Forex Trading' },
            { '@type': 'Thing', name: 'Cryptocurrency Trading' },
          ],
          hasCourseInstance: {
            '@type': 'CourseInstance',
            courseMode: 'online',
            courseWorkload: 'P4W',
            instructor: { '@id': 'https://arapov.trade/#person' },
          },
        },
        {
          '@type': 'Person',
          '@id': 'https://arapov.trade/#person',
          name: 'Igor Arapov',
          url: 'https://arapov.trade/en',
          sameAs: [
            'https://www.wikidata.org/wiki/Q137454477',
            'https://scholar.google.com/citations?user=N440tWQAAAAJ',
            'https://orcid.org/0009-0003-0430-778X',
            'https://isni.org/isni/0000000529518564',
            'https://www.amazon.com/stores/author/B0GBRFY457',
            'https://github.com/ArapovTrade',
            'https://ua.linkedin.com/in/arapovtrade',
            'https://www.youtube.com/@ArapovTrade',
            'https://t.me/ArapovTrade',
          ],
        },
        {
          '@type': 'Organization',
          '@id': 'https://arapov.trade/#organization',
          name: 'Arapov.Trade',
          url: 'https://arapov.trade',
          logo: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/favicon.ico',
          },
          founder: { '@id': 'https://arapov.trade/#person' },
        },
      ],
    });

    this.document.head.appendChild(script);
  }
}
