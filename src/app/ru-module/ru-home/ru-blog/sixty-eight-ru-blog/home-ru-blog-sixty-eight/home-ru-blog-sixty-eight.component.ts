import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

@Component({
  selector: 'app-home-ru-blog-sixty-eight',
  templateUrl: './home-ru-blog-sixty-eight.component.html',
  styleUrl: './home-ru-blog-sixty-eight.component.scss',
})
export class HomeRuBlogSixtyEightComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
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

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Рыночный аукцион и сентимент: механика ценообразования | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Рыночный аукцион и сентимент — как анализировать баланс спроса и предложения, настроения участников и находить точки входа',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-12' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/marketauctiondevelops.webp',
    });

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
          headline: 'Рыночный аукцион и сентимент: механика ценообразования',
          description:
            'Теория рыночного аукциона: фазы баланса и дисбаланса, анализ сентимента участников, инструменты и практическое применение',
          image:
            'https://arapov.trade/assets/img/content/marketauctiondevelops1.png',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
          name: 'Что такое рыночный аукцион?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рыночный аукцион — это механизм формирования цены через взаимодействие спроса и предложения. Цена движется к уровням, где достигается равновесие между покупателями и продавцами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое баланс и дисбаланс на рынке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Баланс — фаза, когда спрос и предложение равны, цена движется в диапазоне. Дисбаланс — когда одна сторона доминирует, формируется тренд.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как использовать Market Profile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Market Profile показывает распределение объемов по ценам. POC — уровень максимального объема — часто работает как магнит для цены. VAH и VAL определяют границы справедливой стоимости.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что показывает индекс страха и жадности?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fear & Greed Index отражает преобладающие настроения: высокие значения (80+) указывают на жадность и перегрев, низкие (20-) — на страх и возможное дно.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как маркет-мейкеры используют сентимент?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маркет-мейкеры анализируют позиционирование толпы и двигают цену к зонам максимальной ликвидности — стоп-ордерам розничных трейдеров.',
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
      name: 'Как анализировать рыночный аукцион',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите текущую фазу',
          text: 'Баланс (боковик) или дисбаланс (тренд). Это определяет стратегию торговли.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Найдите ключевые уровни',
          text: 'POC, VAH, VAL на Market Profile показывают зоны максимального интереса участников.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцените сентимент',
          text: 'Fear & Greed Index, Put/Call Ratio, соотношение длинных и коротких позиций.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Анализируйте объемы',
          text: 'Рост объемов подтверждает движение. Падение объемов на пробое — сигнал ложного движения.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ищите точки входа',
          text: 'Вход при выходе из баланса или отскоке от POC с подтверждением объемом.',
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
      name: 'Терминология рыночного аукциона',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Рыночный аукцион',
          description:
            'Механизм формирования цены через взаимодействие спроса и предложения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Баланс',
          description:
            'Фаза рынка, когда спрос и предложение равны, цена в диапазоне',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дисбаланс',
          description:
            'Фаза рынка, когда одна сторона доминирует, формируется тренд',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description:
            'Инструмент анализа, показывающий распределение объемов по ценовым уровням',
        },
        {
          '@type': 'DefinedTerm',
          name: 'POC',
          description:
            'Point of Control — уровень с максимальным объемом торгов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VAH',
          description: 'Value Area High — верхняя граница зоны стоимости',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VAL',
          description: 'Value Area Low — нижняя граница зоны стоимости',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сентимент',
          description: 'Совокупное настроение участников рынка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fear & Greed Index',
          description:
            'Индекс, показывающий преобладание страха или жадности на рынке',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Put/Call Ratio',
          description: 'Соотношение опционов на продажу к опционам на покупку',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
