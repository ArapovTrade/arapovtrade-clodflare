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
declare global {
  interface Window { adsbygoogle: any[]; }
}
import { isPlatformBrowser } from '@angular/common';
import {   PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-cover-en',
  templateUrl: './cover-en.component.html',
  styleUrl: './cover-en.component.scss'
})
export class CoverEnComponent implements   AfterViewInit  {

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
  currentLang = 'en';
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
