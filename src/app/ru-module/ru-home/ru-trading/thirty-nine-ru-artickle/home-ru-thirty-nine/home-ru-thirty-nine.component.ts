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
  selector: 'app-home-ru-thirty-nine',
  templateUrl: './home-ru-thirty-nine.component.html',
  styleUrl: './home-ru-thirty-nine.component.scss',
})
export class HomeRuThirtyNineComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Соотношение прибыли и убытка в трейдинге: расчёт и применение R/R | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Соотношение прибыли и убытка (Risk/Reward Ratio) в трейдинге: как рассчитать, оптимизировать и применять для стабильной прибыли на финансовых рынках.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-08' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/profitandlossratio.webp',
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
          headline:
            'Соотношение прибыли и убытка в трейдинге: расчёт и применение R/R',
          description:
            'Соотношение прибыли и убытка (Risk/Reward Ratio) в трейдинге: как рассчитать, оптимизировать и применять для стабильной прибыли на финансовых рынках.',
          image:
            'https://arapov.trade/assets/img/content/profitandlossratio1.webp',
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
            url: 'https://arapov.trade',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/profitandlossratio',
          },
          articleSection: 'Обучение трейдингу',
          keywords: [
            'соотношение прибыли и убытка',
            'Risk Reward Ratio',
            'управление рисками',
            'трейдинг',
            'R/R',
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
          name: 'Что такое соотношение прибыли и убытка (R/R Ratio)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'R/R Ratio (Risk/Reward Ratio) — это метрика, показывающая отношение потенциальной прибыли к потенциальному убытку в сделке. Например, R/R 1:3 означает, что на каждый рубль риска трейдер рассчитывает получить три рубля прибыли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какое соотношение R/R считается оптимальным?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Минимально рекомендуемое соотношение — 1:2, при котором потенциальная прибыль вдвое превышает риск. Опытные трейдеры часто ориентируются на 1:3 и выше, что позволяет оставаться в плюсе даже при низком проценте прибыльных сделок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как R/R Ratio связан с процентом прибыльных сделок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Высокий R/R компенсирует низкий процент прибыльных сделок. При соотношении 1:3 достаточно выигрывать 30% сделок для выхода в плюс, тогда как при R/R 1:1 требуется более 50% успешных операций.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как правильно рассчитать R/R перед входом в сделку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Определите точку входа, уровень стоп-лосса и тейк-профита. Разделите расстояние до тейк-профита на расстояние до стоп-лосса. Учтите спред и комиссии для получения реального значения R/R.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие ошибки чаще всего допускают при работе с R/R?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные ошибки: слишком узкие стоп-лоссы, игнорирование спреда и комиссий, изменение плана сделки под влиянием эмоций, установка нереалистичных целей по прибыли без учёта волатильности.',
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
      name: 'Как применять соотношение прибыли и убытка в торговле',
      description:
        'Пошаговое руководство по расчёту и применению R/R Ratio для повышения эффективности торговли.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите точку входа',
          text: 'Проанализируйте рынок и найдите оптимальную точку входа на основе технического или фундаментального анализа. Точный вход повышает итоговое соотношение R/R.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Установите стоп-лосс',
          text: 'Разместите стоп-лосс за ключевым уровнем поддержки или сопротивления. Используйте ATR для определения оптимального расстояния с учётом текущей волатильности.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Определите тейк-профит',
          text: 'Установите цель по прибыли на основе ближайших уровней сопротивления или поддержки. Убедитесь, что расстояние до тейк-профита минимум вдвое превышает расстояние до стоп-лосса.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Рассчитайте реальный R/R',
          text: 'Учтите спред и комиссии брокера. Реальное соотношение должно оставаться не ниже 1:2 после учёта всех издержек торговли.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Следуйте плану',
          text: 'Не изменяйте уровни стоп-лосса и тейк-профита после входа в сделку. Дисциплина — ключевой фактор успешного применения R/R Ratio.',
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
      name: 'Глоссарий терминов Risk/Reward',
      description:
        'Ключевые термины и определения в области управления соотношением прибыли и убытка',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Risk/Reward Ratio',
          description:
            'Соотношение потенциальной прибыли к потенциальному убытку в торговой сделке',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия позиции при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Ордер для автоматической фиксации прибыли при достижении ценой заданного целевого уровня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Win Rate',
          description:
            'Процент прибыльных сделок от общего количества совершённых торговых операций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description:
            'Average True Range — индикатор среднего истинного диапазона для измерения волатильности актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Снижение торгового капитала от максимального значения до минимума за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Мани-менеджмент',
          description:
            'Система управления капиталом для контроля рисков и оптимизации размера торговых позиций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлинг-стоп',
          description:
            'Динамический стоп-лосс, автоматически следующий за ценой для защиты накопленной прибыли',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки и продажи актива, составляющая часть торговых издержек',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый временной период',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
