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
  selector: 'app-home-uk-twenty',
  templateUrl: './home-uk-twenty.component.html',
  styleUrl: './home-uk-twenty.component.scss',
})
export class HomeUkTwentyComponent implements OnInit {
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
      'Market Profile: аналіз попиту та пропозиції за методом Стейдлмаєра | ArapovTrade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Опануйте Market Profile — метод аналізу ринку Пітера Стейдлмаєра. POC, Value Area, зони ліквідності та практичні стратегії для трейдингу.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-27' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/steidlmayeranalysis.png',
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
          headline:
            'Market Profile: аналіз попиту та пропозиції за методом Стейдлмаєра',
          description:
            'Опануйте Market Profile — метод аналізу ринку Пітера Стейдлмаєра. POC, Value Area, зони ліквідності та практичні стратегії.',
          image:
            'https://arapov.trade/assets/img/content/steidlmayeranalysis2.png',
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          author: { '@id': 'https://arapov.trade/uk#person' },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
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
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Незалежний дослідник',
        'трейдер',
        'автор і засновник arapov.trade',
      ],
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
          name: 'Що таке Market Profile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Market Profile — це метод аналізу ринку, розроблений Пітером Стейдлмаєром, який візуалізує розподіл обсягів по цінових рівнях та допомагає визначити справедливу вартість активу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке Point of Control (POC)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'POC — це ціновий рівень з максимальним обсягом торгів за період. Він вказує на зону найбільшої згоди між покупцями та продавцями.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що означає Value Area?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Value Area — це діапазон цін, що охоплює приблизно 70% всього обсягу торгів за сесію. Ця зона показує, де учасники ринку вважають ціну справедливою.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняються HVN та LVN?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'HVN — зони з високою концентрацією обсягу, де ціна схильна до консолідації. LVN — ділянки з низьким обсягом, через які ціна проходить швидко.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких ринках застосовується Market Profile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Market Profile універсальний і застосовується на ф'ючерсних, фондових, валютних та криптовалютних ринках з достатнім обсягом торгів.",
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
      name: 'Як аналізувати ринок за допомогою Market Profile',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте POC та Value Area',
          text: 'Знайдіть рівень максимального обсягу та межі Value Area.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Ідентифікуйте HVN та LVN',
          text: 'Відмітьте зони високого та низького обсягу.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцініть положення ціни',
          text: 'Визначте, де знаходиться ціна відносно VA.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Відстежуйте зміщення POC',
          text: 'Рух POC вказує на зміну настроїв ринку.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Комбінуйте з іншими методами',
          text: 'Використовуйте разом з Delta Volume та свічковими патернами.',
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
      name: 'Глосарій Market Profile',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description:
            'Метод аналізу ринку, що візуалізує розподіл обсягів по цінових рівнях.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Point of Control',
          description: 'Ціновий рівень з максимальним обсягом торгів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area',
          description: 'Діапазон цін, що охоплює 70% обсягу торгів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area High',
          description: 'Верхня межа зони справедливої вартості.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area Low',
          description: 'Нижня межа зони справедливої вартості.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'High Volume Node',
          description: 'Зона з високою концентрацією торгового обсягу.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Low Volume Node',
          description: 'Зона з низьким обсягом торгів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Initial Balance',
          description: 'Ціновий діапазон першої години торгової сесії.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TPO',
          description:
            'Time Price Opportunity — одиниця виміру часу на ціновому рівні.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пітер Стейдлмаєр',
          description:
            'Трейдер, що розробив концепцію Market Profile у 1980-х роках.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
