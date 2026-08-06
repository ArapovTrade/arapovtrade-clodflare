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
  selector: 'app-home-ru-blog-fourty-three',
  templateUrl: './home-ru-blog-fourty-three.component.html',
  styleUrl: './home-ru-blog-fourty-three.component.scss',
})
export class HomeRuBlogFourtyThreeComponent implements OnInit {
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
      'Торговая система: как построить и оптимизировать | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое торговая система, из чего она состоит, как её собрать, протестировать и оптимизировать, не подгоняя под историю.',
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
          headline: 'Торговая система с нуля: план, бэктест и дневник трейдера',
          description:
            'Что такое торговая система, из чего она состоит, как её собрать, протестировать и оптимизировать, не подгоняя под историю.',
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
            '@id': 'https://arapov.trade/ru/freestudying/trading-system',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tradingsystem.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Торговые системы',
          keywords:
            'торговая система, торговый план, бэктест, дневник трейдера, проверка стратегии, демосчёт, управление риском',
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
          name: 'Что такое торговая система простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это набор заранее заданных правил: когда входить в сделку, когда выходить и каким риском рисковать. Её задача сделать средний результат на дистанции положительным и убрать хаотичные решения на эмоциях. Без системы торговля превращается в орлянку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем торговый план отличается от системы?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Система это сам метод и сигнал входа. План это ваши личные правила вокруг неё: какой риск на сделку, что торгуете, а что пропускаете, когда в рынок лучше вообще не входить. Система отвечает на вопрос как, план на вопрос как именно вы себя ведёте.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как проверить торговую систему перед реальными деньгами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Сначала бэктест на истории, затем проверка вперёд. Прогоните правила по прошлым данным, потом обязательно на новых данных, которых система не видела, на демо или маленьком реальном счёте. Дистанция около сотни сделок показывает реальное преимущество с учётом издержек.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое переоптимизация в бэктесте?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это подгонка параметров стратегии под историю до идеальной кривой. В итоге стратегия описывает прошлое, а не находит рабочее преимущество, и на новых данных рассыпается. Чем точнее она сидит на истории, тем хуже обычно работает дальше.',
          },
        },
        {
          '@type': 'Question',
          name: 'Зачем нужен дневник трейдера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Чтобы видеть свои повторяющиеся ошибки со стороны и убирать их. Память ненадёжна: удачные сделки помнятся, провальные забываются. Дневник убирает этот самообман и показывает реальную статистику, если записывать причину входа и эмоции, а не только результат.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какая торговая система лучше?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В моём опыте самая простая из тех, что дают перевес. Чем больше в системе условий и фильтров, тем труднее ей следовать. Рабочая, но соблюдаемая система всегда бьёт идеальную, но брошенную при первом давлении рынка.',
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
      '@id': 'https://arapov.trade/ru/freestudying/trading-system#howto',
      name: 'Как собрать и проверить торговую систему',
      description:
        'Пошаговый разбор: от понимания, зачем нужна система, до её состава, плана, бэктеста, проверки вперёд и дневника трейдера',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, зачем нужна торговая система',
          text: 'Торговая система это заранее заданные правила входа, выхода и риска, которые делают средний результат на дистанции положительным.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Соберите систему из входа, выхода и управления риском',
          text: 'Рабочая система собирается из условия входа, условий выхода и правил управления риском.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Запишите личные правила в торговый план',
          text: 'Торговый план это письменные личные правила вокруг системы: риск, дисциплина и то, что вы торгуете, а что пропускаете.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проверьте систему бэктестом без подгонки',
          text: 'Бэктест прогоняет правила по прошлой истории, а защита от подгонки это разделение данных на настроечную и проверочную части.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Сделайте проверку вперёд на демо',
          text: 'После бэктеста систему проверяют вперёд на новых данных и около сотни сделок, лучше сначала на демосчёте.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Ведите дневник трейдера и разбирайте ошибки',
          text: 'Дневник трейдера на дистанции вскрывает повторяющиеся ошибки, которые память сама прячет.',
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
          name: 'Торговая система',
          description:
            'Это совокупность заранее заданных правил, которые определяют, при каких условиях открывать и закрывать сделку и сколько при этом рисковать.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговый план',
          description:
            'Это письменный набор правил, по которым вы торгуете: какие инструменты, в каких условиях, где вход, где стоп, где цель и какой риск.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бэктест',
          description:
            'Это проверка торговой стратегии на исторических данных рынка с целью оценить, была ли у неё прибыль в прошлом и насколько стабильно она работала.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дневник трейдера',
          description:
            'Это структурированные записи всех совершённых сделок с указанием причин входа и выхода, результата и эмоционального состояния, которые помогают находить и исправлять повторяющиеся ошибки.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
