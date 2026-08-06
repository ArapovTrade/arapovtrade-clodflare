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
  selector: 'app-home-ru-blog-twenty-three',
  templateUrl: './home-ru-blog-twenty-three.component.html',
  styleUrl: './home-ru-blog-twenty-three.component.scss',
})
export class HomeRuBlogTwentyThreeComponent implements OnInit {
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
    this.titleService.setTitle('Объёмный анализ рынка | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Как работает объёмный анализ рынка: профиль объёма, кластеры, дельта и почему объём — первичная причина движения цены.',
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
          headline: 'Объёмный анализ рынка: полный гайд по чтению объёмов',
          description:
            'Как работает объёмный анализ рынка: профиль объёма, кластеры, дельта и почему объём — первичная причина движения цены.',
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
            '@id': 'https://arapov.trade/ru/freestudying/volume-analysis',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/volmarketanalisys.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Объёмный анализ',
          keywords:
            'объёмный анализ, объёмы торгов, усилие и результат, Вайкофф, Volume Profile, POC, Market Profile, пиковые уровни объёма',
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
          name: 'Что такое объёмный анализ простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это чтение рынка по количеству сделок, а не только по цене. Объём показывает, сколько реально торговали за бар. Если за движением цены стоит крупный объём, значит в рынке есть деньги, а если объём сухой, движению верить опасно.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что значит принцип усилие-результат?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Объём это усилие, движение цены это результат. Большое усилие должно давать большое движение. Если объём огромный, а цена стоит на месте, значит встречная сторона поглощает рынок, и это частый сигнал к развороту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как объём подтверждает тренд?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Растущий тренд с растущим объёмом подтверждён, покупатели прибавляют. Если цена растёт, а объём падает, интерес гаснет и возможна коррекция. Высокий объём на пробое уровня говорит о том, что пробой настоящий.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Volume Profile и POC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volume Profile показывает, сколько объёма прошло на каждом ценовом уровне, а не за время. POC это уровень с максимальным объёмом, точка наибольшего интереса участников. Такие зоны часто работают как сильная поддержка и сопротивление.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему на форексе нет реальных объёмов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Форекс это внебиржевой рынок без единого центра, поэтому общий объём сделок там не считается. Доступен только тиковый объём, число изменений цены за время. Он связан с реальным объёмом, но с погрешностью, так что это ориентир, а не точные данные.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли торговать только по объёму?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По моему опыту нет. Объём не даёт сигналов сам по себе, он подтверждает или отменяет то, что видно по уровням и фазе рынка. Лучше всего он работает в связке с уровнями, а не вместо них.',
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
      '@id': 'https://arapov.trade/ru/freestudying/volume-analysis#howto',
      name: 'Как читать рынок по объёму',
      description:
        'Пошаговый разбор объёмного анализа: от чтения усилия и результата до входа по реакции цены',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что измеряет объём',
          text: 'Объём это количество контрактов или лотов, реально сменивших владельца за бар, и важно не само число, а его динамика к соседним барам.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Читайте усилие и результат',
          text: 'Сравнивайте объём бара (усилие) с тем, как далеко ушла цена (результат): большой объём при слабом ходе значит, что кто-то крупный поглощает поток.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Определяйте силу тренда по объёму',
          text: 'Растущий тренд на растущем объёме здоров, а рост цены на падающем объёме сигналит об ослаблении и возможном развороте.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Читайте дефицит спроса и предложения',
          text: 'Причина падения это дефицит спроса, когда крупный капитал перестаёт покупать, а причина роста дефицит предложения; объём-небоскрёб на барах показывает путь наименьшего сопротивления.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Находите пиковые уровни и POC',
          text: 'По Volume Profile ищите цены с максимальным наторгованным объёмом, POC и зону стоимости, где был активен крупный капитал.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Читайте зону стоимости по Market Profile',
          text: 'Market Profile показывает рынок как аукцион: где цена справедлива, а где дорого или дёшево относительно зоны стоимости.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Стройте вход по реакции цены',
          text: 'Размечайте зоны на старшем таймфрейме, а вход берите на младшем, по реакции цены на уровне, а не по факту касания.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Берите честный объём',
          text: 'Реальный объём смотрите на биржевых фьючерсах с клирингом, например на CME, а не тиковый форексный или рисованный крипты.',
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
          name: 'Объёмный анализ',
          description:
            'Метод чтения рынка по количеству сделок, прошедших за период, а не только по движению цены.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Принцип усилия и результата',
          description:
            'Правило Вайкоффа, по которому объём считается приложенным усилием, а движение цены его результатом, и эти две величины всегда сверяют между собой.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пиковый уровень объёма',
          description:
            'Ценовой уровень, на котором прошёл максимальный объём торгов за выбранный период; там был активен крупный капитал, поэтому он работает как сильная поддержка или сопротивление.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description:
            'Способ организации данных о цене, времени и объёме в виде распределения, которое показывает, на каких ценах рынок провёл больше всего времени и сделок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дефицит спроса',
          description:
            'Это ситуация, когда крупный капитал перестаёт покупать на текущих ценах и его спрос исчезает, из-за чего цену продавливают оставшиеся продавцы; зеркальный дефицит предложения становится причиной роста.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
