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
  selector: 'app-home-uk-blog-onehundred-twentythree',
  templateUrl: './home-uk-blog-onehundred-twentythree.component.html',
  styleUrl: './home-uk-blog-onehundred-twentythree.component.scss'
})
export class HomeUkBlogOnehundredTwentythreeComponent {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle('Кері-трейд: що це і як заробляють на ставках');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке стратегія кері-трейд, як заробляють на різниці процентних ставок між валютами і який ризик розвертає таку угоду проти вас.',
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
    { title: 'Книги з трейдингу', link: 'https://arapov.trade/uk/books' },
    { title: 'Професійні курси', link: 'https://arapov.trade/uk/studying' },
    {
      title: 'Базовий курс',
      link: 'https://arapov.trade/uk/freestudying/freeeducation',
    },
    
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/uk/freestudying'], {
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
      article.groupsUkr.forEach((group) => {
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
        () => Math.random() - 0.5
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      (a) => a.linkUkr == path
    );

    if (this.artickleServ.ukrArtickles.length - 1 == index) {
      nextpage = this.artickleServ.ukrArtickles[0].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index + 1].linkUkr;
    }

    this.router.navigate(['/uk/freestudying', nextpage]);
  }

  goToPreviousPage() {
    let nextpage: any;
    const path: string =
      this.router.url.split('/')[this.router.url.split('/').length - 1];
    let index = this.artickleServ.ukrArtickles.findIndex(
      (a) => a.linkUkr == path
    );

    if (index == 1) {
      nextpage =
        this.artickleServ.ukrArtickles[
          this.artickleServ.ukrArtickles.length - 1
        ].linkUkr;
    } else {
      nextpage = this.artickleServ.ukrArtickles[index - 1].linkUkr;
    }

    this.router.navigate(['/uk/freestudying', nextpage]);
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
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const content = JSON.parse(script.textContent || '');
        const schemaType = Array.isArray(content['@graph'])
          ? content['@graph'][0]?.['@type']
          : content['@type'];

        const shouldRemove = typesToRemove.some(
          (type) =>
            schemaType === type ||
            (Array.isArray(schemaType) && schemaType.includes(type))
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
      "headline": "Керрі-трейд: що це і як заробляють на різниці ставок",
      "description": "Що таке стратегія кері-трейд, як заробляють на різниці процентних ставок між валютами і який ризик розвертає таку угоду проти вас.",
      "author": {
        "@id": "https://arapov.trade/uk#person"
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
        "@id": "https://arapov.trade/uk/freestudying/carrytrade"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://arapov.trade/assets/img/content/carrytrade.jpeg",
        "width": 1200,
        "height": 630
      },
      "articleSection": "Форекс",
      "keywords": "керрі-трейд, форекс",
      "inLanguage": "uk"
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
      '@id': 'https://arapov.trade/uk#person',
      name: 'Ігор Арапов',
      alternateName: [
        'Igor Arapov',
              'Арапов Игорь',
              'I. Arapov',
              'Игорь Арапов',
              'І. В. Арапов',
              'Арапов Ігор',
              'Arapov Igor',
      ],
      url: 'https://arapov.trade/uk',
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
       jobTitle: ['Незалежний дослідник', 'трейдер', 'автор і засновник arapov.trade'],
      description:
        'Незалежний дослідник, практикуючий трейдер, автор книг з трейдингу та наукових публікацій. Спеціалізується на психології трейдингу та когнітивних упередженнях на фінансових ринках.',
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
      "name": "Що таке керрі-трейд простими словами?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Це заробіток на різниці процентних ставок: ти позичаєш у валюті з низькою ставкою і вкладаєш у валюту з високою, отримуючи різницю як дохід. На форексі його нараховують через своп за утримання позиції."
      }
    },
    {
      "@type": "Question",
      "name": "Керрі-трейд це пасивний дохід?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ні. Це позиція з плечем і постійним валютним ризиком. Дохід від ставки збирається повільно, а різкий рух курсу проти позиції здатен стерти його за день. Це ставка на стабільність курсу, а не рента."
      }
    },
    {
      "@type": "Question",
      "name": "Чому керрі-трейд іде з плечем?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Бо різниця ставок мала, і без плеча дохід виходить надто скромним. Плече збільшує його, та разом з ним росте й ризик: збиток за курсом теж множиться на те саме плече."
      }
    },
    {
      "@type": "Question",
      "name": "Чи підходить керрі-трейд новачку?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "З мого досвіду ні. За виглядом спокійного доходу ховається ставка на стабільність курсу, яку ринок регулярно ламає. Головний ризик тут не ставка, а різкий рух курсу, здатний обнулити накопичене."
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
  "@id": "https://arapov.trade/uk/freestudying/carrytrade#howto",
  "name": "Як розібратися та застосувати: Керрі-трейд",
  "description": "Покроковий розбір теми та її практичне застосування в торгівлі",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Розберіться, що таке керрі-трейд простими словами",
      "text": "Керрі-трейд — це стратегія, у якій трейдер позичає кошти у валюті з низькою процентною ставкою і вкладає їх у валюту або актив із високою ставкою, заробляючи на різниці між цими ставками."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Дізнайтеся, як працює керрі-трейд: позичити дешево, вкласти дорого",
      "text": "На практиці весь прибуток керрі-трейду складається з двох частин, і їх варто тримати окремо."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Ризики керрі-трейду: чому це не пасивний дохід",
      "text": "Головний ризик керрі-трейду в тому, що валютний курс перекреслює всю його математику за одну мить."
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
  "name": "Глосарій термінів статті",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "Керрі-трейд",
      "description": "Це стратегія, у якій трейдер позичає кошти у валюті з низькою процентною ставкою і вкладає їх у валюту або актив із високою ставкою, заробляючи на різниці між цими ставками."
    }
  ]
    };

    this.addJsonLdSchema(data);
  }
}
