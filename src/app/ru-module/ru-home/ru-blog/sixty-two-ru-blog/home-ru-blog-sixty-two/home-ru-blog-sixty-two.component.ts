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
  selector: 'app-home-ru-blog-sixty-two',
  templateUrl: './home-ru-blog-sixty-two.component.html',
  styleUrl: './home-ru-blog-sixty-two.component.scss',
})
export class HomeRuBlogSixtyTwoComponent {
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
      'Стратегия Smart Money: как находить точки входа | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Стратегии Smart Money для трейдинга: как находить точки входа по Order Blocks, Fair Value Gaps, Break of Structure и анализу ликвидности. Полное руководство.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneystrategies.png',
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
          '@id':
            'https://arapov.trade/ru/freestudying/smartmoneystrategies#article',
          headline:
            'Стратегия Smart Money: как находить точки входа в трейдинге',
          description:
            'Полное руководство по стратегиям Smart Money: Order Blocks, Fair Value Gaps, Break of Structure и анализ ликвидности для поиска точных точек входа',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartmoneystrategies1.webp',
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
          datePublished: '2026-03-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/smartmoneystrategies',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'Smart Money',
            'Order Blocks',
            'Fair Value Gaps',
            'Break of Structure',
            'ликвидность',
            'точки входа',
            'трейдинг',
          ],
          wordCount: 1418,
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
      '@id': 'https://arapov.trade/ru/freestudying/smartmoneystrategies#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое Smart Money в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money — это крупные институциональные участники рынка: инвестиционные банки, хедж-фонды, пенсионные фонды и маркет-мейкеры. Они располагают значительным капиталом и аналитическими ресурсами, формируя основные рыночные тенденции через накопление и распределение позиций.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как находить Order Blocks на графике?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Order Block — это последняя свеча перед сильным импульсным движением. Бычий Order Block формируется последней медвежьей свечой перед ростом, медвежий — последней бычьей свечой перед падением. Важно подтверждение повышенными объёмами и возврат цены к этой зоне.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое Fair Value Gap и как его использовать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fair Value Gap (FVG) — это незаполненный ценовой разрыв, образующийся при быстром движении цены. Он показывает дисбаланс между покупателями и продавцами. Цена стремится вернуться в эти зоны, что создаёт торговые возможности для входа в позицию.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличается Break of Structure от Change of Character?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Break of Structure (BOS) подтверждает продолжение текущего тренда через пробой ключевого уровня. Change of Character (CHoCH) сигнализирует о возможной смене тренда, когда цена перестаёт формировать новые экстремумы в прежнем направлении и пробивает противоположный уровень.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой риск-менеджмент использовать при торговле по Smart Money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальный риск на сделку составляет 1-2% от капитала. Стоп-лосс размещается за зонами ликвидности. Минимальное соотношение риска к прибыли — 1:2. Рекомендуется частичное закрытие позиции на ключевых уровнях и использование трейлинг-стопа в трендовых движениях.',
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
      '@id': 'https://arapov.trade/ru/freestudying/smartmoneystrategies#howto',
      name: 'Как находить точки входа по Smart Money Concepts',
      description:
        'Пошаговая методика поиска высоковероятностных точек входа с использованием институциональных концепций трейдинга',
      totalTime: 'PT30M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определение рыночной структуры',
          text: 'Проанализируйте текущий тренд, определите ключевые максимумы и минимумы. Выявите зоны накопления и распределения на графике.',
          url: 'https://arapov.trade/ru/freestudying/smartmoneystrategies#structure',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Поиск зон ликвидности',
          text: 'Найдите области скопления стоп-ордеров: за уровнями поддержки и сопротивления, у дневных и недельных экстремумов, на круглых психологических уровнях.',
          url: 'https://arapov.trade/ru/freestudying/smartmoneystrategies#liquidity',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Идентификация Order Blocks и FVG',
          text: 'Определите Order Blocks — последние свечи перед импульсом. Найдите Fair Value Gaps — незаполненные разрывы после резких движений. Отметьте эти зоны на графике.',
          url: 'https://arapov.trade/ru/freestudying/smartmoneystrategies#orderblocks',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ожидание подтверждающих сигналов',
          text: 'Дождитесь возврата цены в зону интереса. Ищите подтверждение: свечные паттерны, увеличение объёмов, Break of Structure или Change of Character.',
          url: 'https://arapov.trade/ru/freestudying/smartmoneystrategies#confirmation',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Вход и управление позицией',
          text: 'Откройте позицию при наличии подтверждения. Разместите стоп-лосс за зоной ликвидности. Определите тейк-профит у следующей значимой зоны. Используйте соотношение риска к прибыли минимум 1:2.',
          url: 'https://arapov.trade/ru/freestudying/smartmoneystrategies#entry',
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
      '@id': 'https://arapov.trade/ru/freestudying/smartmoneystrategies#terms',
      name: 'Глоссарий терминов Smart Money Concepts',
      description:
        'Ключевые термины и определения методологии Smart Money в трейдинге',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Крупные институциональные участники рынка — банки, хедж-фонды, маркет-мейкеры, — располагающие значительным капиталом и влияющие на рыночные движения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'Зона на графике, где институциональные игроки накапливали позиции перед значительным ценовым движением; последняя свеча перед импульсом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Незаполненный ценовой разрыв, образующийся при быстром движении цены; зона дисбаланса между спросом и предложением',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Break of Structure',
          description:
            'Пробой ключевого максимума или минимума, подтверждающий продолжение текущего тренда',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Change of Character',
          description:
            'Сигнал потенциальной смены тренда; пробой уровня в направлении, противоположном текущему тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Sweep',
          description:
            'Процесс выбивания стоп-ордеров розничных трейдеров перед разворотом цены; манипуляция ликвидностью',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Тактика крупных игроков по движению цены к зонам скопления стоп-ордеров для сбора ликвидности',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Скопление ордеров на определённых ценовых уровнях; ресурс, необходимый институциональным игрокам для открытия крупных позиций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Участник рынка, обеспечивающий ликвидность путём выставления котировок на покупку и продажу; крупный институциональный игрок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками в торговле, включающая определение размера позиции, уровней стоп-лосса и соотношения риска к прибыли',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
