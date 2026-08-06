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
  selector: 'app-home-uk-thirty',
  templateUrl: './home-uk-thirty.component.html',
  styleUrl: './home-uk-thirty.component.scss',
})
export class HomeUkThirtyComponent implements OnInit {
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
      'Imbalance та FVG: зони ліквідності у трейдингу | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Imbalance та FVG у трейдингу: повний посібник із зон ліквідності. Дізнайтеся, як знаходити дисбаланси та Fair Value Gaps для точних входів у ринок.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-30' });  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/imbalanceandfvg.png',
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
          '@id': 'https://arapov.trade/uk/freestudying/imbalanceandfvg#article',
          headline: 'Imbalance та FVG: зони ліквідності у трейдингу',
          description:
            'Повний посібник з концепцій Imbalance та Fair Value Gap. Дізнайтеся, як знаходити дисбаланси та використовувати їх для точних входів у ринок.',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/imbalanceandfvg1.png',
            width: 1200,
            height: 630,
          },
          author: { '@id': 'https://arapov.trade/uk#person' },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
            url: 'https://arapov.trade',
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/imbalanceandfvg',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'Imbalance',
            'FVG',
            'Fair Value Gap',
            'дисбаланс',
            'ліквідність',
          ],
          wordCount: 1380,
          inLanguage: 'uk',
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
      '@id': 'https://arapov.trade/uk/freestudying/imbalanceandfvg#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що означає Imbalance у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Imbalance (дисбаланс) — це стан ринку, коли попит та пропозиція різко розходяться, викликаючи стрімкий рух ціни в одному напрямку без значного опору. Такі зони вказують на активність великих гравців.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке Fair Value Gap (FVG)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fair Value Gap — це ціновий розрив між свічками на графіку, що виникає при швидкому русі ціни. FVG представляє зону, де ринок не встиг сформувати збалансовану ліквідність.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити бичачий та ведмежий FVG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Бичачий FVG формується між мінімумом першої свічки та максимумом третьої при висхідному імпульсі. Ведмежий FVG утворюється між максимумом першої свічки та мінімумом третьої при низхідному русі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому ціна повертається до зон FVG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ринок прагне до рівноваги. Незаповнені зони ліквідності діють як магніт для ціни. Smart Money використовують ці розриви для розміщення ордерів.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких таймфреймах краще шукати FVG?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найбільш значущі FVG формуються на старших таймфреймах: H4, D1, W1. Розриви на денному графіку мають більшу вагу та частіше відпрацьовуються.',
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
      '@id': 'https://arapov.trade/uk/freestudying/imbalanceandfvg#howto',
      name: 'Як торгувати за зонами Imbalance та FVG',
      description:
        'Покрокове керівництво з використання дисбалансів та Fair Value Gaps у торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Знайдіть зону дисбалансу',
          text: 'Визначте на графіку області з імпульсними свічками, де ціна різко рухалась без відкатів.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцініть значущість зони',
          text: 'Перевірте, чи збігається FVG з ключовими рівнями підтримки або опору.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дочекайтеся повернення ціни',
          text: 'Очікуйте ретесту зони FVG та появи підтверджуючого сигналу.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Відкрийте позицію',
          text: 'При підтвердженні входьте у напрямку початкового імпульсу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Керуйте угодою',
          text: 'Встановіть тейк-профіт на наступному рівні ліквідності.',
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
      '@id': 'https://arapov.trade/uk/freestudying/imbalanceandfvg#terms',
      name: 'Терміни Imbalance та FVG',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Imbalance',
          description:
            'Дисбаланс між попитом та пропозицією, що викликає різкий односпрямований рух ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Ціновий розрив між свічками, що вказує на зону незаповненої ліквідності.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бичачий FVG',
          description: 'Розрив справедливої вартості при висхідному імпульсі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ведмежий FVG',
          description: 'Розрив справедливої вартості при низхідному русі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Обсяг доступних ордерів на купівлю та продаж на певних цінових рівнях.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Повернення ціни до раніше пройденого рівня для тестування.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Великі інституційні учасники ринку: банки, хедж-фонди, маркет-мейкери.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            "Інструмент аналізу розподілу об'єму торгів за ціновими рівнями.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Імпульсна свічка',
          description:
            'Свічка з великим тілом, що вказує на сильний спрямований рух.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Заповнення гепу',
          description:
            'Повернення ціни в зону цінового розриву для відновлення рівноваги.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
