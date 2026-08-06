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
  selector: 'app-home-ru-blog-one',
  templateUrl: './home-ru-blog-one.component.html',
  styleUrl: './home-ru-blog-one.component.scss',
})
export class HomeRuBlogOneComponent implements OnInit {
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
      'Имбаланс и FVG (Fair Value Gap) | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое имбаланс и FVG (Fair Value Gap), как находить зоны неэффективности на графике и почему цена часто возвращается их закрывать.',
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
            'Имбаланс и FVG в трейдинге: что это и как торговать дисбаланс',
          description:
            'Что такое имбаланс и FVG (Fair Value Gap), как находить зоны неэффективности на графике и почему цена часто возвращается их закрывать.',
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
            '@id': 'https://arapov.trade/ru/freestudying/imbalance-fvg',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/imbalanceandfvg.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Smart Money',
          keywords:
            'имбаланс, Fair Value Gap, FVG, дисбаланс, зона имбаланса, Smart Money, ордер-блок',
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
          name: 'Что такое имбаланс и FVG простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Имбаланс это зона, через которую цена пронеслась слишком быстро, оставив спрос и предложение не в равновесии. Fair Value Gap, или FVG, это видимый шлейф такого хода в форме разрыва между свечами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем FVG отличается от имбаланса?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FVG это самый узнаваемый частный случай имбаланса, разрыв из трёх свечей. Имбаланс шире: это любой переход рынка из баланса в дисбаланс. Поэтому всякий FVG это имбаланс, но не всякий имбаланс оформлен как классический FVG.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как найти зону имбаланса на графике?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Возьмите три свечи подряд и посмотрите на сильную среднюю. Если для бычьего случая минимум третьей свечи выше максимума первой, между ними остаётся незаполненная зона, это и есть разрыв. Надёжнее всего искать такие зоны на уровнях с накоплением объёма.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему цена возвращается в зону имбаланса?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Резкий ход бросает за собой неисполненные ордера, а рынок тяготеет к равновесию, поэтому цена откатывает в зону и добирает оставленную ликвидность. Но это не закон: на старших таймфреймах и на новостях разрыв вполне может остаться незакрытым.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как торговать по зонам имбаланса?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Дожидаетесь возврата цены к зоне и входите по направлению основного движения, но только после реакции цены, например пин-бара или отбоя, и на подсохшем объёме. Стоп уводят за дальнюю кромку разрыва, цель на следующем уровне.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем имбаланс отличается от ордер-блока?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ордер-блок это участок, откуда стартовал импульс и где крупный капитал копил позицию. Имбаланс это шлейф самого импульса. Крепче всего работает их связка под подтверждением объёма.',
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
      '@id': 'https://arapov.trade/ru/freestudying/imbalance-fvg#howto',
      name: 'Как находить и торговать имбаланс и FVG',
      description:
        'Пошаговый разбор зоны дисбаланса: от поиска по трём свечам до входа на возврате цены',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите природу имбаланса',
          text: 'Имбаланс это перекос спроса и предложения, при котором цена пролетает участок графика, не дав части ордеров исполниться.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Найдите FVG по трём свечам',
          text: 'Возьмите три свечи с сильной средней: для бычьего разрыва минимум третьей свечи выше максимума первой, для медвежьего зеркально.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дождитесь возврата в зону',
          text: 'После импульса цена часто откатывает к зоне FVG, чтобы добрать оставленную ликвидность, и там ищут вход по ходу движения.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Входите по реакции и объёму',
          text: 'Вслепую в зону не входят: ждут реакции цены, пин-бара или отбоя, и подсохшего объёма, а стоп прячут за дальнюю кромку разрыва.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Усиливайте зону ордер-блоком',
          text: 'Самые сильные зоны выходят там, где имбаланс ложится на ордер-блок и подтверждён объёмом крупного интереса.',
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
          name: 'Имбаланс',
          description:
            'Перекос между спросом и предложением, при котором цена проходит участок графика так быстро, что часть ордеров в этой зоне не успевает исполниться.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Самый узнаваемый частный случай имбаланса: видимый разрыв из трёх свечей, который цена прошла одним резким движением.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
