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
  selector: 'app-home-ru-blog-seventy-seven',
  templateUrl: './home-ru-blog-seventy-seven.component.html',
  styleUrl: './home-ru-blog-seventy-seven.component.scss',
})
export class HomeRuBlogSeventySevenComponent {
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
      'Психология трейдинга: как контролировать эмоции | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Психология трейдинга: как контролировать эмоции, преодолеть страх и жадность. Практические методы развития дисциплины и эмоциональной устойчивости для стабильной торговли.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/emotionsaffect.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Психология трейдинга: влияние эмоций на сделки | Arapov.trade',
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
            'Психология трейдинга: как контролировать эмоции и не потерять депозит',
          description:
            'Полное руководство по контролю эмоций в трейдинге. Как преодолеть страх потерь, справиться с жадностью и развить психологическую устойчивость для стабильной торговли.',
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
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          image: 'https://arapov.trade/assets/img/content/emotionsaffect1.webp',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/emotionsaffect',
          },
          articleSection: 'Обучение трейдингу',
          wordCount: 1334,
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
          name: 'Почему эмоции мешают зарабатывать на трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Эмоции активируют примитивные реакции мозга, которые были полезны для выживания предков, но вредят на финансовых рынках. Страх заставляет преждевременно закрывать позиции или избегать входов, а жадность приводит к завышенным рискам и удержанию сделок дольше необходимого.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как преодолеть страх потерь в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для преодоления страха потерь необходимо: установить правила риск-менеджмента с риском не более 1-2% на сделку, вести торговый журнал для анализа эмоций, принять что убытки — естественная часть торговли, и оценивать результаты за длительный период, а не по отдельным сделкам.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое торговый план и зачем он нужен?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Торговый план — документ с правилами входа и выхода из сделок, управления рисками и объёмами позиций. Он снимает необходимость принимать решения под давлением эмоций, позволяя трейдеру следовать заранее продуманным инструкциям.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как развить дисциплину в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Развитие дисциплины требует постепенной работы: начните с простых правил (не торговать в первый час после пробуждения, ограничить количество сделок в день), ведите журнал сделок, строго соблюдайте стоп-лоссы и постепенно добавляйте новые правила.',
          },
        },
        {
          '@type': 'Question',
          name: 'Помогает ли медитация трейдерам?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, медитация тренирует способность наблюдать за мыслями и эмоциями без немедленной реакции. Этот навык помогает трейдерам сохранять спокойствие в критических ситуациях и не поддаваться импульсивным решениям при волатильности рынка.',
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
        'Пошаговое руководство по развитию эмоционального контроля для стабильной торговли на финансовых рынках',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Создайте торговый план',
          text: 'Разработайте документ с чёткими правилами входа и выхода из сделок, размером позиций и лимитами убытков. План снимает необходимость принимать решения под давлением эмоций.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Установите правила риск-менеджмента',
          text: 'Ограничьте риск на одну сделку в пределах 1-2% от депозита. Когда потенциальный убыток невелик, эмоциональное давление значительно снижается.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ведите торговый журнал',
          text: 'Записывайте каждую сделку, свои эмоции во время торговли и результаты. Анализ журнала помогает выявить связь между чувствами и убытками.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйте техники расслабления',
          text: 'Используйте дыхательные упражнения, медитацию и физическую активность для снижения стресса и сохранения ясности мышления.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Примите неопределённость результатов',
          text: 'Поймите, что результат каждой отдельной сделки непредсказуем. Оценивайте свою торговлю по соблюдению системы на большой выборке сделок, а не по отдельным результатам.',
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
      name: 'Термины психологии трейдинга',
      description:
        'Глоссарий ключевых терминов, связанных с психологией торговли на финансовых рынках',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Страх потерь',
          description:
            'Психологический феномен, при котором боль от потери денег ощущается примерно в два раза сильнее удовольствия от получения той же суммы',
        },
        {
          '@type': 'DefinedTerm',
          name: 'FOMO',
          description:
            'Fear of Missing Out — синдром упущенной выгоды, страх пропустить выгодную сделку, заставляющий трейдера входить в рынок без анализа',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый план',
          description:
            'Документ с правилами входа и выхода из сделок, управления рисками и объёмами позиций, помогающий избежать эмоциональных решений',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Риск-менеджмент',
          description:
            'Система правил управления капиталом, ограничивающая потенциальные убытки и защищающая депозит от критических потерь',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый журнал',
          description:
            'Записи всех сделок с указанием причин входа, эмоционального состояния и результатов для последующего анализа',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Эйфория трейдера',
          description:
            'Опасное эмоциональное состояние после серии прибыльных сделок, снижающее бдительность и приводящее к завышенным рискам',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тильт',
          description:
            'Состояние эмоционального срыва после убытков, при котором трейдер теряет контроль и совершает хаотичные сделки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Самодисциплина',
          description:
            'Способность следовать правилам торговой системы независимо от эмоций и желаний в конкретный момент',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, автоматически закрывающий позицию при достижении определённого уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Овертрейдинг',
          description:
            'Чрезмерно частая торговля, часто вызванная эмоциями, приводящая к истощению и увеличению комиссий',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
