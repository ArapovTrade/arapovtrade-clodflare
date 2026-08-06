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
  selector: 'app-home-uk-twenty-nine',
  templateUrl: './home-uk-twenty-nine.component.html',
  styleUrl: './home-uk-twenty-nine.component.scss',
})
export class HomeUkTwentyNineComponent implements OnInit {
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
      'Чому трейдери втрачають гроші | Пастки Smart Money | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Чому 90% трейдерів втрачають гроші: пастки Smart Money, маніпуляції великих гравців, полювання за стоп-лоссами та методи захисту капіталу.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-04' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });

    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneytraps.webp',
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
          '@id': 'https://arapov.trade/uk/freestudying/smartmoneytraps#article',
          headline: 'Чому трейдери втрачають гроші: пастки Smart Money',
          description:
            'Аналіз причин збитків роздрібних трейдерів: маніпуляції великих гравців, полювання за стоп-лоссами, хибні пробої та методи захисту від пасток',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartmoneytraps1.webp',
            width: 1200,
            height: 630,
          },
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/smartmoneytraps',
          },
          wordCount: 1356,
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
          name: 'Чому 90% трейдерів втрачають гроші?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основна причина — нерозуміння дій інституційних гравців. Великі учасники використовують маніпуляції ліквідністю, полювання за стоп-лоссами та хибні пробої для отримання капіталу роздрібних трейдерів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке полювання за стоп-лоссами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop Hunting — стратегія великих гравців з руху ціни до зон скупчення стоп-ордерів роздрібних трейдерів. Після активації стопів ринок розвертається у протилежному напрямку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розпізнати хибний пробій?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Хибний пробій характеризується виходом ціни за ключовий рівень з наступним швидким поверненням. Ознаки: відсутність об'ємного підтвердження, різкий розворот після пробою.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як захиститися від маніпуляцій Smart Money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Аналізуйте об'єми перед входом в угоду, розміщуйте стоп-лоси у менш очевидних місцях, чекайте підтвердження пробоїв та обмежуйте ризик до 1-2% на угоду.",
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке фази накопичення та розподілу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Накопичення — фаза прихованого набору позицій великими гравцями перед зростанням. Розподіл — фаза виходу з позицій перед падінням. Ці фази маскуються під флетовий рух.',
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
      name: 'Як уникнути пасток Smart Money',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: "Аналіз об'ємів",
          text: "Перевіряйте об'ємне підтвердження перед входом в угоду.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Очікування ретесту',
          text: 'Не входьте в угоду одразу на пробої. Дочекайтеся повернення ціни до рівня.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розміщення стоп-лосів',
          text: 'Ставте захисні ордери за ключовими рівнями ліквідності.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Аналіз ліквідності',
          text: 'Вивчайте стакан заявок для розуміння намірів великих гравців.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Контроль ризиків',
          text: 'Обмежуйте ризик на угоду до 1-2% депозиту.',
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
      name: 'Глосарій термінів маніпуляцій ринку',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Великі інституційні учасники ринку — банки, хедж-фонди, маркет-мейкери',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Полювання за стоп-лоссами — стратегія руху ціни до зон скупчення захисних ордерів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Вихід ціни за ключовий рівень з наступним швидким поверненням у діапазон',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Накопичення',
          description:
            'Фаза прихованого набору позицій великими гравцями перед висхідним трендом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Розподіл',
          description:
            'Фаза виходу великих гравців з позицій перед низхідним трендом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description: 'Скупчення ордерів на певних цінових рівнях',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Учасник ринку, що забезпечує ліквідність та впливає на спреди',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description:
            'High-Frequency Trading — високочастотна торгівля з використанням алгоритмів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            'Потік ордерів — аналіз реальних угод для розуміння намірів учасників',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маніпуляція ліквідністю',
          description:
            'Створення штучної активності для направлення ціни у потрібний бік',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
