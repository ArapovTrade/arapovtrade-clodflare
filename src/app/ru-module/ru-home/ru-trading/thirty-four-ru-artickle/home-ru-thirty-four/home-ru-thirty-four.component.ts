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
  selector: 'app-home-ru-thirty-four',
  templateUrl: './home-ru-thirty-four.component.html',
  styleUrl: './home-ru-thirty-four.component.scss',
})
export class HomeRuThirtyFourComponent implements OnInit {
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
      'Стоп-лимитный ордер: точный контроль исполнения сделок | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Стоп-лимитный ордер — как работает гибридный инструмент трейдинга, сочетающий контроль цены и автоматическую активацию для защиты от проскальзывания',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-03-29' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/stoplimitorder1.png',
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
          headline: 'Стоп-лимитный ордер: точный контроль исполнения сделок',
          description:
            'Полное руководство по стоп-лимитным ордерам: механизм работы, настройка параметров, сравнение с другими типами ордеров и практические примеры применения',
          image: 'https://arapov.trade/assets/img/content/stoplimitorder1.png',
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
          datePublished: '2026-03-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/stoplimitorder',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: '1700',
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
          name: 'Чем стоп-лимитный ордер отличается от обычного стоп-лосса?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лосс после активации становится рыночным ордером и исполняется по любой доступной цене. Стоп-лимитный ордер превращается в лимитный и исполняется только в заданном ценовом диапазоне. Это даёт контроль над ценой, но не гарантирует исполнение.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой диапазон задавать между стоп-ценой и лимитной ценой?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для криптовалют рекомендуется 0.5-1.5% от цены, для акций крупных компаний — 0.2-0.5%, для форекс-пар — 10-30 пунктов. При высокой волатильности диапазон увеличивают.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему стоп-лимитный ордер может не исполниться?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ордер остаётся неисполненным, если цена проскакивает лимитный уровень слишком быстро или на рынке недостаточно ликвидности в заданном диапазоне.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда лучше использовать стоп-лимит вместо стоп-лосса?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лимит предпочтителен при работе с низколиквидными активами или когда точная цена исполнения критически важна. Для защиты от крупных убытков лучше обычный стоп-лосс.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли использовать стоп-лимитный ордер для входа в позицию?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, это распространённая практика для торговли пробоев. Стоп-цена устанавливается чуть выше сопротивления для покупки, а лимитная цена ограничивает максимальную стоимость входа.',
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
      name: 'Как настроить стоп-лимитный ордер',
      description: 'Пошаговое руководство по установке стоп-лимитного ордера',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите стоп-цену',
          text: 'Выберите уровень активации на основе технического анализа. Для покупки — чуть выше сопротивления, для продажи — ниже поддержки.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Рассчитайте лимитную цену',
          text: 'Установите границу исполнения с учётом волатильности. Запас 0.3-1% в зависимости от актива.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Проверьте ликвидность',
          text: 'Изучите стакан заявок. Убедитесь, что в заданном диапазоне достаточно ликвидности.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Установите ордер',
          text: 'Введите параметры в терминале: стоп-цену, лимитную цену и объём. Проверьте перед подтверждением.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Контролируйте исполнение',
          text: 'Следите за статусом. При изменении условий корректируйте параметры или отменяйте ордер.',
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
      name: 'Глоссарий терминов стоп-лимитных ордеров',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лимитный ордер',
          description:
            'Гибридный торговый приказ, активирующийся при достижении стоп-цены и исполняющийся как лимитный',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-цена',
          description:
            'Триггерный уровень, при достижении которого ордер активируется',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лимитная цена',
          description: 'Максимальная или минимальная цена исполнения сделки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проскальзывание',
          description: 'Разница между ожидаемой и фактической ценой исполнения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность рынка обеспечить исполнение ордера без влияния на цену',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стакан заявок',
          description: 'Таблица активных ордеров с ценами и объёмами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Гэп',
          description: 'Ценовой разрыв на графике между периодами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рыночный ордер',
          description: 'Приказ на немедленное исполнение по текущей цене',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лимитный ордер',
          description: 'Приказ на исполнение по указанной цене или лучше',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробой уровня',
          description:
            'Выход цены за пределы значимого уровня поддержки или сопротивления',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
