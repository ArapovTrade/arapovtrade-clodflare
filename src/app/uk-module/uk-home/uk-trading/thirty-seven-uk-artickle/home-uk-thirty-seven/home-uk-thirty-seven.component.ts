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
  selector: 'app-home-uk-thirty-seven',
  templateUrl: './home-uk-thirty-seven.component.html',
  styleUrl: './home-uk-thirty-seven.component.scss',
})
export class HomeUkThirtySevenComponent implements OnInit {
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
      'Stop Hunting: як Smart Money вибивають стопи | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Stop Hunting — маніпулятивна стратегія Smart Money для вибивання стоп-лоссів. Дізнайтеся, як розпізнати полювання за стопами та захистити свої позиції на форекс та криптовалютному ринку.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-31' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stophunting.png',
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
          headline: 'Stop Hunting: як Smart Money вибивають стопи трейдерів',
          description:
            'Повний посібник зі Stop Hunting — маніпулятивної стратегії великих гравців для збору ліквідності через вибивання стоп-лоссів роздрібних трейдерів.',
          image: 'https://arapov.trade/assets/img/content/stophunting1.webp',
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
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/stophunting',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'stop hunting',
            'полювання за стопами',
            'smart money',
            'ліквідність',
            'маніпуляції ринком',
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
          name: 'Що таке Stop Hunting у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop Hunting (полювання за стопами) — це маніпулятивна стратегія великих гравців (Smart Money), за якої вони штучно рухають ціну до зон скупчення стоп-лоссів роздрібних трейдерів. Мета — активувати ці ордери, отримати ліквідність і потім розвернути ціну у вигідному напрямку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як Smart Money знаходять стоп-лосси трейдерів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Smart Money використовують об'ємний аналіз, дані стакана ордерів (Order Flow), аналіз ключових рівнів підтримки та опору, а також алгоритмічні системи. Більшість трейдерів розміщують стопи у передбачуваних місцях — за очевидними рівнями та круглими числами.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як захиститися від вибивання стоп-лоссів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Основні методи захисту: не розміщувати стопи за очевидними рівнями, використовувати ширший стоп-лосс з меншим обсягом позиції, аналізувати об'єми при пробоях, уникати торгівлі під час виходу новин та чекати підтвердження перед входом у угоду.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чим хибний пробій відрізняється від справжнього?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Справжній пробій супроводжується значним збільшенням об'єму та закріпленням ціни за рівнем. Хибний пробій відбувається на низькому об'ємі, ціна швидко повертається назад. Аналіз об'ємів та поведінки ціни після пробою допомагає відрізнити маніпуляцію від реального руху.",
          },
        },
        {
          '@type': 'Question',
          name: 'На яких ринках частіше відбувається Stop Hunting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop Hunting зустрічається на всіх ринках, але особливо активно на форекс (через високу ліквідність та децентралізацію) та криптовалютах (через волатильність та слабке регулювання). На фондовому ринку маніпуляції частіше відбуваються перед важливими корпоративними подіями.',
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
      name: 'Як розпізнати та уникнути Stop Hunting',
      description:
        'Покрокова інструкція із захисту від маніпуляцій Smart Money на фінансових ринках',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте зони ліквідності',
          text: 'Знайдіть на графіку очевидні рівні підтримки та опору, круглі числа та локальні екстремуми — саме там більшість трейдерів розміщують стоп-лосси.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: "Аналізуйте об'єм при пробої",
          text: "Використовуйте індикатори об'єму (Volume Profile, OBV, Delta). Якщо пробій рівня відбувається без значного збільшення об'єму — це потенційна пастка Smart Money.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дочекайтесь підтвердження',
          text: 'Не входьте в угоду одразу на пробої. Зачекайте ретест рівня та формування підтверджуючого патерну (пін-бар, поглинання), щоб переконатися в істинності руху.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розмістіть стоп грамотно',
          text: 'Ставте стоп-лосс не прямо за рівнем, а з відступом. Використовуйте ATR для розрахунку оптимальної відстані та зменшіть розмір позиції, щоб компенсувати ширший стоп.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Уникайте торгівлі на новинах',
          text: 'Під час виходу важливих економічних даних волатильність різко зростає, і Smart Money активно вибивають стопи в обидва боки. Краще дочекатися стабілізації ринку.',
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
      name: 'Глосарій термінів Stop Hunting',
      description:
        "Ключові терміни, пов'язані з полюванням за стопами та маніпуляціями Smart Money",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Маніпулятивна стратегія великих гравців для вибивання стоп-лоссів роздрібних трейдерів з метою збору ліквідності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Великі учасники ринку — банки, хедж-фонди, інституційні трейдери, здатні впливати на рух ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Обсяг ордерів на купівлю та продаж у певній ціновій зоні, необхідний для виконання великих позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний рух ціни за ключовий рівень з подальшим швидким поверненням, що використовується для збору стоп-ордерів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            'Аналіз потоку ордерів — метод вивчення реальних угод та заявок для розуміння намірів великих гравців',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер для автоматичного закриття позиції при досягненні певного рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прослизання',
          description:
            'Різниця між очікуваною та фактичною ціною виконання ордера, що виникає при недостатній ліквідності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description:
            'High-Frequency Trading — високочастотний трейдинг з використанням алгоритмів для здійснення тисяч угод за секунду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            "Інструмент аналізу, що показує розподіл торгового об'єму за ціновими рівнями",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Учасник ринку, що забезпечує ліквідність шляхом виставлення котирувань на купівлю та продаж активу',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
