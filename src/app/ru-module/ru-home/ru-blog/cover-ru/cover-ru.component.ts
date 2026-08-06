import { ChangeDetectorRef, Component, Renderer2, RendererFactory2,
   
  Inject,   AfterViewInit, OnDestroy,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../../../servises/articles.service';
import { LangService } from '../../../../servises/lang.service';
import { SearchServiceService } from '../../../../servises/search-service.service';
import { ServLangueageService } from '../../../../servises/serv-langueage.service';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { MetaservService } from '../../../../servises/metaserv.service';
 import { takeUntil } from 'rxjs/operators';
 import { Subscription } from 'rxjs';
declare var AOS: any;
import { ThemeservService } from '../../../../servises/themeserv.service';
import { isPlatformBrowser } from '@angular/common';
import {   PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-cover-ru',
  templateUrl: './cover-ru.component.html',
  styleUrl: './cover-ru.component.scss'
})
export class CoverRuComponent {

dropdownOpen = false;
  checkLang!: number;
  private destroy$ = new Subject<void>();
  private renderer: Renderer2;
  breadcrumbs: any[] = []; // Массив для хлебных крошек

  jsonLd: any; // Объект для JSON-LD
  

   
  constructor( private router: Router,
      private route: ActivatedRoute,
      private artickle: ArticlesService,
      private lan: LangService,
      private cdr: ChangeDetectorRef,
      private searchSer: SearchServiceService,
      private languageService: ServLangueageService,
      private rendererFactory: RendererFactory2,
      private themeService:ThemeservService,
     @Inject(DOCUMENT) private document: Document,
      private meta: Meta,
         private titleService: Title,
         private metaTegServ: MetaservService,@Inject(PLATFORM_ID) private platformId: Object
    ) {
       
     
        this.renderer = rendererFactory.createRenderer(null, null);
    
     
   
     
  }

ngAfterViewInit() {
// setTimeout(() => {
//       try {
//         (window.adsbygoogle = window.adsbygoogle || []).push({});
//       } catch (e) {
//         console.error('adsbygoogle error', e);
//       }
//     }, 300);
if (!isPlatformBrowser(this.platformId)) {
    return;
  }

  setTimeout(() => {
    try {
      (window as any).adsbygoogle =
        (window as any).adsbygoogle || [];

      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error('adsbygoogle error', e);
    }
  }, 300);



  
}

  changeLanguage(lang: string) {
    // Получение текущего пути и параметров маршрута
    const currentPath = this.router.url;
    const pathSegments = currentPath.split('/');
     
    // Замена языка в пути
    if (// тут тоже нужна логика для мейн пейдж
      pathSegments[1] === 'uk' ||
      pathSegments[1] === 'en' ||
      pathSegments[1] === 'ru'
    ) {
      pathSegments[1] = lang;
    } else {
      pathSegments.unshift(lang);
    }

    // Построение нового пути
    const newPath = pathSegments.join('/');
    this.artickle.selectedGroups = [];
    // Перенаправление на новый путь
    this.router.navigateByUrl(newPath).then(() => {
      // После перехода выполнить прокрутку страницы в самый верх
      window.scrollTo(0, 0);
    });
  }
menuOpen: boolean = false;
  isMenuOpen = false;
isDark!:boolean  ;
  languages = ['ua', 'en', 'ru']; // какие языки нужны
  currentLang = 'ru';
   private routerSubscription!: Subscription;
    private themeSubscription!: Subscription;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  toggleMenu() {
   this.isMenuOpen = !this.isMenuOpen;
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      this.dropdownOpen = false; // Закрываем меню языков, если открываем навигацию
    }
  }

  setUkraine() {
    this.lan.setNumber(1);
  }
  setRussian() {
    this.lan.setNumber(2);
  }
  setEnglish() {
    this.lan.setNumber(3);
  }
  registForm: any;

 //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }


  ngOnInit(): void {
this.themeSubscription =this.themeService.getTheme().subscribe(data=>{
      this.isDark=data;
        this.cdr.detectChanges();
    })


    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    });





       this.metaTegServ.addOrganizationSchema();
      this.languageService.languageCode$.subscribe((code) => {
        this.checkLang = code;
        this.searchSer.setLange(this.checkLang);
      });
         this.setDefaultMetaTags();
  
       
  
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
      this.removeMetaDescriptionIfExists()
          
          const urlPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, ''); // Отримуємо чистий шлях
          const segments = urlPath.split('/'); // Розбиваємо на сегменти
          const link = segments[segments.length - 1] || '';
          const article = this.artickle.getArticleByLink(link) || null;
          const langCode = urlPath.startsWith('uk') ? 'uk' : urlPath == '' ? 'uk' : urlPath.startsWith('en')?'en': 'ru';
          
           
          // Визначаємо мову та витягуємо відповідний заголовок
          const lang = urlPath.startsWith('uk')
            ? 'Ukr'
            : urlPath.startsWith('en')
            ? 'En'
            : 'Rus';
           
        });
    }
    private setDefaultMetaTags() {
    
  }
   getLang() {
      this.lan
        .getNumber()
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {
          this.checkLang = value;
          this.searchSer.setLange(this.checkLang);
        });
    }
    ngAfterViewChecked() {
      this.cdr.detectChanges();
    }
    ngOnDestroy() {
       this.destroy$.next();
      this.destroy$.complete();
      if (this.routerSubscription) {
        this.routerSubscription.unsubscribe();
      }
      if (this.themeSubscription) {
        this.themeSubscription.unsubscribe();
      }
    }
  
toggleTheme() {
    this.isDark = !this.isDark;
    this.themeService.setTheme(this.isDark)
     
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
   hovered: string | null = null;   








     //delete description
  private removeMetaDescriptionIfExists() {
  const head = this.document.head;
  const metaDescription = head.querySelector('meta[name="description"]');
  if (metaDescription) {
    head.removeChild(metaDescription);
  }
}
// hreflang
  private updateHreflangTags() {
    // Удаляем существующие hreflang теги, чтобы избежать дублирования
    const existingHreflangTags = this.document.querySelectorAll(
      'link[rel="alternate"][hreflang]'
    );
    existingHreflangTags.forEach((tag) => tag.remove());
    // Определяем текущий путь без параметров запроса
    const urlPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, '');
    const segments = urlPath.split('/');
    const currentLang =
      segments[0] === 'uk' || segments[0] === 'ru' || segments[0] === 'en' ? segments[0] : 'uk';
    // Определяем базовый путь без языка
    const basePath =
      (segments[0] === 'uk' || segments[0] === 'ru'|| segments[0] === 'en' ) && segments.length > 1
        ? segments.slice(1).join('/')
        : '';
    // Для корневой страницы (arapov.trade/) добавляем только hreflang="uk"
    if (urlPath === '') {
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'alternate');
      this.renderer.setAttribute(link, 'hreflang', 'uk');
      this.renderer.setAttribute(link, 'href', 'https://arapov.trade/');
      this.renderer.appendChild(this.document.head, link);
      
      return;
    }
    // Для остальных страниц (arapov.trade/uk, arapov.trade/ru и других)
    const supportedLanguages = [
      { code: 'uk', hreflang: 'uk' },
      { code: 'ru', hreflang: 'ru' },
      { code: 'en', hreflang: 'en' },
    ];
    // Добавляем тег hreflang для каждого языка
    supportedLanguages.forEach((lang) => {
      const href =
        lang.code === 'uk'
          ? `https://arapov.trade/${basePath ? 'uk/' + basePath : 'uk'}`
          : lang.code === 'en'
    ? `https://arapov.trade/${basePath ? 'en/' + basePath : 'en'}`
          : `https://arapov.trade/${basePath ? 'ru/' + basePath : 'ru'}`;
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'alternate');
      this.renderer.setAttribute(link, 'hreflang', lang.hreflang);
      this.renderer.setAttribute(link, 'href', href);
      this.renderer.appendChild(this.document.head, link);
    });
    // Добавляем hreflang="x-default" (используем русскую версию как дефолтную)
    const defaultHref =
      basePath === ''
        ? 'https://arapov.trade/ru'
        : `https://arapov.trade/ru/${basePath}`;
    const defaultLink = this.renderer.createElement('link');
    this.renderer.setAttribute(defaultLink, 'rel', 'alternate');
    this.renderer.setAttribute(defaultLink, 'hreflang', 'x-default');
    this.renderer.setAttribute(defaultLink, 'href', defaultHref);
    this.renderer.appendChild(this.document.head, defaultLink);
   
  }

   private generateBreadcrumbs() {
    const urlPath = this.router.url.split('?')[0].replace(/^\/|\/$/g, '');

    this.breadcrumbs = []; // Определяем хлебные крошки в зависимости от маршрута
    if (urlPath === '' || urlPath === '/') {
      this.breadcrumbs.push({ name: 'Головна', url: 'https://arapov.trade' });
    } else if (urlPath === 'ru' || urlPath === 'uk' || urlPath === 'en') {
      if (urlPath === 'ru') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' }
        );
      } else if (urlPath === 'uk') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' }
        );
      } else if (urlPath === 'en') {
        this.breadcrumbs.push(
          { name: 'Main', url: 'https://arapov.trade/en/main' },
          { name: 'Course author', url: 'https://arapov.trade/en' }
        );
      }
    } else if (
      urlPath === 'ru/studying' ||
      urlPath === 'uk/studying' ||
      urlPath === 'en/studying'
    ) {
      if (urlPath === 'ru/studying') {
        this.breadcrumbs.push(
         { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Обучение трейдингу',
            url: 'https://arapov.trade/ru/studying',
          }
        );
      } else if (urlPath === 'uk/studying') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Навчання трейдингу',
            url: 'https://arapov.trade/ru/studying',
          }
        );
      } else if (urlPath === 'en/studying') {
        this.breadcrumbs.push(
         { name: 'Main', url: 'https://arapov.trade/en/main' },
          { name: 'Course author', url: 'https://arapov.trade/en' },
          {
            name: 'Trading training',
            url: 'https://arapov.trade/ru/studying',
          }
        );
      }
    } else if (
      urlPath === 'ru/freestudying' ||
      urlPath === 'uk/freestudying' ||
      urlPath === 'en/freestudying'
    ) {
      if (urlPath === 'ru/freestudying') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          }
        );
      } else if (urlPath === 'uk/freestudying') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          }
        );
      } else if (urlPath === 'en/freestudying') {
        this.breadcrumbs.push(
       { name: 'Main', url: 'https://arapov.trade/en/main' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          }
        );
      }
    } else if (
      urlPath === 'ru/freestudying/freeeducation' ||
      urlPath === 'uk/freestudying/freeeducation' ||
      urlPath === 'en/freestudying/freeeducation'
    ) {
      if (urlPath === 'ru/freestudying/freeeducation') {
        this.breadcrumbs.push(
         { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          },
          {
            name: 'Бесплатные курсы по трейдингу',
            url: 'https://arapov.trade/ru/freestudying/freeeducation',
          }
        );
      } else if (urlPath === 'uk/freestudying/freeeducation') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          },
          {
            name: 'Безкоштовні курси з трейдингу',
            url: 'https://arapov.trade/uk/freestudying/freeeducation',
          }
        );
      } else if (urlPath === 'en/freestudying/freeeducation') {
        this.breadcrumbs.push(
          { name: 'Main', url: 'https://arapov.trade/en/main' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          },
          {
            name: 'Free Trading Courses',
            url: 'https://arapov.trade/en/freestudying/freeeducation',
          }
        );
      }
    } else if (
      urlPath === 'ru/freestudying/practic' ||
      urlPath === 'uk/freestudying/practic' ||
      urlPath === 'en/freestudying/practic'
    ) {
      if (urlPath === 'ru/freestudying/practic') {
        this.breadcrumbs.push(
       { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          },
          {
            name: 'Торговая система трейдера',
            url: 'https://arapov.trade/ru/freestudying/practic',
          }
        );
      } else if (urlPath === 'uk/freestudying/practic') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          },
          {
            name: 'Торгова система трейдера',
            url: 'https://arapov.trade/uk/freestudying/practic',
          }
        );
      } else if (urlPath === 'en/freestudying/practic') {
        this.breadcrumbs.push(
         { name: 'Main', url: 'https://arapov.trade/en/main' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          },
          {
            name: 'Trader`s trading system',
            url: 'https://arapov.trade/en/freestudying/practic',
          }
        );
      }
    } else if (
      urlPath === 'ru/disclaimer' ||
      urlPath === 'uk/disclaimer' ||
      urlPath === 'en/disclaimer'
    ) {
      if (urlPath === 'ru/disclaimer') {
        this.breadcrumbs.push(
          { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Отказ от ответственности',
            url: 'https://arapov.trade/ru/disclaimer',
          }
        );
      } else if (urlPath === 'uk/disclaimer') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Відмова від відповідальності',
            url: 'https://arapov.trade/ru/disclaimer',
          }
        );
      } else if (urlPath === 'en/disclaimer') {
        this.breadcrumbs.push(
       { name: 'Main', url: 'https://arapov.trade/en/main' },
          { name: 'Course author', url: 'https://arapov.trade/en' },
          {
            name: 'Disclaimer',
            url: 'https://arapov.trade/ru/disclaimer',
          }
        );
      }
    } else {
      const urlArr = urlPath.split('/');

      if (urlArr[0] === 'ru') {
        this.breadcrumbs.push(
         { name: 'Главная', url: 'https://arapov.trade/ru/main' },
          { name: 'Автор курса', url: 'https://arapov.trade/ru' },
          {
            name: 'Бесплатное обучение трейдингу',
            url: 'https://arapov.trade/ru/freestudying',
          },
          {
            name: 'Теория по трейдингу',
            url: `https://arapov.trade/ru/freestudying/${urlArr[2]}`,
          }
        );
      } else if (urlArr[0] === 'uk') {
        this.breadcrumbs.push(
          { name: 'Головна', url: 'https://arapov.trade' },
          { name: 'Автор курсу', url: 'https://arapov.trade/uk' },
          {
            name: 'Безкоштовне навчання трейдингу',
            url: 'https://arapov.trade/uk/freestudying',
          },
          {
            name: 'Теорія з трейдингу',
            url: `https://arapov.trade/ru/freestudying/${urlArr[2]}`,
          }
        );
      } else if (urlArr[0] === 'en') {
        this.breadcrumbs.push(
         { name: 'Main', url: 'https://arapov.trade/en/main' },
          { name: 'Author of the Course', url: 'https://arapov.trade/en' },
          {
            name: 'Free trading education',
            url: 'https://arapov.trade/en/freestudying',
          },
          {
            name: 'Trading Theory',
            url: `https://arapov.trade/ru/freestudying/${urlArr[2]}`,
          }
        );
      }
    }
    // Генерируем JSON-LD
    this.jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.breadcrumbs.map((breadcrumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: breadcrumb.name,
        item: breadcrumb.url,
      })),
    };
    // Динамически обновляем <script> в DOM
    this.updateJsonLdScript();
  }
  // Метод для динамического обновления JSON-LD в DOM
  private updateJsonLdScript() {
    // Удаляем старый скрипт, если он есть
    const existingScript = this.document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }
    // Создаем новый скрипт
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'type', 'application/ld+json');
    this.renderer.setProperty(
      script,
      'textContent',
      JSON.stringify(this.jsonLd)
    );
    // this.renderer.appendChild(this.document.head, script);
    this.renderer.insertBefore(
      this.document.head,
      script,
      this.document.head.firstChild
    );
  }

  navigateTo(link:string){ this.router.navigate([link]); this.menuOpen=false;}
   toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  selectLang(lang: string) {
    this.currentLang = lang;

    this.dropdownOpen = false;

     
  }
}
