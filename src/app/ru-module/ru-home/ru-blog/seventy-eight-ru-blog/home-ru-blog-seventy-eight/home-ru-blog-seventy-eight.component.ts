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
  selector: 'app-home-ru-blog-seventy-eight',
  templateUrl: './home-ru-blog-seventy-eight.component.html',
  styleUrl: './home-ru-blog-seventy-eight.component.scss',
})
export class HomeRuBlogSeventyEightComponent {
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
    this.titleService.setTitle('Что такое FOMO в трейдинге? | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'FOMO в трейдинге: что такое страх упущенной выгоды, как он влияет на торговлю и методы его преодоления. Психология трейдера и контроль эмоций.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/fomo.webp',
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
          headline: 'FOMO в трейдинге: как побороть страх упущенной выгоды',
          description:
            'FOMO в трейдинге: что такое страх упущенной выгоды, как он влияет на торговлю и методы его преодоления.',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          image: 'https://arapov.trade/assets/img/content/fomo.webp',
          datePublished: '2025-09-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/fomo',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: 1350,
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое FOMO в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FOMO (Fear of Missing Out) — это страх упущенной выгоды, психологическое состояние, при котором трейдер испытывает острое беспокойство при мысли о пропущенной возможности заработать на рынке.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как FOMO влияет на торговые результаты?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FOMO приводит к импульсивным входам без анализа, нарушению торгового плана, увеличению рисков и эмоциональному истощению. Трейдеры часто покупают на пике и несут убытки.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как распознать FOMO в своей торговле?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Признаки FOMO: импульсивные входы, раздражение после пропущенных сделок, постоянный мониторинг графиков, увеличение объёма позиций и частая смена стратегий.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какие методы помогают преодолеть FOMO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Эффективные методы: следование торговому плану, правило пяти минут перед входом, ограничение социальных сетей, фиксированный риск на сделку и ведение торгового журнала.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему социальные сети усиливают FOMO?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Скриншоты чужих прибылей и восторженные посты создают иллюзию, что все вокруг богатеют. Это вызывает желание догнать уходящий поезд и толкает на необдуманные сделки.',
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
      name: 'Как преодолеть FOMO в трейдинге',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Осознайте проблему',
          text: 'Честно признайте, что эмоции влияют на ваши торговые решения.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Создайте торговый план',
          text: 'Определите чёткие критерии входа и выхода, не оставляющие места для импульсивных решений.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Применяйте правило пяти минут',
          text: 'Почувствовав желание войти в рынок, подождите пять минут перед принятием решения.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ограничьте информационный поток',
          text: 'Сократите время в социальных сетях и трейдерских чатах.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ведите торговый журнал',
          text: 'Записывайте эмоциональное состояние при каждой сделке для выявления паттернов.',
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
      name: 'Термины: FOMO и психология трейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'FOMO',
          description:
            'Fear of Missing Out — страх упущенной выгоды, толкающий на импульсивные торговые решения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Импульсивная торговля',
          description:
            'Открытие сделок без предварительного анализа под влиянием эмоций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговая дисциплина',
          description:
            'Способность следовать торговому плану независимо от эмоционального состояния',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система управления рисками для защиты торгового капитала',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый план',
          description:
            'Набор правил, определяющих условия входа и выхода из сделок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тильт',
          description:
            'Состояние эмоционального срыва, ведущее к хаотичной торговле',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сетап',
          description:
            'Набор условий на графике, сигнализирующий о возможности входа в сделку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Степень изменчивости цены актива за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description: 'Защитный ордер для ограничения убытков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Переторговка',
          description: 'Чрезмерно частое открытие сделок, ведущее к убыткам',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
