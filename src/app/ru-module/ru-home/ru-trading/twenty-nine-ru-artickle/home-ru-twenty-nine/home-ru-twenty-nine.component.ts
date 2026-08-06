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
  selector: 'app-home-ru-twenty-nine',
  templateUrl: './home-ru-twenty-nine.component.html',
  styleUrl: './home-ru-twenty-nine.component.scss',
})
export class HomeRuTwentyNineComponent implements OnInit {
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
      'Почему трейдеры теряют деньги | Ловушки Смарт Мани | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Почему 90% трейдеров теряют деньги: ловушки Смарт Мани, манипуляции крупных игроков, охота за стоп-лоссами и методы защиты капитала.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-04' });  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
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
          '@id': 'https://arapov.trade/ru/freestudying/smartmoneytraps#article',
          headline: 'Почему трейдеры теряют деньги: ловушки Смарт Мани',
          description:
            'Анализ причин убытков розничных трейдеров: манипуляции крупных игроков, охота за стоп-лоссами, ложные пробои и методы защиты от ловушек',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartmoneytraps1.webp',
            width: 1200,
            height: 630,
          },
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
              width: 200,
              height: 60,
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/smartmoneytraps',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'Smart Money',
            'ловушки',
            'манипуляции',
            'стоп-хантинг',
            'ложные пробои',
          ],
          wordCount: 1359,
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
        'https://t.me/ArapovTrade'
      ],
      jobTitle: ['Независимый исследователь', 'трейдер', 'автор и основатель arapov.trade'],
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
      '@id': 'https://arapov.trade/ru/freestudying/smartmoneytraps#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Почему 90% трейдеров теряют деньги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основная причина — непонимание действий институциональных игроков (Smart Money). Крупные участники используют манипуляции ликвидностью, охоту за стоп-лоссами и ложные пробои, чтобы забрать капитал розничных трейдеров.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое охота за стоп-лоссами (Stop Hunting)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop Hunting — это стратегия крупных игроков по движению цены к зонам скопления стоп-ордеров розничных трейдеров. После активации стопов рынок разворачивается в противоположном направлении, позволяя институциональным участникам войти по выгодным ценам.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как распознать ложный пробой?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ложный пробой характеризуется выходом цены за ключевой уровень с последующим быстрым возвратом. Признаки: отсутствие объёмного подтверждения, резкий разворот после пробоя, дивергенция между ценой и объёмом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как защититься от манипуляций Smart Money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Анализируйте объёмы перед входом в сделку, размещайте стоп-лоссы в менее очевидных местах, ждите подтверждения пробоев через ретест уровня, используйте анализ потока ордеров и ограничивайте риск до 1-2% на сделку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое фазы накопления и распределения?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Накопление — фаза скрытого набора позиций крупными игроками в боковом диапазоне перед ростом. Распределение — фаза выхода из позиций перед падением. Эти фазы маскируются под флэтовое движение рынка.',
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
      '@id': 'https://arapov.trade/ru/freestudying/smartmoneytraps#howto',
      name: 'Как избежать ловушек Smart Money',
      description:
        'Пошаговая методика защиты от манипуляций крупных игроков на финансовых рынках',
      totalTime: 'PT20M',
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Анализ объёмов',
          text: 'Проверяйте объёмное подтверждение перед входом в сделку. Движение без объёма часто является манипуляцией.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Ожидание ретеста',
          text: 'Не входите в сделку сразу на пробое. Дождитесь возврата цены к пробитому уровню для подтверждения.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Размещение стоп-лоссов',
          text: 'Ставьте защитные ордера за ключевыми уровнями ликвидности, а не за очевидными максимумами и минимумами.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Анализ ликвидности',
          text: 'Изучайте стакан заявок и распределение открытых позиций для понимания намерений крупных игроков.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Контроль рисков',
          text: 'Ограничивайте риск на сделку до 1-2% депозита. Не увеличивайте позицию после убытков.',
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
      '@id': 'https://arapov.trade/ru/freestudying/smartmoneytraps#terms',
      name: 'Глоссарий терминов манипуляций рынка',
      description:
        'Ключевые термины, связанные с ловушками и манипуляциями Smart Money',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Крупные институциональные участники рынка — банки, хедж-фонды, маркет-мейкеры, влияющие на ценовые движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Охота за стоп-лоссами — стратегия движения цены к зонам скопления защитных ордеров для их активации',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Fake Breakout — выход цены за ключевой уровень с последующим быстрым возвратом в диапазон',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Накопление',
          description:
            'Accumulation — фаза скрытного набора позиций крупными игроками перед началом восходящего тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Распределение',
          description:
            'Distribution — фаза выхода крупных игроков из позиций перед началом нисходящего тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Скопление ордеров на определённых ценовых уровнях, привлекающее внимание институциональных игроков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Участник рынка, обеспечивающий ликвидность и влияющий на спреды и глубину рынка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description:
            'High-Frequency Trading — высокочастотная торговля с использованием алгоритмов для манипуляции ценой',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            'Поток ордеров — анализ реальных сделок и заявок для понимания намерений участников рынка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Манипуляция ликвидностью',
          description:
            'Создание искусственной активности для направления цены в нужную крупным игрокам сторону',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
