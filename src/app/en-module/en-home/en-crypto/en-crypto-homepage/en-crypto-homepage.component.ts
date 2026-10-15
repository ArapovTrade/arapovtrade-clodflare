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
import { ActivatedRoute } from '@angular/router';
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
     private route: ActivatedRoute,
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

    this.titleService.setTitle('Free Trading & Financial Markets Education | ArapovTrade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Explore free trading courses, articles, videos and books on market analysis, risk management and psychology. Choose a learning path for your level.',
    });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'Trading, Trading education , Technical analysis, Financial exchange, Trading system, Igor Arapov',
    });
    
    this.meta.updateTag({ name: 'datePublished', content: '2025-06-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-10-12' });
 


   
// Open Graph + Twitter Card — English homepage

const ogImage =
  'https://arapovtrade.com/assets/redesignArapovTrade/img/arapovtrade-banner-en.jpg';

const ogTitle =
  'Free Trading Education and Financial Markets | ArapovTrade';

const ogDescription =
  'Explore free trading courses, articles, videos and books on market analysis, risk management and psychology. Choose a learning path for your level.';

const ogImageAlt =
  'ArapovTrade — Free trading education platform';

const pageUrl = 'https://arapovtrade.com/en/main';

// Open Graph
this.meta.updateTag({
  property: 'og:site_name',
  content: 'ArapovTrade',
});

this.meta.updateTag({
  property: 'og:type',
  content: 'website',
});

this.meta.updateTag({
  property: 'og:locale',
  content: 'en_US',
});

this.meta.updateTag({
  property: 'og:url',
  content: pageUrl,
});

this.meta.updateTag({
  property: 'og:title',
  content: ogTitle,
});

this.meta.updateTag({
  property: 'og:description',
  content: ogDescription,
});

this.meta.updateTag({
  property: 'og:image',
  content: ogImage,
});

this.meta.updateTag({
  property: 'og:image:secure_url',
  content: ogImage,
});

this.meta.updateTag({
  property: 'og:image:type',
  content: 'image/jpeg',
});

this.meta.updateTag({
  property: 'og:image:width',
  content: '1200',
});

this.meta.updateTag({
  property: 'og:image:height',
  content: '630',
});

this.meta.updateTag({
  property: 'og:image:alt',
  content: ogImageAlt,
});

// Twitter Card
this.meta.updateTag({
  name: 'twitter:card',
  content: 'summary_large_image',
});

this.meta.updateTag({
  name: 'twitter:url',
  content: pageUrl,
});

this.meta.updateTag({
  name: 'twitter:title',
  content: ogTitle,
});

this.meta.updateTag({
  name: 'twitter:description',
  content: ogDescription,
});

this.meta.updateTag({
  name: 'twitter:image',
  content: ogImage,
});

this.meta.updateTag({
  name: 'twitter:image:alt',
  content: ogImageAlt,
});








    this.addWebSiteSchema();

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
      //  if (typeof window !== 'undefined') {
      //     window.scrollTo(0, 0);
      //   } 
       if (typeof window !== 'undefined') {
          // Не скроллим наверх, если в URL есть фрагмент (якорь) —
          // в этом случае скроллом займётся scrollToFragment
          const urlTree = this.router.parseUrl(event.urlAfterRedirects);

          if (!urlTree.fragment) {
            window.scrollTo(0, 0);
          }
        }
      }
    });
  this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollToFragment(fragment);
      }
    });
  }

   scrollToFragment(fragment: string) {
    // requestAnimationFrame надёжнее чем setTimeout
    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = this.document.getElementById(fragment);
        if (element) {
          const offset = 80;
          const top =
            element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 400);
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
  navigateToFragment(fragment: string) {
    this.router
      .navigate([], {
        fragment,
        // Это заставляет Angular эмитить событие даже если fragment тот же
        onSameUrlNavigation: 'reload',
      })
      // .then(() => {
      //   this.scrollToFragment(fragment);
      // });
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

   

  private addWebSiteSchema() {
    const exists = Array.from(
      this.document.querySelectorAll('script[type="application/ld+json"]'),
    ).some((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');
        return json['@type'] === 'WebSite' && json['name'] === 'ArapovTrade';
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
      '@id': 'https://arapovtrade.com/#website',
      url: 'https://arapovtrade.com/en',
      name: 'ArapovTrade',
      alternateName: 'Trading Education',
      description:
        'Free trading education by Igor Arapov. 51+ articles, 78+ video lessons.',
      inLanguage: 'en-US',
      publisher: {
       '@id': 'https://arapovtrade.com/#organization'
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
