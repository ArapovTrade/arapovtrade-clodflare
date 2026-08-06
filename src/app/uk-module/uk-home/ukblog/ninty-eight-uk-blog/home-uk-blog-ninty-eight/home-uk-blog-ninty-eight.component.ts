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
  selector: 'app-home-uk-blog-ninty-eight',
  templateUrl: './home-uk-blog-ninty-eight.component.html',
  styleUrl: './home-uk-blog-ninty-eight.component.scss',
})
export class HomeUkBlogNintyEightComponent implements OnInit {
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

    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle('Стохастичний осцилятор | Посібник з торгівлі');
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-06-04' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Стохастичний осцилятор: налаштування індикатора, сигнали перекупленості/перепроданості, дивергенція та практичні стратегії.',
    });

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
          headline: 'Стохастичний осцилятор: Повний посібник',
          description:
            'Стохастичний осцилятор: налаштування індикатора, сигнали перекупленості/перепроданості, дивергенція та практичні стратегії.',
          image: 'https://arapov.trade/assets/img/content/stochastic1.jpg',
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
          datePublished: '2025-06-13T00:00:00+02:00',
         dateModified: '2026-06-04T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/stochastic',
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
          name: 'Що таке Стохастичний осцилятор?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stochastic вимірює позицію ціни відносно діапазону високих-низьких за період. Значення 0-100 вказують на імпульс та потенційні розвороти.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке перекупленість та перепроданість?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Вище 80 — перекупленість, нижче 20 — перепроданість. Передбачають потенційні розвороти, але тренди можуть утримувати екстремуми.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке дивергенція Stochastic?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Дивергенція виникає, коли ціна робить новий хай/лоу, але Stochastic не підтверджує, сигналізуючи потенційний розворот.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які налаштування найкращі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стандартні 14,3,3 працюють на більшості таймфреймів. Коротші 5,3,3 для денної торгівлі. Довші 21,5,5 для свінгу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як уникнути хибних сигналів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Використовуйте трендові фільтри. Беріть перепроданість у висхідних трендах, перекупленість у низхідних. Комбінуйте з підтримкою/опором.',
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
      name: 'Як торгувати зі Stochastic',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте тренд',
          text: 'Використовуйте ковзні середні для визначення напрямку.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Стежте за екстремумами',
          text: 'Моніторте перекупленість/перепроданість у напрямку тренду.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Підтвердіть перетин',
          text: 'Чекайте перетину %K та %D для тайминга.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Перевірте дивергенцію',
          text: 'Шукайте дивергенцію для сигналів розвороту.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Встановіть стопи',
          text: 'Розміщуйте стопи за недавніми свінгами.',
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
      name: 'Термінологія Stochastic',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стохастичний осцилятор',
          description: 'Індикатор імпульсу, що порівнює закриття з діапазоном.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лінія %K',
          description: 'Швидка лінія стохастика.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лінія %D',
          description: 'Сигнальна лінія — MA від %K.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перекупленість',
          description: 'Вище 80, потенційний розворот.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перепроданість',
          description: 'Нижче 20, потенційний відскок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенція',
          description: 'Розходження ціни та індикатора.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Перетин',
          description: 'Сигнал перетину %K та %D.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Швидкий Stochastic',
          description: 'Незгладжена версія.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Повільний Stochastic',
          description: 'Згладжена версія.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Імпульс',
          description: 'Швидкість зміни ціни.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
