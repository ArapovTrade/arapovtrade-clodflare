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
  selector: 'app-home-uk-blog-sixty',
  templateUrl: './home-uk-blog-sixty.component.html',
  styleUrl: './home-uk-blog-sixty.component.scss',
})
export class HomeUkBlogSixtyComponent implements OnInit {
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
      'Індикатори в трейдингу: види та застосування | Arapov.trade',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Індикатори в трейдингу: трендові, осцилятори та об’ємні. Як вони працюють, що показують і чому індикатор не сигнал сам по собі.',
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
            'Індикатори в трейдингу: які працюють, чому запізнюються і що замість них',
          description:
            'Індикатори в трейдингу: трендові, осцилятори та об’ємні. Як вони працюють, що показують і чому індикатор не сигнал сам по собі.',
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-06-25T00:00:00Z',
          dateModified: '2026-06-25T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/trading-indicators',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/trading-indicators.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технічний аналіз',
          keywords:
            'торгові індикатори, стохастик, MACD, RSI, дивергенція, осцилятор, обʼємний аналіз, ATR, запізнення індикаторів',
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
      '@id': 'https://arapov.trade/#person',
      name: 'Igor Arapov',
      alternateName: [
        'Ігор Арапов',
        'Игорь Арапов',
        'Арапов Игорь',
        'Арапов Ігор',
        'Arapov Igor',
        'I. Arapov',
        'І. В. Арапов',
      ],
      url: 'https://arapov.trade/',
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
          name: 'Чому індикатори в трейдингу запізнюються?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тому що будь-який індикатор рахується з уже закритих свічок, тобто з минулих цін. Він за своєю природою показує те, що ринок уже зробив, а не те, що буде. Запізнення це не дефект налаштування, а властивість самого інструмента, і його стеля це опис минулого.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи працюють сигнали стохастика, MACD і ковзних?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На перших угодах перетини часто здаються робочими, але на дистанції в сотні угод результат у них приблизно як у монетки: стійкого перевісу немає, а спред і комісія повільно підточують депозит. Я не будую на них вхід, а дивлюся на рівень і обсяг.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке дивергенція простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це розбіжність між ціною й індикатором: ціна оновлює екстремум, а індикатор уже ні. Бичача зʼявляється на падінні і натякає на розворот угору, ведмежа дзеркальна. Але це тільки натяк на слабкість імпульсу, а не готова точка входу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому дивергенція на індикаторі часто обманює?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тому що на індикаторі вона запізнюється і в сильному тренді дає серію хибних сигналів: ціна спокійно йде далі і вибиває ранніх покупців. Чесніше дивитися розбіжність ціни й обсягу, а рішення ухвалювати за сильним рівнем і розворотною свічею.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які індикатори реально корисні?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'За моїм досвідом корисні обʼємні індикатори і вимірювачі волатильності на кшталт ATR, бо вони показують причину руху, а не слід ціни. Запізнілі осцилятори як генератор сигналів я у своїй торгівлі не використовую, лишив тільки обсяг.',
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
      '@id': 'https://arapov.trade/uk/freestudying/trading-indicators#howto',
      name: 'Як ставитися до торгових індикаторів',
      description:
        'Покроковий розбір того, як влаштовані індикатори, чому вони запізнюються і що використовувати замість їхніх сигналів',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, що індикатор рахується з минулих цін і запізнюється',
          text: 'Торговий індикатор це формула, яка бере минулі ціни й обсяги за вибраний період і перетворює їх на лінію, гістограму або цифру на графіку.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Перевірте сигнали стохастика, MACD і ковзних на дистанції',
          text: 'Візьмемо три найходовіші інструменти, через які проходить майже кожен новачок.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розберіться, що таке дивергенція і що вона показує',
          text: 'Дивергенція це розбіжність між рухом ціни і показаннями індикатора, коли ціна оновлює максимум або мінімум, а індикатор цей екстремум уже не підтверджує.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Не торгуйте дивергенцію наосліп, чекайте рівень і обсяг',
          text: 'Дивергенція показує тільки слабкість поточного руху, а не точку входу, і в цьому її тонке місце.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Спирайтеся на обсяг і волатильність, а не на сигнали осциляторів',
          text: 'То що ж з усього цього зоопарку я лишив?',
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
      name: 'Глосарій термінів статті',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Торговий індикатор',
          description:
            'Формула, яка бере минулі ціни й обсяги за вибраний період і перетворює їх на лінію, гістограму або цифру на графіку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Осцилятор',
          description:
            'Тип індикатора, який міряє не саму ціну, а швидкість її зміни, і шукає крайні стани перекупленості та перепроданості.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенція',
          description:
            'Розбіжність між рухом ціни і показаннями індикатора, коли ціна оновлює екстремум, а індикатор його вже не підтверджує.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
