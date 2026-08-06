import {
  AfterViewInit,
  ChangeDetectorRef,
  PLATFORM_ID,
  Inject,
  OnDestroy,
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  RendererFactory2,
  ElementRef,
  HostListener,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { ArticlesService } from '../../../../servises/articles.service';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { LangService } from '../../../../servises/lang.service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
declare var AOS: any;
import { ThemeservService } from '../../../../servises/themeserv.service';
import { artickle } from '../../../../servises/articles.service';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-ru-blog-homepage',
  templateUrl: './ru-blog-homepage.component.html',
  styleUrl: './ru-blog-homepage.component.scss',
})
export class RuBlogHomepageComponent implements OnInit {
  @ViewChild('scrollToTop') scrollToTop!: ElementRef;
  @ViewChild(MatPaginator) paginatorr!: MatPaginator;
  private renderer: Renderer2;

  constructor(
    private activateRout: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private lang: LangService,
    private artickleServ: ArticlesService,
    private paginator: MatPaginatorIntl,
    @Inject(DOCUMENT) private document: Document,
    private cdr: ChangeDetectorRef,
    private themeService: ThemeservService,
    private rendererFactory: RendererFactory2,
    private router: Router,
    private meta: Meta,
    private eRef: ElementRef,
    private titleService: Title,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

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
  currentLang = 'ru';
  dropdownOpen = false;
  menuOpen: boolean = false;

  filteredArticles: any = [];
  rusGroups: any = [];
  ngOnInit(): void {
    this.activateRout.queryParams.subscribe((params) => {
      const selectedGroup = params['group'];
      if (selectedGroup) {
        this.artickleServ.selectedGroups = [selectedGroup];
        this.grr = [...this.artickleServ.selectedGroups];
        this.checkedGroup = [...this.artickleServ.selectedGroups];

        this.cdr.detectChanges();
        this.onGroupChangeFromEvent(selectedGroup);
      }
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
    this.removeExistingWebPageSchema();
    this.addWebSiteSchema();
    this.lang.setNumber(2);
    this.paginator.itemsPerPageLabel = '';

    this.titleService.setTitle(
      'Обучение трейдингу онлайн | Бесплатные курсы трейдеров от Игоря Арапова',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'keywords',
      content:
        'бесплатное обучение трейдингу, обучение трейдингу с нуля, курсы трейдинга онлайн, дистанционное обучение трейдингу, трейдинг с нуля, обучение трейдингу криптовалют, торговые стратегии',
    });
    this.meta.updateTag({
      name: 'description',
      content:
        'Бесплатное обучение трейдингу от Игоря Арапова — полный пошаговый курс с нуля, разбор торговых стратегий, управление рисками и практические занятия. Изучайте трейдинг и криптовалюты дистанционно и бесплатно.',
    });

    this.filteredArticles = this.artickleServ.russianssArticles();
    this.rusGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updatePaginatedArticles();
    this.updateArticleCounts();
    this.gerRandom();
  }

  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticlesFive();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
  ];

  grr!: any;
  checkedGroup!: any;
  onGroupChangeFromEvent(value: string) {
    // Обновляем фильтрованные статьи
    this.filteredArticles = this.artickleServ.ukrainiansArticles();
    this.updatePaginatedArticles();

    // Возвращаем пагинацию на первую страницу

    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.moveToTheTop();
      }, 500); // Задержка для рендеринга DOM
    }
  }

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    // Если нажали на уже выбранную группу — сбрасываем фильтр (показываем все)
    if (this.artickleServ.selectedGroups.includes(value)) {
      this.artickleServ.selectedGroups = [];
    } else {
      // Иначе выбираем только одну группу
      this.artickleServ.selectedGroups = [value];
    }

    // Обновляем фильтрованные статьи
    this.filteredArticles = this.artickleServ.russianssArticles();
    this.updatePaginatedArticles();

    this.paginatorr.firstPage();
  }
  paginatedArticles = []; // Статьи для отображения на текущей странице
  currentPage = 0;
  pageSize = 60;
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedArticles();

    const topPosition = this.scrollToTop.nativeElement.offsetTop;
    window.scrollTo({
      top: topPosition,
      behavior: 'smooth',
    });
    this.moveToTheTop();
  }
  updatePaginatedArticles() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedArticles = this.filteredArticles.slice(startIndex, endIndex);
    this.checkedGroup = this.artickleServ.selectedGroups;
  }
  navigateToStudy() {
    this.router.navigateByUrl('/ru/studying');
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

  articleCounts: { [key: string]: number } = {};
  updateArticleCounts() {
    this.articleCounts = {}; // очищаем

    this.artickleServ.ukrArtickles.forEach((article) => {
      // article.groupsUkr — это массив, например ['Програмування', 'Маркетинг']
      article.groupsRus.forEach((group) => {
        if (!this.articleCounts[group]) {
          this.articleCounts[group] = 1;
        } else {
          this.articleCounts[group]++;
        }
      });
    });
  }
  //popup
  flag1: boolean = false;
  flagTrue1: boolean = true;
  searchtoggle(event: Event) {
    this.flag1 = !this.flag1;
    this.flagTrue1 = !this.flagTrue1;
  }

  isFocused = false;
  displayedArticles: artickle[] = [];
  maxResults = 5;
  searchQuery: string = '';

  onFocus() {
    this.isFocused = true;

    // Показываем 5 случайных статей при фокусе, если инпут пуст
    if (!this.searchQuery) {
      const shuffled = [...this.artickleServ.ukrArtickles].sort(
        () => Math.random() - 0.5,
      );
      this.displayedArticles = shuffled.slice(0, this.maxResults);
    }
  }

  onBlur() {
    setTimeout(() => {
      this.isFocused = false;
    }, 150); // таймаут чтобы клик по статье сработал
  }

  onSearchChange() {
    // Логика асинхронного поиска
    const filtered = this.artickleServ.ukrArtickles.filter((a) =>
      a.titleRus.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
    this.displayedArticles = filtered.slice(0, this.maxResults);
  }

  moveToTheTop() {
    const element = document.getElementById('scrollToTop');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  groupsMenuOpen = false;
  toggleGroupsMenu(event: Event) {
    this.groupsMenuOpen = !this.groupsMenuOpen;
  }
  private removeExistingWebPageSchema(): void {
    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '{}');
        const graph = content['@graph'] || [content];
        if (graph.some((n: any) => n['@type'] === 'CollectionPage')) {
          script.remove();
        }
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
            n['@type'] === 'CollectionPage' &&
            n['name'] === 'Бесплатное обучение трейдингу',
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
          '@type': 'CollectionPage',
          '@id': 'https://arapov.trade/ru/freestudying#collection',
          name: 'Бесплатное обучение трейдингу',
          description:
            'Более 50+ бесплатных статей по трейдингу: Smart Money Concepts, метод Вайкоффа, технический анализ, криптотрейдинг. Полный курс для начинающих.',
          url: 'https://arapov.trade/ru/freestudying',
          inLanguage: 'ru',
          isPartOf: { '@id': 'https://arapov.trade/#website' },
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: { '@id': 'https://arapov.trade/#organization' },
          about: [
            { '@type': 'Thing', name: 'Trading Education' },
            { '@type': 'Thing', name: 'Smart Money Concepts' },
            { '@type': 'Thing', name: 'Technical Analysis' },
          ],
          mainEntity: {
            '@type': 'ItemList',
            name: 'Основные темы курса трейдинга',
            numberOfItems: 5,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Smart Money Concepts',
                url: 'https://arapov.trade/ru/freestudying/smart-money-guide',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Метод Вайкоффа',
                url: 'https://arapov.trade/ru/freestudying/wyckoff-method',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Технический анализ',
                url: 'https://arapov.trade/ru/freestudying/chart-reading',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Торговые индикаторы',
                url: 'https://arapov.trade/ru/freestudying/trading-indicators',
              },
              {
                '@type': 'ListItem',
                position: 5,
                name: 'Криптотрейдинг',
                url: 'https://arapov.trade/ru/freestudying/crypto-basics',
              },
            ],
          },
        },
        {
          '@type': 'Person',
          '@id': 'https://arapov.trade/#person',
          name: 'Igor Arapov',
          url: 'https://arapov.trade/ru',
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
        },
      ],
    });

    this.document.head.appendChild(script);
  }
}
