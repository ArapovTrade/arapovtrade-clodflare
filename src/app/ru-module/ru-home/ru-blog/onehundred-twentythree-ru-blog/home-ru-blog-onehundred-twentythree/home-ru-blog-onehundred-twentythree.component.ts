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
  selector: 'app-home-ru-blog-onehundred-twentythree',
  templateUrl: './home-ru-blog-onehundred-twentythree.component.html',
  styleUrl: './home-ru-blog-onehundred-twentythree.component.scss'
})
export class HomeRuBlogOnehundredTwentythreeComponent {
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
      'Кэрри-трейд: что это и как зарабатывают на ставках',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое стратегия кэрри-трейд, как зарабатывают на разнице процентных ставок между валютами и какой риск разворачивает такую сделку против вас.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2026-06-16' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-16' });
   

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
     "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Кэрри-трейд: что это и как зарабатывают на разнице ставок",
      "description": "Что такое стратегия кэрри-трейд, как зарабатывают на разнице процентных ставок между валютами и какой риск разворачивает такую сделку против вас.",
      "author": {
        "@id": "https://arapov.trade/ru#person"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ArapovTrade",
        "url": "https://arapov.trade",
        "logo": {
          "@type": "ImageObject",
          "url": "https://arapov.trade/assets/img/favicon.ico"
        }
      },
      "datePublished": "2026-06-16T00:00:00Z",
      "dateModified": "2026-06-16T00:00:00Z",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://arapov.trade/ru/freestudying/carrytrade"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://arapov.trade/assets/img/content/carrytrade.jpeg",
        "width": 1200,
        "height": 630
      },
      "articleSection": "Форекс",
      "keywords": "кэрри-трейд, форекс",
      "inLanguage": "ru"
    }
  ]
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
      "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Что такое кэрри-трейд простыми словами?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Это заработок на разнице процентных ставок: вы занимаете в валюте с низкой ставкой и вкладываете в валюту с высокой, получая разницу как доход. На форексе он начисляется через своп за удержание позиции."
      }
    },
    {
      "@type": "Question",
      "name": "Кэрри-трейд это пассивный доход?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Нет. Это сделка с плечом и постоянным валютным риском. Доход от ставки копится медленно, а резкое движение курса против позиции способно стереть его за один день. Это ставка на стабильность курса, а не рента."
      }
    },
    {
      "@type": "Question",
      "name": "Почему кэрри-трейд идёт с плечом?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Потому что разница ставок мала, и без плеча доход получается слишком скромным. Плечо увеличивает его, но вместе с ним растёт и риск: убыток по курсу тоже умножается на то же плечо."
      }
    },
    {
      "@type": "Question",
      "name": "Подходит ли кэрри-трейд новичку?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "По моему опыту нет. За видимостью спокойного дохода скрывается ставка на стабильность курса, которую рынок регулярно ломает. Главный риск тут не ставка, а резкое движение курса, способное обнулить накопленное."
      }
    }
  ]
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  HOWTO
  // ============================================================
  private setHowToSchema(): void {
    const data = {
       "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": "https://arapov.trade/ru/freestudying/carrytrade#howto",
  "name": "Как разобраться и применять: Кэрри-трейд",
  "description": "Пошаговый разбор темы и её практическое применение в торговле",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Разберитесь, что такое кэрри-трейд простыми словами",
      "text": "Кэрри-трейд — это стратегия, при которой трейдер занимает средства в валюте с низкой процентной ставкой и вкладывает их в валюту или актив с высокой ставкой, зарабатывая на разнице между этими ставками."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Узнайте, как работает кэрри-трейд: занять дёшево, вложить дорого",
      "text": "На практике вся прибыль кэрри-трейда складывается из двух частей, и путать их нельзя."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Риски кэрри-трейда: почему это не пассивный доход",
      "text": "Главный риск кэрри-трейда в том, что валютный курс перечёркивает всю его математику в один момент."
    }
  ]
    };

    this.addJsonLdSchema(data);
  }

  // ============================================================
  //  GLOSSARY
  // ============================================================
  private setGlossarySchema(): void {
    const data = {
      "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Глоссарий терминов статьи",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "Кэрри-трейд",
      "description": "Это стратегия, при которой трейдер занимает средства в валюте с низкой процентной ставкой и вкладывает их в валюту или актив с высокой ставкой, зарабатывая на разнице между этими ставками."
    }
  ]
    };

    this.addJsonLdSchema(data);
  }
}
