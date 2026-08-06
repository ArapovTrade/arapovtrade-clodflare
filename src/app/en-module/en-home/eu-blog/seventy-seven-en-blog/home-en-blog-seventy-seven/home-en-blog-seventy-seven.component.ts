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
  selector: 'app-home-en-blog-seventy-seven',
  templateUrl: './home-en-blog-seventy-seven.component.html',
  styleUrl: './home-en-blog-seventy-seven.component.scss',
})
export class HomeEnBlogSeventySevenComponent {
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
    this.ukrGroups = this.artickleServ.getEnglishGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Trading Psychology: How to Control Emotions | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Trading psychology: how to control emotions, overcome fear and greed. Practical methods for developing discipline and emotional resilience for consistent trading.',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-18' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/emotionsaffect.webp',
    });
    this.meta.updateTag({
      name: 'headline',
      content: 'Trading Psychology: How Emotions Affect Your Trades?',
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
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline:
            'Trading Psychology: How to Control Emotions and Protect Your Capital',
          description:
            'Complete guide to controlling emotions in trading. How to overcome fear of loss, manage greed, and develop psychological resilience for consistent trading performance.',
          author: {
            '@id': 'https://arapov.trade/en#person',
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
            '@id': 'https://arapov.trade/en/freestudying/emotionsaffect',
          },
          articleSection: 'Trading Education',
          wordCount: 1551,
          inLanguage: 'en',
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
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why do emotions prevent profitable trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Emotions activate primitive brain responses that helped our ancestors survive but harm trading performance. Fear causes premature position exits or trade avoidance, while greed leads to excessive risks and holding positions too long.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I overcome fear of loss in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To overcome loss fear: establish risk management rules limiting risk to 1-2% per trade, maintain a trading journal for emotion analysis, accept that losses are a natural part of trading, and evaluate results over extended periods rather than individual trades.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a trading plan and why is it important?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A trading plan is a document containing rules for entries, exits, risk management, and position sizing. It eliminates the need for decisions under emotional pressure by allowing traders to follow predetermined instructions.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I develop trading discipline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Developing discipline requires gradual work: start with simple rules (no trading in the first hour after waking, limit daily trade count), maintain a trade journal, strictly honor stop losses, and progressively add new rules.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does meditation help traders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, meditation trains the ability to observe thoughts and emotions without immediate reaction. This skill helps traders maintain calm in critical situations and resist impulsive decisions during market volatility.',
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
      name: 'How to Control Emotions in Trading',
      description:
        'Step-by-step guide to developing emotional control for consistent trading performance in financial markets',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Create a Trading Plan',
          text: 'Develop a document with clear entry and exit rules, position sizing, and loss limits. The plan eliminates decision-making under emotional pressure.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Establish Risk Management Rules',
          text: 'Limit risk per trade to 1-2% of your account. When potential losses are small, emotional pressure decreases significantly.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Maintain a Trading Journal',
          text: 'Record every trade, your emotions during trading, and results. Journal analysis reveals connections between feelings and losses.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Practice Relaxation Techniques',
          text: 'Use breathing exercises, meditation, and physical activity to reduce stress and maintain mental clarity.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Accept Result Uncertainty',
          text: 'Understand that individual trade outcomes are unpredictable. Evaluate your trading by system adherence over large trade samples, not individual results.',
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
      name: 'Trading Psychology Terms',
      description:
        'Glossary of key terms related to trading psychology in financial markets',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Loss Aversion',
          description:
            'A psychological phenomenon where the pain of losing money is felt approximately twice as strongly as the pleasure of gaining the same amount',
        },
        {
          '@type': 'DefinedTerm',
          name: 'FOMO',
          description:
            'Fear of Missing Out — the anxiety of missing a profitable trade that drives traders to enter markets without proper analysis',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Plan',
          description:
            'A document containing rules for entries, exits, risk management, and position sizing that helps avoid emotional decisions',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'A system of capital management rules that limits potential losses and protects accounts from catastrophic drawdowns',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Journal',
          description:
            'Records of all trades including entry reasons, emotional states, and results for subsequent analysis',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trader Euphoria',
          description:
            'A dangerous emotional state following profitable trade series that reduces vigilance and leads to excessive risk-taking',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tilt',
          description:
            'An emotional breakdown state following losses where traders lose control and make chaotic trades',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Self-Discipline',
          description:
            'The ability to follow trading system rules regardless of emotions and desires at any given moment',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Loss',
          description:
            'A protective order that automatically closes a position when a predetermined loss level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Overtrading',
          description:
            'Excessively frequent trading, often driven by emotions, leading to exhaustion and increased commissions',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
