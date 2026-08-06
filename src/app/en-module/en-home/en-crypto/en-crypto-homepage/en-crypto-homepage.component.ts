import {
  Component,
  Inject,
  OnInit,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { ThemeservService } from '../../../../servises/themeserv.service';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-en-crypto-homepage',
  templateUrl: './en-crypto-homepage.component.html',
  styleUrl: './en-crypto-homepage.component.scss',
})
export class EnCryptoHomepageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  constructor(
    private meta: Meta,
    private titleService: Title,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeservService,
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      if (typeof AOS !== 'undefined') {
        AOS.init({
          duration: 1000,
          once: false,
          offset: 100,
        });
      }
    }, 500); // Задержка 0.5s
  }
  isDark!: boolean;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'en';
  dropdownOpen = false;
  menuOpen: boolean = false;
  ngOnInit() {
    this.removeExistingWebPageSchema();

    this.titleService.setTitle('Free trading education from Igor Arapov');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Igor Arapov`s Free Trading Course: 151+ Articles and 78+ Videos. Study Technical Analysis, Risk Management, and Trading Strategies Online',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Trading, Trading education , Technical analysis, Financial exchange, Trading system, Igor Arapov',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-06-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-05-29' });

    this.meta.updateTag({
      property: 'og:image',
      content: 'https://arapov.trade/assets/img/photo_mainpage.jpg',
    });
    this.addWebSiteSchema();

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
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
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

  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );

    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        if (content['@type'] === 'WebSite') {
          script.remove();
        }
      } catch (e) {
        // Игнорируем некорректные JSON (например, из других источников)
      }
    });
  }

  // private addWebSiteSchema() {
  //   const exists = Array.from(
  //     this.document.querySelectorAll('script[type="application/ld+json"]')
  //   ).some((script) => {
  //     try {
  //       const json = JSON.parse(script.textContent || '{}');
  //       return json['@type'] === 'WebSite' && json['name'] === 'Arapov.Trade';
  //     } catch {
  //       return false;
  //     }
  //   });

  //   // Если уже существует — выходим
  //   if (exists) return;

  //   // Создаем новый JSON-LD
  //   const script = this.document.createElement('script');
  //   script.type = 'application/ld+json';
  //   script.text = JSON.stringify({
  //     '@context': 'https://schema.org',
  //     '@type': 'WebSite',
  //     '@id': 'https://arapov.trade/en/main#website',
  //     url: 'https://arapov.trade/en/main',
  //     name: 'Arapov.Trade',
  //     alternateName: 'Trading Education',
  //     description:
  //       'Free trading education by Igor Arapov. 151+ articles, 78+ video lessons.',
  //     inLanguage: 'en-US',
  //     publisher: {
  //       '@type': 'Organization',
  //       '@id': 'https://arapov.trade/#organization',
  //       name: 'Arapov.Trade',
  //       url: 'https://arapov.trade',
  //       logo: {
  //         '@type': 'ImageObject',
  //         url: 'https://arapov.trade/favicon.ico',
  //       },
  //       founder: {
  //         '@type': 'Person',
  //         '@id': 'https://arapov.trade/en#person',
  //         name: 'Арапов Ігор Віталійович',
  //       },
  //     },
  //   });

  //   this.document.head.appendChild(script);
  // }

  private addWebSiteSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]'),
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return json['@type'] === 'WebSite' && json['name'] === 'Arapov.Trade';
      } catch {
        return false;
      }
    });

    // Если уже существует — выходим
    if (exists) return;

    // Создаем новый JSON-LD
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://arapov.trade/#website',
      url: 'https://arapov.trade/en',
      name: 'Arapov.Trade',
      alternateName: 'Trading Education',
      description:
        'Free trading education by Igor Arapov. 151+ articles, 78+ video lessons.',
      inLanguage: 'en-US',
      publisher: {
        '@type': 'Organization',
        '@id': 'https://arapov.trade/#organization',
        name: 'Arapov.Trade',
        url: 'https://arapov.trade',
        logo: {
          '@type': 'ImageObject',
          url: 'https://arapov.trade/favicon.ico',
        },
        founder: {
          '@type': 'Person',
          '@id': 'https://arapov.trade/#person',
          name: 'Igor Arapov',
        },
      },
    });

    this.document.head.appendChild(script);
  }



    protected goToGroup(text:string){
     this.router.navigate(['/en/freestudying'], {
      queryParams: { group: text },
    });
   }




   
}
