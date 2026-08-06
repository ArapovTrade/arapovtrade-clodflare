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
  selector: 'app-home-ru-eighteen',
  templateUrl: './home-ru-eighteen.component.html',
  styleUrl: './home-ru-eighteen.component.scss',
})
export class HomeRuEighteenComponent implements OnInit {
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
      'Психологические риски в трейдинге: как эмоции влияют на торговлю | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Психологические риски на Форекс и методы их контроля. Узнайте, как справиться со страхом, жадностью и стрессом в трейдинге для стабильных результатов.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-09' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/psychorisks.webp',
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
          headline:
            'Психологические риски в трейдинге: как эмоции влияют на торговлю',
          description:
            'Психологические риски на Форекс и методы их контроля. Справьтесь со страхом, жадностью и стрессом для стабильных результатов.',
          image: 'https://arapov.trade/assets/img/content/pcychorisks1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/psychorisks',
          },
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
          name: 'Что такое психологические риски в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Психологические риски — это внутренние факторы, связанные с эмоциональным состоянием трейдера, которые искажают восприятие рынка и мешают принимать рациональные решения. Включают страх, жадность, азарт и стресс.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему эмоции опасны для трейдера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Эмоции действуют на подсознательном уровне, искажая восприятие рыночных данных, нарушая дисциплину и провоцируя решения, противоречащие торговому плану. Это ведёт к финансовым потерям и выгоранию.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как справиться со страхом в торговле?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Используйте стоп-лоссы для автоматического ограничения убытков. Заранее определите приемлемый уровень риска на сделку и строго его придерживайтесь. Это снимает эмоциональную нагрузку при принятии решений.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое FOMO и как с ним бороться?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FOMO (Fear of Missing Out) — страх упустить возможность. Проявляется в погоне за уходящим трендом. Примите философию, что рынок бесконечен и новые возможности появляются ежедневно.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как снизить стресс при торговле?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Делайте регулярные перерывы каждые 1-2 часа. Используйте дыхательные техники и медитацию. Ограничьте время у монитора и следуйте чёткому торговому плану.',
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
      name: 'Как контролировать эмоции в трейдинге',
      description:
        'Пошаговое руководство по управлению психологическими рисками',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Создайте торговый план',
          text: 'Разработайте чёткую стратегию с точками входа, выхода, уровнями риска и сценариями форс-мажоров. План исключает импульсивные решения.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Ограничьте риск на сделку',
          text: 'Рискуйте не более 1-2% депозита на одну сделку. Это создаёт финансовую подушку и снижает эмоциональное давление.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ведите дневник сделок',
          text: 'Записывайте причины входа, эмоции и результат каждой сделки. Анализ помогает выявить паттерны эмоционального поведения.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйте осознанность',
          text: 'Используйте дыхательные техники и медитацию. Метод 4-7-8 помогает снизить уровень стресса перед торговлей.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Анализируйте ошибки',
          text: 'После каждой неудачи проводите разбор: была ошибка технической или эмоциональной? Извлекайте урок и корректируйте поведение.',
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
      name: 'Глоссарий психологии трейдинга',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Психологический риск',
          description:
            'Внутренний фактор, связанный с эмоциями, искажающий торговые решения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'FOMO',
          description:
            'Fear of Missing Out — страх упустить возможность, толкающий на импульсивные сделки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тильт',
          description:
            'Состояние эмоциональной нестабильности после серии убытков',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Переторговка',
          description:
            'Чрезмерное количество сделок, вызванное азартом или желанием отыграться',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Эмоциональный интеллект',
          description:
            'Способность осознавать и контролировать свои эмоции в торговле',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый план',
          description:
            'Документ с правилами входа, выхода и управления рисками',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дисциплина',
          description:
            'Способность следовать торговому плану независимо от эмоций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Выгорание',
          description:
            'Хроническое истощение от постоянного стресса в торговле',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Самоуверенность',
          description:
            'Переоценка своих способностей после серии успешных сделок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Осознанность',
          description:
            'Практика присутствия в моменте для контроля эмоциональных реакций',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
