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
  selector: 'app-home-ru-blog-ninty-one',
  templateUrl: './home-ru-blog-ninty-one.component.html',
  styleUrl: './home-ru-blog-ninty-one.component.scss',
})
export class HomeRuBlogNintyOneComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
    this.titleService.setTitle(
      'Тильт в трейдинге: причины, признаки и как избежать | Arapov.trade',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Тильт в трейдинге — эмоциональное состояние, ведущее к потере контроля и депозита. Узнайте причины, признаки и методы борьбы с тильтом трейдера на форекс и криптовалютах.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.themeSubscription = this.themeService.getTheme().subscribe((data) => {
      this.isDark = data;
      this.cdr.detectChanges();
    });

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    // this.titleService.setTitle('Що таке імбаланс у трейдингу | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // this.meta.updateTag({
    //   name: 'description',
    //   content:
    //     'Що таке імбаланс у трейдингу, як він впливає на ринок. Приклади, методи виявлення і стратегії з урахуванням ринкового дисбалансу.',
    // });

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
          headline: 'Тильт в трейдинге: причины, признаки и методы борьбы',
          description:
            'Полное руководство по тильту в трейдинге — эмоциональному состоянию, разрушающему дисциплину и депозит. Как распознать и предотвратить тильт трейдера.',
          image: 'https://arapov.trade/assets/img/content/tilt1.png',
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
          datePublished: '2025-04-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/tiltintrading',
          },
          articleSection: 'Психология трейдинга',
          keywords: [
            'тильт в трейдинге',
            'психология трейдера',
            'эмоции',
            'риск-менеджмент',
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
          name: 'Что такое тильт в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тильт — это эмоциональное состояние, при котором трейдер теряет контроль над своими действиями и принимает решения под влиянием эмоций (страха, жадности, гнева), а не на основе анализа и стратегии. Термин пришёл из покера и означает потерю самообладания.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие признаки указывают на тильт?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные признаки тильта: увеличение объёма сделок сверх нормы, торговля против тренда, игнорирование стоп-лоссов, превышение дневного лимита сделок, хаотичные входы и выходы из позиций, потеря уверенности в собственной стратегии.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем опасен тильт для трейдера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тильт разрушает дисциплину и приводит к нарушению риск-менеджмента. Трейдер увеличивает объёмы позиций, пытаясь отыграться, игнорирует сигналы стратегии и совершает импульсивные сделки. Это может привести к полной потере депозита за короткое время.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как предотвратить тильт?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Профилактика тильта включает: достаточный размер депозита, соблюдение режима сна и отдыха, наличие чёткой торговой стратегии, строгий риск-менеджмент с дневными лимитами убытков, ведение журнала сделок для анализа ошибок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что делать, если тильт уже начался?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При первых признаках тильта необходимо немедленно прекратить торговлю и закрыть терминал. Переключитесь на другое занятие — спорт, прогулку, отдых. Проанализируйте причины срыва. Возвращайтесь к торговле только после полного восстановления эмоционального равновесия.',
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
      name: 'Как справиться с тильтом в трейдинге',
      description:
        'Пошаговое руководство по выходу из эмоционального срыва и предотвращению тильта',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Распознайте признаки тильта',
          text: 'Отслеживайте своё эмоциональное состояние. Если вы чувствуете раздражение, желание отыграться или увеличиваете объёмы сделок — это сигналы тильта.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Немедленно прекратите торговлю',
          text: 'При первых признаках тильта закройте все позиции, выйдите из терминала. Не пытайтесь продолжить торговлю в надежде исправить ситуацию.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Переключите внимание',
          text: 'Займитесь физической активностью, прогуляйтесь на свежем воздухе или отдохните. Это поможет снизить уровень стресса и восстановить ясность мышления.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проанализируйте причины',
          text: 'После восстановления изучите, что спровоцировало тильт: серия убытков, усталость, внешний стресс или эйфория после прибыли. Запишите выводы в журнал.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Вернитесь с планом',
          text: 'Возобновляйте торговлю только когда эмоции под контролем. Начните с уменьшенных объёмов и строго следуйте правилам риск-менеджмента.',
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
      name: 'Глоссарий терминов психологии трейдинга',
      description:
        'Ключевые термины, связанные с тильтом и эмоциональным контролем в торговле',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Тильт',
          description:
            'Эмоциональное состояние потери контроля, при котором трейдер принимает решения под влиянием эмоций, а не анализа',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система правил управления капиталом, определяющая допустимый размер убытков и объём позиций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер для автоматического закрытия позиции при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Снижение торгового капитала относительно максимального значения, выраженное в процентах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Овертрейдинг',
          description:
            'Чрезмерное количество сделок, превышающее нормальный торговый план, часто признак тильта',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Журнал сделок',
          description:
            'Записи о каждой торговой операции для последующего анализа и выявления ошибок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговая дисциплина',
          description:
            'Способность следовать правилам стратегии независимо от эмоционального состояния',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Эйфория',
          description:
            'Эмоциональное состояние чрезмерной уверенности после серии прибыльных сделок, ведущее к повышенным рискам',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
