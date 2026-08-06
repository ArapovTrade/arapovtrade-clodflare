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
  selector: 'app-home-uk-thirty-nine',
  templateUrl: './home-uk-thirty-nine.component.html',
  styleUrl: './home-uk-thirty-nine.component.scss',
})
export class HomeUkThirtyNineComponent implements OnInit {
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
      'Співвідношення прибутку та збитку у трейдингу: розрахунок та застосування R/R | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Співвідношення прибутку та збитку (Risk/Reward Ratio) у трейдингу: як розрахувати, оптимізувати та застосовувати для стабільного заробітку на фінансових ринках.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/profitandlossratio.webp',
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
            'Співвідношення прибутку та збитку у трейдингу: розрахунок та застосування R/R',
          description:
            'Співвідношення прибутку та збитку (Risk/Reward Ratio) у трейдингу: як розрахувати, оптимізувати та застосовувати для стабільного заробітку на фінансових ринках.',
          image:
            'https://arapov.trade/assets/img/content/profitandlossratio1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
            url: 'https://arapov.trade',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/profitandlossratio',
          },
          articleSection: 'Навчання трейдингу',
          keywords: [
            'співвідношення прибутку та збитку',
            'Risk Reward Ratio',
            'управління ризиками',
            'трейдинг',
            'R/R',
          ],
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
          name: 'Що таке співвідношення прибутку та збитку (R/R Ratio)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'R/R Ratio (Risk/Reward Ratio) — це метрика, що показує відношення потенційного прибутку до потенційного збитку в угоді. Наприклад, R/R 1:3 означає, що на кожну гривню ризику трейдер розраховує отримати три гривні прибутку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яке співвідношення R/R вважається оптимальним?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мінімально рекомендоване співвідношення — 1:2, за якого потенційний прибуток вдвічі перевищує ризик. Досвідчені трейдери часто орієнтуються на 1:3 і вище, що дозволяє залишатися в плюсі навіть при низькому відсотку прибуткових угод.',
          },
        },
        {
          '@type': 'Question',
          name: "Як R/R Ratio пов'язаний з відсотком прибуткових угод?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Високий R/R компенсує низький відсоток прибуткових угод. При співвідношенні 1:3 достатньо вигравати 30% угод для виходу в плюс, тоді як при R/R 1:1 потрібно понад 50% успішних операцій.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як правильно розрахувати R/R перед входом в угоду?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Визначте точку входу, рівень стоп-лосу та тейк-профіту. Поділіть відстань до тейк-профіту на відстань до стоп-лосу. Врахуйте спред та комісії для отримання реального значення R/R.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які помилки найчастіше допускають при роботі з R/R?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні помилки: занадто вузькі стоп-лоси, ігнорування спреду та комісій, зміна плану угоди під впливом емоцій, встановлення нереалістичних цілей по прибутку без урахування волатильності.',
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
      name: 'Як застосовувати співвідношення прибутку та збитку в торгівлі',
      description:
        'Покроковий посібник з розрахунку та застосування R/R Ratio для підвищення ефективності торгівлі.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте точку входу',
          text: 'Проаналізуйте ринок та знайдіть оптимальну точку входу на основі технічного або фундаментального аналізу. Точний вхід підвищує підсумкове співвідношення R/R.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Встановіть стоп-лос',
          text: 'Розмістіть стоп-лос за ключовим рівнем підтримки або опору. Використовуйте ATR для визначення оптимальної відстані з урахуванням поточної волатильності.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Визначте тейк-профіт',
          text: 'Встановіть ціль по прибутку на основі найближчих рівнів опору або підтримки. Переконайтеся, що відстань до тейк-профіту мінімум вдвічі перевищує відстань до стоп-лосу.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розрахуйте реальний R/R',
          text: 'Врахуйте спред та комісії брокера. Реальне співвідношення має залишатися не нижче 1:2 після врахування всіх витрат на торгівлю.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Дотримуйтесь плану',
          text: 'Не змінюйте рівні стоп-лосу та тейк-профіту після входу в угоду. Дисципліна — ключовий фактор успішного застосування R/R Ratio.',
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
      name: 'Глосарій термінів Risk/Reward',
      description:
        'Ключові терміни та визначення у галузі управління співвідношенням прибутку та збитку',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward Ratio',
          description:
            'Співвідношення потенційного прибутку до потенційного збитку в торговій угоді',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Захисний ордер для автоматичного закриття позиції при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профіт',
          description:
            'Ордер для автоматичної фіксації прибутку при досягненні ціною заданого цільового рівня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Win Rate',
          description:
            'Відсоток прибуткових угод від загальної кількості здійснених торгових операцій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — індикатор середнього істинного діапазону для вимірювання волатильності активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просідання',
          description:
            'Зниження торгового капіталу від максимального значення до мінімуму за певний період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мані-менеджмент',
          description:
            'Система управління капіталом для контролю ризиків та оптимізації розміру торгових позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлінг-стоп',
          description:
            'Динамічний стоп-лос, що автоматично слідує за ціною для захисту накопиченого прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між ціною купівлі та продажу активу, що становить частину торгових витрат',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Ступінь мінливості ціни активу за певний часовий період',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
