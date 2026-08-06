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
  selector: 'app-home-uk-blog-onehundred-three',
  templateUrl: './home-uk-blog-onehundred-three.component.html',
  styleUrl: './home-uk-blog-onehundred-three.component.scss',
})
export class HomeUkBlogOnehundredThreeComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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

    this.titleService.setTitle('Індикатор Ішимоку | Повний посібник з хмари');
    this.meta.updateTag({
      name: 'description',
      content:
        'Індикатор Ішимоку: аналіз хмари Кумо, визначення тренду, торгові сигнали та практичні стратегії технічного аналізу.',
    });
 this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

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
        () => Math.random() - 0.5
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      (a) => a.linkUkr == path
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
      (a) => a.linkUkr == path
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
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
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
          headline: 'Індикатор Ішимоку | Повний посібник з хмари',
          description:
            'Індикатор Ішимоку: аналіз хмари Кумо, визначення тренду, торгові сигнали та практичні стратегії технічного аналізу.',
          image: 'https://arapov.trade/assets/img/content/ichimoku1.png',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Pair Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-06-28T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/ichimoku',
          },
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
          name: 'Що таке індикатор Ішимоку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ichimoku Kinko Hyo — комплексний індикатор, що показує напрямок тренду, імпульс та рівні підтримки/опору одним поглядом. Розроблений японським журналістом Гоічі Хосода.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке хмара Кумо?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Кумо — заштрихована область між лініями Senkou Span A та B. Виступає динамічною зоною підтримки/опору. Товста хмара вказує на сильну зону.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити тренд за Ішимоку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ціна вище хмари — висхідний тренд. Нижче — низхідний. Всередині хмари — консолідація.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке сигнал TK Cross?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'TK Cross виникає при перетині Tenkan Sen та Kijun Sen. Бичачий — коли Tenkan перетинає Kijun знизу вгору.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які стандартні налаштування Ішимоку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стандартні параметри 9, 26, 52. Для криптовалют використовують 10, 30, 60.',
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
      name: 'Як торгувати з індикатором Ішимоку',
      description: 'Покрокова методологія торгівлі за Ichimoku',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте напрямок тренду',
          text: 'Встановіть позицію ціни відносно хмари.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оцініть хмару',
          text: 'Проаналізуйте товщину та колір хмари.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Відстежуйте TK Cross',
          text: 'Моніторте перетини Tenkan-Kijun.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підтвердіть Chikou',
          text: 'Перевірте імпульс через Chikou Span.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Виконуйте угоди',
          text: 'Входьте на межах хмари зі стопами.',
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
      name: 'Термінологія Ішимоку',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ichimoku Kinko Hyo',
          description: 'Графік рівноваги одним поглядом.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Kumo',
          description: 'Хмара між Senkou Span A та B.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tenkan Sen',
          description: 'Швидка лінія з 9-періодної середньої.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Kijun Sen',
          description: 'Базова лінія з 26-періодної середньої.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Senkou Span A',
          description: 'Середнє Tenkan та Kijun вперед.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Senkou Span B',
          description: '52-періодна середня вперед.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Chikou Span',
          description: 'Поточне закриття назад.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'TK Cross',
          description: 'Перетин Tenkan та Kijun.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Kumo Twist',
          description: 'Перетин Span A та B.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Kumo Breakout',
          description: 'Прохід через межі хмари.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
