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
  selector: 'app-home-ru-thirty-seven',
  templateUrl: './home-ru-thirty-seven.component.html',
  styleUrl: './home-ru-thirty-seven.component.scss',
})
export class HomeRuThirtySevenComponent implements OnInit {
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
      'Stop Hunting: как Smart Money выбивают стопы | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Stop Hunting — манипулятивная стратегия Smart Money для выбивания стоп-лоссов. Узнайте, как распознать охоту за стопами и защитить свои позиции на форекс и криптовалютном рынке.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-03-31' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
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
          headline: 'Stop Hunting: как Smart Money выбивают стопы трейдеров',
          description:
            'Полное руководство по Stop Hunting — манипулятивной стратегии крупных игроков для сбора ликвидности через выбивание стоп-лоссов розничных трейдеров.',
          image: 'https://arapov.trade/assets/img/content/stophunting1.webp',
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
            url: 'https://arapov.trade',
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/stophunting',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'stop hunting',
            'охота за стопами',
            'smart money',
            'ликвидность',
            'манипуляции рынком',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое Stop Hunting в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop Hunting (охота за стопами) — это манипулятивная стратегия крупных игроков (Smart Money), при которой они искусственно двигают цену к зонам скопления стоп-лоссов розничных трейдеров. Цель — активировать эти ордера, получить ликвидность и затем развернуть цену в выгодном направлении.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как Smart Money находят стоп-лоссы трейдеров?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money используют объемный анализ, данные стакана ордеров (Order Flow), анализ ключевых уровней поддержки и сопротивления, а также алгоритмические системы. Большинство трейдеров размещают стопы в предсказуемых местах — за очевидными уровнями и круглыми числами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как защититься от выбивания стоп-лоссов?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные методы защиты: не размещать стопы за очевидными уровнями, использовать более широкий стоп-лосс с меньшим объемом позиции, анализировать объемы при пробоях, избегать торговли во время выхода новостей и дожидаться подтверждения перед входом в сделку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем ложный пробой отличается от истинного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Истинный пробой сопровождается значительным увеличением объема и закреплением цены за уровнем. Ложный пробой происходит на низком объеме, цена быстро возвращается обратно. Анализ объемов и поведения цены после пробоя помогает отличить манипуляцию от реального движения.',
          },
        },
        {
          '@type': 'Question',
          name: 'На каких рынках чаще происходит Stop Hunting?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Stop Hunting встречается на всех рынках, но особенно активно на форекс (из-за высокой ликвидности и децентрализации) и криптовалютах (из-за волатильности и слабого регулирования). На фондовом рынке манипуляции чаще происходят перед важными корпоративными событиями.',
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
      name: 'Как распознать и избежать Stop Hunting',
      description:
        'Пошаговое руководство по защите от манипуляций Smart Money на финансовых рынках',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите зоны ликвидности',
          text: 'Найдите на графике очевидные уровни поддержки и сопротивления, круглые числа и локальные экстремумы — именно там большинство трейдеров размещают стоп-лоссы.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Анализируйте объем при пробое',
          text: 'Используйте индикаторы объема (Volume Profile, OBV, Delta). Если пробой уровня происходит без значительного увеличения объема — это потенциальная ловушка Smart Money.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дождитесь подтверждения',
          text: 'Не входите в сделку сразу на пробое. Подождите ретест уровня и формирование подтверждающего паттерна (пин-бар, поглощение), чтобы убедиться в истинности движения.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Разместите стоп грамотно',
          text: 'Ставьте стоп-лосс не прямо за уровнем, а с отступом. Используйте ATR для расчета оптимального расстояния и уменьшите размер позиции, чтобы компенсировать более широкий стоп.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Избегайте торговли на новостях',
          text: 'Во время выхода важных экономических данных волатильность резко возрастает, и Smart Money активно выбивают стопы в обе стороны. Лучше дождаться стабилизации рынка.',
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
      name: 'Глоссарий терминов Stop Hunting',
      description:
        'Ключевые термины, связанные с охотой за стопами и манипуляциями Smart Money',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Манипулятивная стратегия крупных игроков для выбивания стоп-лоссов розничных трейдеров с целью сбора ликвидности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Крупные участники рынка — банки, хедж-фонды, институциональные трейдеры, способные влиять на движение цены',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Объем ордеров на покупку и продажу в определенной ценовой зоне, необходимый для исполнения крупных позиций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременное движение цены за ключевой уровень с последующим быстрым возвратом, используемое для сбора стоп-ордеров',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Flow',
          description:
            'Анализ потока ордеров — метод изучения реальных сделок и заявок для понимания намерений крупных игроков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия позиции при достижении определенного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description:
            'Разница между ожидаемой и фактической ценой исполнения ордера, возникающая при недостаточной ликвидности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'HFT',
          description:
            'High-Frequency Trading — высокочастотный трейдинг с использованием алгоритмов для совершения тысяч сделок в секунду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            'Инструмент анализа, показывающий распределение торгового объема по ценовым уровням',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Участник рынка, обеспечивающий ликвидность путем выставления котировок на покупку и продажу актива',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
