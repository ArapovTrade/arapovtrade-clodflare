import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-en-blog-onehundred-nineteen',
  templateUrl: './home-en-blog-onehundred-nineteen.component.html',
  styleUrl: './home-en-blog-onehundred-nineteen.component.scss'
})
export class HomeEnBlogOnehundredNineteenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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

    this.ukrGroups = this.artickleServ.getEnglishGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Breakeven: What It Is and When to Move the Stop',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-16' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-16' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'What moving a trade to breakeven means, when shifting the stop to entry protects profit and when it knocks you out of a good position too early.',
    });

    this.gerRandom();
  }
  randomArticleRus: any = [];
  gerRandom() {
    this.randomArticleRus = this.artickleServ.getRandomUkArticles();
  }

  hoveredIndex: number | null = null;

  projects = [
    { title: 'Trading Books', link: 'https://arapov.trade/en/books' },
    { title: 'Professional courses', link: 'https://arapov.trade/en/studying' },
    {
      title: 'Basic course',
      link: 'https://arapov.trade/en/freestudying/freeeducation',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/en/freestudying'], {
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
      article.groupsEng.forEach((group) => {
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

    this.router.navigate(['/en/freestudying', nextpage]);
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

    this.router.navigate(['/en/freestudying', nextpage]);
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
      "headline": "Breakeven in Trading: What It Is and When to Move Your Stop",
      "description": "What moving a trade to breakeven means, when shifting the stop to entry protects profit and when it knocks you out of a good position too early.",
      "author": {
        "@id": "https://arapov.trade/en#person"
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
        "@id": "https://arapov.trade/en/freestudying/breakeven"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://arapov.trade/assets/img/content/breakeven.jpeg",
        "width": 1200,
        "height": 630
      },
      "articleSection": "Risk Management",
      "keywords": "breakeven, risk management",
      "inLanguage": "en"
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
      '@id': 'https://arapov.trade/en#person',
      name: 'Igor Arapov',
      alternateName: [
        'Ігор Арапов',
        'Арапов Игорь',
        'I. Arapov',
        'Игорь Арапов',
        'І. В. Арапов',
        'Арапов Ігор',
        'Arapov Igor',
      ],

      url: 'https://arapov.trade/en',
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
        'Independent researcher,',
        'trader',
        'author and founder of arapov.trade',
      ],
      description:
        'Independent researcher, practicing trader, author of books on trading and scientific publications. Specializes in trading psychology and cognitive biases in financial markets.',
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
      "name": "Breakeven in plain terms, what is it?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Moving the stop-loss to the trade's opening price. After that the position cannot turn negative: at worst it closes flat. In effect you strip the risk out of a winning trade."
      }
    },
    {
      "@type": "Question",
      "name": "When is the right time to move the stop to breakeven?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once price has covered a clear distance your way and held, for instance by breaking a level. By then the trade has confirmed its strength, and there is no reason to give the gain back."
      }
    },
    {
      "@type": "Question",
      "name": "Why does an early breakeven backfire?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A stop pulled to flat too soon catches an ordinary technical pullback and ejects you. Price then walks to the target without you. So in guarding the profit, the trader cuts its source."
      }
    },
    {
      "@type": "Question",
      "name": "Breakeven versus a trailing stop, how do they differ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Breakeven is a one-off move of the stop to entry. A trailing stop keeps following price, tightening the cover as the move extends. They often run together: breakeven first, then trailing."
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
  "@id": "https://arapov.trade/en/freestudying/breakeven#howto",
  "name": "How to Understand and Apply: Breakeven",
  "description": "A step-by-step breakdown of the topic and its practical use in trading",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "What is breakeven (moving your stop to entry)?",
      "text": "Breakeven — moving the stop-loss to the opening price of the position, after which the trade stops carrying any risk of loss and at worst closes flat."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "When to move your stop to breakeven, and when it is too early",
      "text": "The real question with breakeven is not how, but when."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "The upside and the catch of an early breakeven",
      "text": "Breakeven has one upside, but an important one: it turns a trade that is currently in profit into a trade with no risk."
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
  "name": "Article glossary",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "Breakeven",
      "description": "Moving the stop-loss to the opening price of the position, after which the trade stops carrying any risk of loss and at worst closes flat."
    }
  ]
    };

    this.addJsonLdSchema(data);
  }
}
