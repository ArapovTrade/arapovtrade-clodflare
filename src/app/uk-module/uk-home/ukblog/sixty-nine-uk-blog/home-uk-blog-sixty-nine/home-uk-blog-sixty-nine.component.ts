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
  selector: 'app-home-uk-blog-sixty-nine',
  templateUrl: './home-uk-blog-sixty-nine.component.html',
  styleUrl: './home-uk-blog-sixty-nine.component.scss',
})
export class HomeUkBlogSixtyNineComponent {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Аналіз обсягів: акції vs ф`ючерси — ключові відмінності | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Аналіз обсягів на фондовому та ф`ючерсному ринках — відмінності в даних, методах інтерпретації та практичному застосуванні',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-13' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/volumeandfuturesmarket.webp',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги з трейдингу', link: 'https://arapov.trade/uk/books' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
    },
     
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/uk/freestudying'], {
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
      article.groupsUkr.forEach((group) => {
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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
          headline: "Аналіз обсягів: акції vs ф'ючерси",
          description:
            "Порівняння об'ємного аналізу на фондовому та ф'ючерсному ринках: дані, методи та стратегії",
          image:
            'https://arapov.trade/assets/img/content/volumeandfuturesmarket1.png',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
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
      '@id': 'https://arapov.trade/uk#person',
      name: 'Ігор Арапов',
      alternateName: [
        'Igor Arapov',
              'Арапов Игорь',
              'I. Arapov',
              'Игорь Арапов',
              'І. В. Арапов',
              'Арапов Ігор',
              'Arapov Igor',
      ],
      url: 'https://arapov.trade/uk',
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
       jobTitle: ['Незалежний дослідник', 'трейдер', 'автор і засновник arapov.trade'],
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',
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
          name: "Чим відрізняється обсяг на фондовому ринку від ф'ючерсного?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "На фондовому ринку частина угод проходить через темні пули і невидима. На ф'ючерсному всі угоди централізовані, плюс доступний Open Interest.",
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке Open Interest?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Open Interest — кількість відкритих ф'ючерсних контрактів. Зростання OI при зростанні ціни підтверджує тренд.",
          },
        },
        {
          '@type': 'Question',
          name: "Чому на акціях об'ємний аналіз менш точний?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Значна частина обсягу проходить через Dark Pools. HFT-алгоритми створюють шум. Акції торгуються на кількох біржах.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які інструменти потрібні для аналізу обсягів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volume Profile, Footprint Charts, Delta Volume та DOM — основний набір для аналізу ліквідності.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як обсяг допомагає фільтрувати хибні пробої?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Справжній пробій супроводжується сплеском обсягу. Хибний відбувається на низькому обсязі.',
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
      name: 'Як аналізувати обсяги на різних ринках',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте тип ринку',
          text: "Фондовий чи ф'ючерсний ринок мають різну структуру даних.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Вивчіть доступні дані',
          text: "На акціях: Trade Volume, VWAP. На ф'ючерсах: Volume, Open Interest, Delta.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Визначте зони ліквідності',
          text: 'Volume Profile показує рівні з максимальним обсягом торгів.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Аналізуйте баланс сил',
          text: 'Delta Volume показує домінування покупців чи продавців.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Підтверджуйте сигнали обсягом',
          text: 'Пробій або розворот повинен супроводжуватися зміною обсягу.',
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
      name: "Терміни об'ємного аналізу",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description: 'Горизонтальний розподіл обсягів за ціновими рівнями',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Open Interest',
          description: "Кількість відкритих ф'ючерсних контрактів",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description: 'Різниця між обсягом покупок та продажів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Chart',
          description: 'Графік розподілу обсягів всередині кожної свічки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'POC',
          description:
            'Point of Control — ціновий рівень з максимальним обсягом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Dark Pool',
          description: 'Позабіржова площадка для великих угод',
        },
        {
          '@type': 'DefinedTerm',
          name: 'DOM',
          description: 'Depth of Market — біржовий стакан',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VWAP',
          description: 'Середньозважена за обсягом ціна',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tick Volume',
          description: 'Кількість змін ціни за період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cumulative Delta',
          description: 'Накопичена дельта обсягів',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
