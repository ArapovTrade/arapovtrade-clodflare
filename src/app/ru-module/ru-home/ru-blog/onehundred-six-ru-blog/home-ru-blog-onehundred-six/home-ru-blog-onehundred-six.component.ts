import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-ru-blog-onehundred-six',
  templateUrl: './home-ru-blog-onehundred-six.component.html',
  styleUrl: './home-ru-blog-onehundred-six.component.scss',
})
export class HomeRuBlogOnehundredSixComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}
flagshipVideos=[
  { id: 'Y4WZAl34jbc', title: 'Как Устроена Биржа: Ордера, Фьючерсы, Шорт и Торговые Сессии',
    description: 'Механика биржи с нуля: как формируется цена, чем лимитный ордер отличается от рыночного, что такое шорт-позиция и когда лучше торговать.' },
  { id: 'hch9D_3hVrg', title: 'Технический Анализ с Нуля: Уровни, Паттерны и Ложный Пробой',
    description: 'Как строить уровни поддержки и сопротивления, читать трендовые каналы и распознавать ложный пробой.' },
  { id: '15GVAkZI6DI', title: 'Метод Вайкоффа с Нуля: Объёмный Анализ, Фазы Накопления',
    description: 'Как крупный капитал накапливает позицию до того, как цена начнёт двигаться.' },
  { id: '4Gxguf2Gm2M', title: 'Smart Money с Нуля: Ликвидность, Ордер-Блоки, Манипуляции',
    description: 'Современный язык метода Вайкоффа: ликвидность толпы, ордер-блоки, имбаланс.' },
  { id: '5PLGouidw-A', title: 'Почему Теряют Депозит: Риск-Менеджмент и Психология',
    description: 'Стоп-лосс, риск на сделку, соотношение риск/прибыль 1:3, математическое ожидание 60/40.' },
  { id: 'U7LnPofJaiw', title: 'Криптовалюты и Трейдинг: Трейдер или Инвестор, Bitcoin, Скам',
    description: 'Разница между трейдингом и инвестированием в крипте, риски скама и мем-коинов.' },
  { id: 'tmiHem6NOZs', title: 'Первая Сделка в Трейдинге: от TradingView до Демосчёта за 45 Минут',
    description: 'Практический выпуск: как открыть демосчёт, настроить TradingView и совершить первую осознанную сделку.' },
  { id: 'vO9LNx0NfAI', title: 'Трейдинг с Нуля: Полный Курс для Начинающих (2,5 часа)',
    description: 'Весь курс в одном видео: биржа, система, психология.' },
  { id: 'ZHhJqYzyaO4', title: 'Бесплатный Курс: метод Вайкоффа и объёмный анализ | Smart Money',
    description: 'Объединённый разбор двух продвинутых тем вместе.' }
];

  private routerSubscription!: Subscription;
  private themeSubscription!: Subscription;
  isDark!: boolean;
  ukrGroups: any = [];
  grr!: any;
  checkedGroup!: any;

  readonly panelOpenState = signal(false);

  ngOnInit(): void {
    this.removeSelectedSchemas();
    this.setArticleSchema();
    this.setPersonSchema();

    this.titleService.setTitle(
      'Про ARAPOV.TRADE — Образовательная платформа по трейдингу',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Образовательная платформа Игоря Арапова: 51+ статья, 9 книг с ISBN, 78+ видеоуроков на 3 языках. Бесплатное обучение трейдингу: Smart Money, метод Вайкоффа, объёмный анализ.',
    });

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
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

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
      queryParams: { group: value },
    });

    this.checkedGroup = this.artickleServ.selectedGroups;
  }
  paginatedArticles = []; // Статьи для отображения на текущей странице
  currentPage = 0;
  pageSize = 10;

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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase()),
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

  goToNextPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path,
    );

    if (this.artickleServ.ukrArtickles.length - 1 == index) {
      nextpage = this.artickleServ.ukrArtickles[0].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index + 1].linkUkr;
    }

    this.router.navigate(['/ru/freestudying', nextpage]);
  }

  goToPreviousPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path,
    );

    if (index == 1) {
      nextpage =
        this.artickleServ.ukrArtickles[
          this.artickleServ.ukrArtickles.length - 1
        ].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index - 1].linkUkr;
    }

    this.router.navigate(['/ru/freestudying', nextpage]);
  }

  private removeSelectedSchemas(): void {
    const typesToRemove = [
      'AboutPage',
      'FAQPage',
      'HowTo',
      'DefinedTermSet',
      'Person',
    ];

    const scripts = this.document.querySelectorAll(
      'script[type="application/ld+json"]',
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type']),
        );

        if (shouldRemove) {
          script.remove();
        }
      } catch {
        /* ignore invalid */
      }
    });
  }

  private addJsonLdSchema(data: any): void {
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.renderer.appendChild(this.document.head, script);
  }

  // ============================================================
  //  ARTICLE
  // ============================================================
  private setArticleSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          url: 'https://arapov.trade/ru/freestudying/about',
          name: 'Про ARAPOV.TRADE',
          headline: 'Про ARAPOV.TRADE — Образовательная платформа по трейдингу',
          description:
            '150 статей, 9 книг с ISBN, 80+ видеоуроков на 3 языках. Бесплатное обучение трейдингу: Smart Money, метод Вайкоффа, объёмный анализ.',
          inLanguage: 'ru',
          mainEntity: {
            '@type': 'EducationalOrganization',
            '@id': 'https://arapov.trade/#organization',
          },
          author: {
            '@type': 'Person',
            '@id': 'https://arapov.trade/#person',
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  PERSON
  // ============================================================
  private setPersonSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://arapov.trade/#person',
       name: 'Игорь Арапов',
      alternateName: [
        'Igor Arapov',
              'Арапов Игорь',
              'I. Arapov',
              'Ігор Арапов',
              'І. В. Арапов',
              'Арапов Ігор',
              'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
      image:
        'https://arapov.trade/assets/redesignArapovTrade/img/imageAuthor-light.png',
      sameAs: [
        'https://www.wikidata.org/wiki/Q137454477',
        'https://scholar.google.com/citations?user=N440tWQAAAAJ',
        'https://orcid.org/0009-0003-0430-778X',
        'https://isni.org/isni/0000000529518564',
        'https://www.amazon.com/stores/author/B0GBRFY457',
        'https://github.com/ArapovTrade',
        'https://ua.linkedin.com/in/arapovtrade',
        'https://www.youtube.com/@ArapovTrade',
        'https://t.me/ArapovTrade'
      ],
      jobTitle: ['Независимый исследователь', 'трейдер', 'автор и основатель arapov.trade'],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
    };

    this.addJsonLdSchema(data);
  }
}
