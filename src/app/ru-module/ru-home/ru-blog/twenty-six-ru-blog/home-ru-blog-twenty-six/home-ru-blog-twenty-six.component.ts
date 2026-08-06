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
  selector: 'app-home-ru-blog-twenty-six',
  templateUrl: './home-ru-blog-twenty-six.component.html',
  styleUrl: './home-ru-blog-twenty-six.component.scss',
})
export class HomeRuBlogTwentySixComponent implements OnInit {
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
        'Как эмоции влияют на трейдинг: страх, жадность, FOMO и тильт. Когнитивные искажения и техники, которые помогают торговать по системе.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });

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
            'Психология трейдинга: почему она важнее стратегии и как держать эмоции под контролем',
          description:
            'Как эмоции влияют на трейдинг: страх, жадность, FOMO и тильт. Когнитивные искажения и техники, которые помогают торговать по системе.',
          author: { '@id': 'https://arapov.trade/#person' },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2026-06-25T00:00:00Z',
          dateModified: '2026-06-25T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/trading-psychology',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/emotionsaffect.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Психология трейдинга',
          keywords:
            'психология трейдинга, страх, жадность, FOMO, тильт, когнитивные искажения, дисциплина',
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
      '@id': 'https://arapov.trade/#person',
      name: 'Igor Arapov',
      alternateName: [
        'Ігор Арапов',
        'Игорь Арапов',
        'Арапов Игорь',
        'Арапов Ігор',
        'Arapov Igor',
        'I. Arapov',
        'І. В. Арапов',
      ],
      url: 'https://arapov.trade/',
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
          name: 'Психология в трейдинге действительно важнее стратегии?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, потому что даже технически грамотный трейдер теряет деньги, если исполняет сделки на эмоциях. Рынок нейтрален, а проигрывают чаще всего в собственной голове: страх, жадность и спешка ломают любую систему. Поэтому работа с психологией это не мягкая необязательная тема, а добрая половина результата.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как страх и жадность влияют на трейдера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Страх заставляет рано выходить из прибыли и держать убыток в надежде на возврат. Жадность зеркально толкает передерживать позицию и рисковать лишним. Они работают в паре и качают трейдера из крайности в крайность, а после болезненного убытка нередко приходит тильт и желание отыграться.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое FOMO и почему из-за него покупают на максимумах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'FOMO это страх упустить прибыль, когда цена быстро идёт без вас. Он включается, когда движение уже почти закончилось и о нём написали все, поэтому новичок входит на самом верху, а профессиональные деньги в этот момент фиксируют прибыль и отдают её опоздавшим.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое тильт и чем он опасен?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тильт это состояние, когда после болезненного убытка трейдер теряет контроль и начинает мстить рынку, открывая сделки одну за другой, лишь бы быстро отыграться. Именно так сливают депозит за один вечер. Лучшая защита это пауза после убытка и жёсткий лимит сделок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как убрать эмоции из торговли?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Эмоции не победить в моменте, их выносят за скобки заранее торговым планом: входы, выходы, стоп и риск прописаны до открытия терминала. Стоп убирает мучительную надежду, маленький риск снижает страх, а журнал и пауза после убытка не дают сорваться в отыгрыш.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как побороть страх перед входом в сделку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Страх входа почти всегда про слишком большой риск. Уменьшите долю счёта на сделку до такой, при которой убыток не страшен, и заранее пропишите точку входа, стоп и цель, чтобы решение принимал план, а не эмоция в моменте. Когда цена потери для вас мала и сценарий задан заранее, рука перестаёт дрожать над кнопкой, а отработка сделок на демосчёте добавляет спокойствия через привычку.',
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
      '@id': 'https://arapov.trade/ru/freestudying/trading-psychology#howto',
      name: 'Как работать с психологией в трейдинге',
      description:
        'Пошаговый разбор главных психологических ловушек трейдера и того, что им противопоставить',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Примите, что результат решается в голове, а не на графике',
          text: 'Рынок нейтрален, и один и тот же график один трейдер торгует как казино, а другой как бизнес.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Научитесь видеть страх, жадность и эйфорию в своих решениях',
          text: 'Страх потерь устроен так, что боль от убытка ощущается сильнее, чем радость от равной прибыли.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Распознавайте FOMO и не входите на максимумах',
          text: 'FOMO включается ровно тогда, когда движение уже почти закончилось и в рынок прибежали последние.',
        },
        {
          '@type': 'HowToStep',
          name: 'Поймите, как толпа отдаёт деньги крупному капиталу',
          text: 'Рынок переносит деньги от эмоциональной толпы к холодному капиталу: толпа продаёт в страхе на дне в фазе накопления и покупает в эйфории на верхах в фазе распределения, а крупный капитал стоит на другой стороне её эмоций.',
          position: 4,
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Замечайте когнитивные искажения вместо борьбы с ними силой воли',
          text: 'Когнитивные искажения это встроенные шаблоны мышления, которые на рынке подсовывают удобную картину вместо холодной оценки.',
        },
        {
          '@type': 'HowToStep',
          name: 'Переживайте просадку и серию без отыгрыша',
          text: 'Убыточная серия это нормальная статистика прибыльной системы, а не поломка; держите малый риск на сделку, чтобы просадка не выбивала вас эмоционально, и ведите журнал, отделяя плохое решение от невезучего исхода.',
          position: 6,
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Вынесите эмоции за скобки планом, стопом и журналом',
          text: 'Эмоции нельзя победить в моменте, их нужно вынести за скобки заранее торговым планом.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Пройдите путь от азарта к дисциплине осознанно',
          text: 'Психология проходит стадии от беспечности новичка через страх и поиск грааля к зрелости, где сделка это строчка в журнале; путь нельзя перепрыгнуть, можно лишь сократить, меняя подход к решениям, а не ища волшебный индикатор.',
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
      name: 'Глоссарий терминов статьи',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'FOMO',
          description:
            'Страх упущенной выгоды: острая тревога при мысли о пропущенной возможности заработать, толкающая входить в рынок на эмоциях.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'тильт',
          description:
            'Состояние, в котором после болезненного убытка трейдер теряет контроль и начинает мстить рынку серией сделок, чтобы быстро отыграться.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Когнитивные искажения',
          description:
            'Систематические ошибки мышления, из-за которых трейдер оценивает рынок и свои сделки необъективно и принимает иррациональные решения.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговая дисциплина',
          description:
            'Привычка действовать строго по заранее прописанным правилам входа, выхода и риска, а не по сиюминутным чувствам.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Неприятие потерь',
          description:
            'Когнитивное искажение, при котором боль убытка переживается сильнее радости от равной прибыли, из-за чего трейдер режет прибыль рано, а убыток держит до последнего.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description:
            'Временное снижение торгового счёта после череды убыточных сделок; у прибыльной на дистанции стратегии убыточные серии статистически нормальны и не означают поломку метода.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
