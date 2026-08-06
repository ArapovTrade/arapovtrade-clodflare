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
  selector: 'app-home-ru',
  templateUrl: './home-ru.component.html',
  styleUrl: './home-ru.component.scss',
})
export class HomeRuComponent implements OnInit {
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
      '10 советов начинающим трейдерам: как избежать типичных ошибок | ArapovTrade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Практические советы для начинающих трейдеров от профессионала с 11-летним опытом. Выбор брокера, управление рисками, психология торговли и построение торгового плана.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-07' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/traderStarterw.webp',
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
            'https://arapov.trade/ru/freestudying/adviceforbeginners#article',
          headline:
            '10 советов начинающим трейдерам: как избежать типичных ошибок',
          description:
            'Практические советы для начинающих трейдеров от профессионала с 11-летним опытом.',
          image: [
            'https://arapov.trade/assets/img/content/traderStarterw.webp',
          ],
          datePublished: '2025-01-10T12:00:00+02:00',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/adviceforbeginners',
          },
          articleSection: 'Трейдинг для начинающих',
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
      '@id': 'https://arapov.trade/ru/freestudying/adviceforbeginners#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Сколько денег нужно для начала торговли?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начать можно с 50-200 долларов у брокеров с микро-лотами. Однако комфортный старт — от 500 долларов. Главное правило: торгуйте только теми деньгами, потерю которых можете себе позволить.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько времени нужно на обучение трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Базовую теорию можно освоить за 1-2 месяца. Формирование устойчивых навыков занимает 6-12 месяцев практики. Стабильные результаты обычно появляются через 1-2 года системной работы.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какое кредитное плечо выбрать новичку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Начинающим рекомендуется плечо не выше 1:10-1:20. Высокое плечо усиливает не только прибыль, но и убытки. С опытом можно постепенно увеличивать до 1:30-1:50.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему большинство трейдеров теряют деньги?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные причины: отсутствие торгового плана, нарушение риск-менеджмента, эмоциональные решения, недостаточная подготовка и нереалистичные ожидания быстрой прибыли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какой стиль торговли лучше для начинающих?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Новичкам лучше начинать со свинг-трейдинга (позиции на несколько дней). Он даёт время на анализ, снижает влияние шума и не требует постоянного присутствия у монитора.',
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
      '@id': 'https://arapov.trade/ru/freestudying/adviceforbeginners#howto',
      name: 'Как начать торговать на финансовых рынках',
      description: 'Пошаговый план для начинающих трейдеров',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Изучите базовую теорию',
          text: 'Потратьте 3-4 недели на изучение основ: типы рынков, классы активов, базовая терминология. Используйте книги и бесплатные курсы.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Выберите надёжного брокера',
          text: 'Проверьте лицензию регулятора, сравните спреды и комиссии, протестируйте платформу на демо-счёте.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Составьте торговый план',
          text: 'Определите цели, выберите стратегию, запишите правила входа и выхода, установите лимиты риска.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйтесь на демо-счёте',
          text: 'Торгуйте 1-2 месяца виртуальными деньгами, ведите дневник сделок, анализируйте результаты.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Начните с минимальным капиталом',
          text: 'Переходите на реальный счёт с минимальной суммой, соблюдайте риск-менеджмент, постепенно наращивайте объёмы.',
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
      '@id': 'https://arapov.trade/ru/freestudying/adviceforbeginners#terms',
      name: 'Глоссарий трейдера',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки (ask) и продажи (bid) актива',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кредитное плечо',
          description:
            'Заёмные средства от брокера, увеличивающие торговый капитал',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Ордер автоматического закрытия позиции при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тейк-профит',
          description:
            'Ордер автоматического закрытия позиции при достижении целевой прибыли',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лот',
          description: 'Стандартная единица объёма торговой позиции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржа',
          description:
            'Залоговые средства, блокируемые для открытия позиции с плечом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпинг',
          description: 'Стиль торговли с множеством коротких сделок внутри дня',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свинг-трейдинг',
          description:
            'Торговля позициями от нескольких дней до нескольких недель',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками для защиты торгового капитала',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
