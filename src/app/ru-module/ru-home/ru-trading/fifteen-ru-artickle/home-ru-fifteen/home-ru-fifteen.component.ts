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
  selector: 'app-home-ru-fifteen',
  templateUrl: './home-ru-fifteen.component.html',
  styleUrl: './home-ru-fifteen.component.scss',
})
export class HomeRuFifteenComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Центральные банки: функции и влияние на финансовые рынки | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Центральные банки мира: ФРС, ЕЦБ, Банк Англии, Банк Японии. Функции, инструменты монетарной политики и влияние на рынок FOREX.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-13' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/majorBankFrs_JQ.webp',
    });
    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
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
      article.groupsRus.forEach((group) => {
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
          headline: 'Центральные банки: функции и влияние на финансовые рынки',
          description:
            'Центральные банки мира: ФРС, ЕЦБ, Банк Англии, Банк Японии. Функции и влияние на рынок FOREX.',
          image: 'https://arapov.trade/assets/img/content/majorBankFrs_JQ.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/majorbankfrs',
          },
          articleSection: 'Обучение трейдингу',
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      alternateName: [
        'Igor Arapov',
        'Арапов Игорь',
        'I. Arapov',
        'Ігор Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
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
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
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
          name: 'Что такое центральный банк?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Центральный банк — государственная финансовая организация, ответственная за денежно-кредитную политику, регулирование денежной массы и поддержание экономической стабильности.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие основные функции выполняют центральные банки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные функции: управление процентными ставками, эмиссия национальной валюты, надзор за банковским сектором, кредитор последней инстанции в кризисные времена.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как решения центральных банков влияют на FOREX?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Решения о процентных ставках влияют на привлекательность валюты для инвесторов. Повышение ставок укрепляет валюту, снижение — ослабляет.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие центральные банки наиболее влиятельны?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Наиболее влиятельны: Федеральная резервная система США (ФРС), Европейский центральный банк (ЕЦБ), Банк Англии, Банк Японии и Швейцарский национальный банк.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое количественное смягчение?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Количественное смягчение (QE) — программа выкупа активов центральным банком для увеличения денежной массы и стимулирования экономики.',
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
      name: 'Как отслеживать решения центральных банков',
      description:
        'Практическое руководство для трейдеров по мониторингу монетарной политики.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Используйте экономический календарь',
          text: 'Отслеживайте даты заседаний FOMC, ЕЦБ, Банка Англии и других центральных банков через экономические календари.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Анализируйте риторику',
          text: 'Слушайте пресс-конференции глав банков, обращая внимание на ястребиные или голубиные сигналы.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Следите за макроданными',
          text: 'Отслеживайте публикации по инфляции, ВВП, занятости — они определяют решения банков.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Читайте протоколы заседаний',
          text: 'Протоколы содержат детали дискуссий и намёки на будущую политику.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управляйте рисками',
          text: 'Перед объявлениями сокращайте позиции или используйте стоп-лоссы для защиты от волатильности.',
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
      name: 'Глоссарий центральных банков',
      description: 'Ключевые термины монетарной политики',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Центральный банк',
          description:
            'Государственная организация, управляющая денежно-кредитной политикой',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Процентная ставка',
          description:
            'Базовая ставка, определяющая стоимость заимствований в экономике',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Количественное смягчение',
          description: 'Программа выкупа активов для увеличения денежной массы',
        },
        {
          '@type': 'DefinedTerm',
          name: 'FOMC',
          description: 'Федеральный комитет по операциям на открытом рынке ФРС',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Валютная интервенция',
          description:
            'Покупка или продажа валюты центральным банком для влияния на курс',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Инфляция',
          description: 'Рост общего уровня цен в экономике',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Монетарная политика',
          description:
            'Совокупность мер центрального банка по регулированию денежного обращения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ястребиная политика',
          description:
            'Направленность на ужесточение условий и повышение ставок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Голубиная политика',
          description: 'Направленность на смягчение условий и снижение ставок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Carry trade',
          description:
            'Стратегия заимствования в низкодоходной валюте для инвестиций в высокодоходную',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
