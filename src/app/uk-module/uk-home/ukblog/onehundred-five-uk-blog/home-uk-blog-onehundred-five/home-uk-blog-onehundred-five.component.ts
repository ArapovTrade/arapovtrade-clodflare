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
  selector: 'app-home-uk-blog-onehundred-five',
  templateUrl: './home-uk-blog-onehundred-five.component.html',
  styleUrl: './home-uk-blog-onehundred-five.component.scss',
})
export class HomeUkBlogOnehundredFiveComponent implements OnInit {
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

    this.titleService.setTitle(
      'Торгівля XRP | Аналіз ринку Ripple та стратегії'
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Торгівля XRP: аналіз ринку Ripple, технічні стратегії, фундаментальні фактори та управління ризиками для трейдерів криптовалют.',
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
          headline: 'Торгівля XRP: Аналіз ринку Ripple та практичні стратегії',
          description:
            'Посібник з торгівлі XRP: технологія RippleNet, вплив судового процесу SEC, технічний аналіз',
          image: 'https://arapov.trade/assets/img/content/XRP2.jpg',
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
          datePublished: '2025-07-04T00:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/xrp',
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
          name: 'Чим XRP відрізняється від інших криптовалют?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'XRP створений для банківських міжнародних платежів. Транзакції за 3-5 секунд з мінімальними комісіями. Всі 100 мільярдів токенів створені при запуску мережі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як судовий процес SEC впливає на ціну XRP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Справа SEC — головний драйвер волатильності. Судові рішення можуть рухати ціну на 20-50% за дні. Трейдери повинні відстежувати розвиток справи.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке On-Demand Liquidity?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'ODL використовує XRP як проміжну валюту для миттєвих міжнародних переказів. Банки відправляють платежі без попереднього фінансування в іноземних валютах.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких біржах торгується XRP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні біржі: Binance, Kraken, Bitstamp. В США доступність обмежена через регуляторні питання. Деякі брокери пропонують CFD на XRP.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яке плече безпечне для торгівлі XRP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рекомендується консервативне плече 2-3x максимум. Денні рухи 10-20% звичайні, новинні події можуть спричинити 30-50% зміни.',
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
      name: 'Як ефективно торгувати XRP',
      description: 'Покрокова методологія торгівлі криптовалютою XRP',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Моніторте регуляторні новини',
          text: 'Відстежуйте оновлення справи SEC. Налаштуйте сповіщення про ключові події.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте ключові рівні',
          text: "Позначте підтримку та опір на денних графіках. Рівні $0.50, $1.00, $1.50 — психологічні бар'єри.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Аналізуйте on-chain дані',
          text: 'Відстежуйте транзакції китів та притоки на біржі. Великі переводи часто передують продажам.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Контролюйте ризики',
          text: 'Максимум 2% ризику на угоду. Встановлюйте стопи з урахуванням волатильності.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Дотримуйтесь дисципліни',
          text: 'Входьте під час консолідації. Фіксуйте прибуток на рівнях опору.',
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
      name: 'Глосарій термінів XRP',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'XRP Ledger',
          description:
            'Децентралізована блокчейн-мережа для обробки транзакцій XRP.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'RippleNet',
          description: 'Мережа фінансових установ для міжнародних платежів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'On-Demand Liquidity',
          description: 'Сервіс миттєвих розрахунків з використанням XRP.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ескроу',
          description: 'Механізм блокування токенів з поступовим вивільненням.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Консенсус',
          description:
            'Метод валідації транзакцій через довірених валідаторів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проміжна валюта',
          description: 'Актив-посередник для обміну між валютами.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кити',
          description: 'Великі власники криптовалюти з впливом на ринок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Регуляторний ризик',
          description: 'Невизначеність від можливих дій регуляторів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність швидко купити або продати без впливу на ціну.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інституційне прийняття',
          description: 'Впровадження криптотехнологій банками.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
