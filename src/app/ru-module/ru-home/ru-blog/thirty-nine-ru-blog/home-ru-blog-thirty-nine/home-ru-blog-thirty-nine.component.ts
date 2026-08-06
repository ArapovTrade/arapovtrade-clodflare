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
  selector: 'app-home-ru-blog-thirty-nine',
  templateUrl: './home-ru-blog-thirty-nine.component.html',
  styleUrl: './home-ru-blog-thirty-nine.component.scss',
})
export class HomeRuBlogThirtyNineComponent implements OnInit {
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
    this.titleService.setTitle('Управление рисками в трейдинге | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Управление рисками и капиталом: размер позиции, риск на сделку, стоп-лосс и почему именно риск-менеджмент сохраняет депозит на дистанции.',
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
            'Риск-менеджмент в трейдинге: как сохранить капитал и не слить депозит',
          description:
            'Управление рисками и капиталом: размер позиции, риск на сделку, стоп-лосс и почему именно риск-менеджмент сохраняет депозит на дистанции.',
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
            '@id': 'https://arapov.trade/ru/freestudying/risk-management',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/capitalmanagement.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Риск-менеджмент',
          keywords:
            'риск-менеджмент, управление капиталом, размер позиции, лот, стоп-лосс, соотношение риск/прибыль, математическое ожидание, просадка, сложный процент',
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
          name: 'Что такое риск-менеджмент в трейдинге простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это правила, которые говорят, сколько ставить в сделку и где из неё выходить, чтобы серия убытков не обнулила счёт. У него две половины: риск-менеджмент бережёт депозит через малый риск и стоп, а мани-менеджмент его наращивает через расчёт объёма и работу с прибылью.',
          },
        },
        {
          '@type': 'Question',
          name: 'Сколько процентов депозита можно рисковать в одной сделке?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Один-два процента депозита на сделку. Причина в дисперсии: убытки идут сериями по пять-десять подряд даже у прибыльной системы. При риске 1-2% такая полоса лишь царапает счёт, а при 10% обнуляет его целиком.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как рассчитать размер позиции и лот под риск?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'От риска и стопа, а не наугад. Сначала задайте допустимый убыток на сделку, поставьте стоп по уровню и измерьте расстояние до него в пунктах. Денежный риск разделите на стоп в пунктах и цену пункта: двести долларов риска при стопе пятьдесят пунктов дают 0,4 лота. Лот считается последним.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему соотношение 1:2 считается минимумом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Потому что при 1:2 достаточно выигрывать около трети сделок, чтобы держаться в плюсе, и это посильно. При 1:1 пришлось бы стабильно брать больше половины, а это почти никому не удаётся. При 1:3 хватает и четверти удачных сделок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Зачем нужен стоп-лосс, если он фиксирует убыток?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп это не потеря, а плата за право остаться в игре. Маленький заранее принятый минус всегда дешевле одной затянувшейся убыточной позиции, которая съедает месяцы работы. Поэтому стоп ставят сразу при входе и не двигают в сторону убытка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что важнее: точный вход или защита капитала?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В моём подходе защита капитала. Из-за дисперсии убытки идут полосами, и при большом риске даже хорошая система сгорает раньше, чем отыграет своё. Грамотное управление риском держит счёт надёжнее, чем меткость отдельного входа.',
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
      '@id': 'https://arapov.trade/ru/freestudying/risk-management#howto',
      name: 'Как выстроить риск-менеджмент и управление капиталом',
      description:
        'Пошаговый разбор управления капиталом: от выбора риска на сделку до расчёта объёма, стопа, соотношения и математического ожидания системы',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Разберитесь, из чего складывается управление капиталом',
          text: 'Управление капиталом это набор правил, которые определяют долю счёта в каждой сделке и берегут депозит от потерь.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Поймите, почему теряет большинство',
          text: 'Депозит чаще всего убивает завышенный риск без системы на фоне отрицательного математического ожидания рынка.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Держите риск один-два процента на сделку',
          text: 'Риск один-два процента депозита на сделку выбирают не из осторожности, а из-за дисперсии.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Рассчитайте объём позиции и лот от риска и стопа',
          text: 'Объём позиции не угадывают, его выводят из денежного риска и расстояния до стопа.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ставьте стоп-лосс сразу при входе',
          text: 'Стоп это не потеря, а заранее оплаченное право остаться в игре.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Закладывайте соотношение риск/прибыль от 1:2 и проверяйте матожидание',
          text: 'Соотношение риск/прибыль это рычаг, которым вы выводите математическое ожидание из минуса в плюс.',
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
          name: 'Управление капиталом',
          description:
            'Это набор правил, которые определяют долю счёта в каждой сделке и берегут депозит от потерь.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дисперсия',
          description:
            'Это неравномерность, с которой убыточные сделки распределяются во времени: они идут не по одной, а сериями.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лот',
          description:
            'Это стандартизированная единица объёма сделки, которая задаёт, каким количеством актива вы торгуете в одной позиции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Соотношение риск/прибыль',
          description:
            'Это отношение того, чем вы рискуете в сделке, к тому, что рассчитываете на ней заработать.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Математическое ожидание',
          description:
            'Это средний результат одной сделки на длинной дистанции.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сложный процент',
          description:
            'Это начисление дохода не только на вложенный капитал, но и на уже накопленную прибыль.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
