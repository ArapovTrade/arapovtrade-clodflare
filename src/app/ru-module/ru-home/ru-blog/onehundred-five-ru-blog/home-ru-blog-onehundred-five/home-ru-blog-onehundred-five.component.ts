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
  selector: 'app-home-ru-blog-onehundred-five',
  templateUrl: './home-ru-blog-onehundred-five.component.html',
  styleUrl: './home-ru-blog-onehundred-five.component.scss',
})
export class HomeRuBlogOnehundredFiveComponent implements OnInit {
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
    this.setFaqSchema();
    this.setHowToSchema();
    this.setGlossarySchema();
    this.titleService.setTitle('Торговля XRP (Ripple) | Полное руководство');
    this.meta.updateTag({
      name: 'description',
      content:
        'Торговля XRP (Ripple): полное руководство. Технология, судебное дело SEC, фундаментальный анализ, стратегии трейдинга.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
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
      'Article',
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
          '@type': 'Article',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/xrp',
          },
          headline: 'Торговля XRP (Ripple) | Полное руководство',
          description:
            'Торговля XRP (Ripple): полное руководство. Технология, судебное дело SEC, фундаментальный анализ, стратегии трейдинга.',
          image: 'https://arapov.trade/assets/img/content/XRP2.jpg',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-07-04T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          inLanguage: 'ru',
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
      '@id': 'https://arapov.trade/ru#person',
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
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  FAQ
  // ============================================================
  private setFaqSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое XRP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'XRP — криптовалюта для оптимизации международных платежей. Используется финансовыми институтами через технологию RippleNet для быстрых трансграничных переводов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем XRP отличается от Bitcoin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'XRP не майнится, все токены созданы при запуске. Транзакции подтверждаются за 3-5 секунд с минимальными комиссиями. Ориентирован на банки и платёжные системы.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое судебное дело SEC vs Ripple?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'SEC подала иск в 2020 году, утверждая что XRP — незарегистрированная ценная бумага. Исход дела существенно влияет на цену и доступность торговли в США.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое ODL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On-Demand Liquidity — сервис RippleNet, использующий XRP как мостовую валюту для международных переводов без предфинансирования.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где торговать XRP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Крупнейшие биржи: Binance, Kraken, Bitstamp, Upbit. Доступность в США ограничена из-за судебного процесса с SEC.',
          },
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  HOWTO
  // ============================================================
  private setHowToSchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Как торговать XRP',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите регуляторную ситуацию',
          text: 'Следите за развитием судебного дела SEC vs Ripple — это главный фактор волатильности XRP.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Анализируйте фундаментал',
          text: 'Отслеживайте новости о партнёрствах с банками, объёмы ODL, отчёты Ripple Markets.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Выберите биржу',
          text: 'Откройте счёт на бирже с доступом к XRP. Учитывайте географические ограничения.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Определите точку входа',
          text: 'Используйте технический анализ: уровни, объёмы, корреляцию с Bitcoin и альткоинами.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управляйте рисками',
          text: 'Учитывайте повышенную волатильность из-за регуляторной неопределённости. Используйте стоп-лоссы.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  GLOSSARY
  // ============================================================
  private setGlossarySchema(): void {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: 'Глоссарий терминов XRP',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'XRP',
          description:
            'Криптовалюта для оптимизации международных платежей и банковских переводов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RippleNet',
          description:
            'Сеть финансовых институтов, использующих технологию Ripple для трансграничных переводов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'XRP Ledger',
          description:
            'Децентрализованный блокчейн с уникальным механизмом консенсуса для XRP.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'On-Demand Liquidity',
          description:
            'Сервис, использующий XRP как мостовую валюту для международных переводов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Escrow',
          description:
            'Механизм постепенного выпуска токенов XRP для контроля предложения на рынке.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Unique Node List',
          description: 'Список доверенных валидаторов в сети XRP Ledger.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Hooks',
          description:
            'Программируемая логика на уровне протокола XRP, аналог смарт-контрактов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'SEC',
          description:
            'Securities and Exchange Commission — комиссия по ценным бумагам США.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
