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
  selector: 'app-home-ru-blog-fifty-six',
  templateUrl: './home-ru-blog-fifty-six.component.html',
  styleUrl: './home-ru-blog-fifty-six.component.scss',
})
export class HomeRuBlogFiftySixComponent implements OnInit {
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
    this.titleService.setTitle('Стратегия пробоя уровня | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Как торговать пробой уровня: определение ключевых зон, подтверждение объёмом, ложные пробои и где ставить стоп. Стратегия для новичков и профи.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });

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
          headline:
            'Пробой уровня в трейдинге: как отличить истинный от ложного и где входить',
          description:
            'Как торговать пробой уровня: определение ключевых зон, подтверждение объёмом, ложные пробои и где ставить стоп. Стратегия для новичков и профи.',
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
            '@id': 'https://arapov.trade/ru/freestudying/breakout-strategy',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/breakout-strategy.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords:
            'пробой уровня, ложный пробой, ложный накол, ретест, объём, поддержка и сопротивление, стоп-лосс',
          inLanguage: 'ru',
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
          name: 'Что такое пробой уровня простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это момент, когда цена проходит сквозь зону поддержки или сопротивления, которую до этого многократно не могла преодолеть. Но сам выход за уровень ещё ничего не значит: крупный капитал часто сначала выбивает чужие стопы ложным движением, а уже потом идёт по-настоящему.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как отличить истинный пробой от ложного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Главный фильтр это объём. Истинный пробой почти всегда идёт с ростом объёма, а выход за уровень на вялом объёме это первый звоночек ложного движения. Добавьте к этому проверку закрепления за уровнем и разворотный сигнал на ретесте, например пин-бар.',
          },
        },
        {
          '@type': 'Question',
          name: 'Зачем крупные игроки делают ложный пробой?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Чтобы собрать ликвидность для набора позиции. За очевидным уровнем стоят стопы и ордера толпы. Цену заводят туда, выбивают эти ордера, и против них крупный капитал спокойно набирает позицию по выгодной цене, а затем разворачивает рынок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Где ставить стоп при торговле пробоя?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'За экстремум отката или накола, то есть за самую дальнюю точку движения, плюс небольшой запас на спред. Так стоп короткий и логичный: уход цены туда снова отменяет сценарий. Цель ставят на следующем импульсном уровне, что даёт соотношение риска к прибыли от 1:2.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли входить прямо в момент пробоя?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По моему опыту нет. В момент пробоя волатильность высокая, и легко влететь на ложном движении. Устойчивее дождаться ретеста, то есть отката к пробитому уровню, и пин-бара на возросшем объёме, и только тогда входить в сторону пробоя с коротким стопом.',
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
      '@id': 'https://arapov.trade/ru/freestudying/breakout-strategy#howto',
      name: 'Как торговать пробой уровня',
      description:
        'Пошаговый разбор пробоя уровня: как отличить истинный от ложного и как входить после ретеста',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что такое пробой и что уровень это зона',
          text: 'Пробой уровня это момент, когда цена проходит сквозь зону поддержки или сопротивления, которую раньше не могла преодолеть.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Отличайте истинный пробой от ложного по объёму',
          text: 'Главный фильтр истинного пробоя это объём: настоящий пробой идёт с ростом объёма, ложный его лишён.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Поймите логику ложного накола как сбора ликвидности',
          text: 'Ложный пробой крупный капитал устраивает, чтобы собрать стопы толпы и набрать против них свою позицию.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Входите не на пробое, а на ретесте с пин-баром',
          text: 'Вход делают не в момент прокола, а после ретеста, то есть отката к пробитому уровню с разворотным сигналом.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ставьте короткий стоп и считайте соотношение риска',
          text: 'Стоп ставят за экстремум отката или накола, а цель на следующем импульсном уровне.',
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
      name: 'Глоссарий терминов статьи',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Пробой уровня',
          description:
            'Момент, когда цена проходит сквозь зону поддержки или сопротивления, которую до этого многократно не могла преодолеть.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за значимый уровень с быстрым возвратом обратно, создающий ложную видимость нового тренда.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Повторный подход цены к только что пробитому уровню, который служит точкой входа в сторону пробоя.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
