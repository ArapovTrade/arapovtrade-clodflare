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
  selector: 'app-home-en-blog-seventy-five',
  templateUrl: './home-en-blog-seventy-five.component.html',
  styleUrl: './home-en-blog-seventy-five.component.scss',
})
export class HomeEnBlogSeventyFiveComponent {
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
      'Trading – a gambling game or a business? Two psychological approaches - Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Is trading gambling or a business? Understanding the psychology of trading, differences between professional and gambling approaches, and how to achieve consistent profits. ',
    });
    this.meta.updateTag({ name: 'author', content: 'Igor Arapov' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-02-17' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/gamblingorbusiness.webp',
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
          headline: 'Trading: Gambling or Serious Business?',
          description:
            'Analysis of two approaches to financial market trading. How to transform trading into a stable income source and avoid gambling mentality traps.',
          image:
            'https://arapov.trade/assets/img/content/gamblingorbusiness.webp',
          author: {
            '@id': 'https://arapov.trade/en#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
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
          name: 'How is trading different from gambling?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In casinos, players cannot influence outcomes — results are determined by chance. In trading, you can manage risks, use analytics, and follow strategies. Professional trading is based on probabilities and systematic approaches, not luck.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do most beginners trade like gamblers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beginners enter markets hoping to get rich quickly. They make decisions based on emotions, ignore risk management, try to recover losses, and lack clear trading plans. This approach turns trading into a lottery.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I turn trading into a business?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Develop a trading strategy, strictly follow risk management, maintain a trading journal, and control emotions. Professional traders focus on long-term capital growth rather than quick speculative gains.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which emotions hurt traders most?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Fear and greed are a trader's two main enemies. Fear causes early exits from profitable trades or avoiding entries. Greed leads to excessive risks and ignoring stop-losses. Emotional control is fundamental to stable trading.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is FOMO in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "FOMO (Fear Of Missing Out) is the fear of missing opportunities. Traders rush to enter markets fearing they'll miss profitable moves, opening unjustified trades without analysis. It's one of the main psychological traps for beginners.",
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
      name: 'How to Turn Trading Into a Profitable Business',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Develop a trading strategy',
          text: 'Create a clear plan with entry and exit rules, asset selection criteria, and capital management principles.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Implement risk management',
          text: 'Define maximum risk per trade (1-2% of account), always use stop-losses, calculate position sizes.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Maintain a trading journal',
          text: 'Record every trade with entry reasons, outcomes, and emotions. Analyze entries to identify mistakes.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Control your emotions',
          text: 'Trade according to plan, resist fear and greed. Take breaks after losing streaks, practice mindfulness.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Focus on long-term results',
          text: "Don't chase quick profits. Aim for stable capital growth through consistent strategy application.",
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
      name: 'Trading Glossary: Business vs Gambling',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'FOMO',
          description:
            'Fear Of Missing Out — the fear of missing opportunities that pushes traders into unjustified market entries',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Plan',
          description:
            'Document containing trade entry and exit rules, asset selection criteria, and risk management principles',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'Capital management system defining maximum risk per trade and deposit protection methods',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Tilt',
          description:
            'Emotional state following losses leading to impulsive decisions and strategy deviation',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Discipline',
          description:
            'Ability to strictly follow trading plan regardless of emotions and market temptations',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Gambling Trading',
          description:
            'Approach to trading based on emotions and intuition instead of analysis and strategy',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Systematic Approach',
          description:
            'Trading methodology based on statistics, probabilities, and strict rule following',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Emotional Control',
          description:
            'Skill of managing fear, greed, and other emotions during trading',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Journal',
          description:
            'Records of all trades with analysis of entry reasons, results, and emotional state',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Long-term Thinking',
          description:
            'Orientation toward stable capital growth instead of quick speculative profits',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
