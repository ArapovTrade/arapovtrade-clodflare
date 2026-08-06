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
  selector: 'app-home-en-blog-ninty-one',
  templateUrl: './home-en-blog-ninty-one.component.html',
  styleUrl: './home-en-blog-ninty-one.component.scss',
})
export class HomeEnBlogNintyOneComponent implements OnInit {
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
      'Tilt in Trading: Causes, Signs and How to Avoid It | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Trading tilt is an emotional state leading to loss of control and account destruction. Learn the causes, signs, and methods to combat trader tilt in forex and crypto markets.',
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
          headline: 'Tilt in Trading: Causes, Signs and Prevention Methods',
          description:
            'Complete guide to trading tilt — the emotional state that destroys discipline and trading accounts. How to recognize and prevent trader tilt.',
          image: 'https://arapov.trade/assets/img/content/tilt1.png',
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
            url: 'https://arapov.trade',
          },
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/en/freestudying/tiltintrading',
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
          name: 'What is tilt in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tilt is an emotional state where traders lose control over their actions and make decisions based on emotions (fear, greed, anger) rather than analysis and strategy. The term originated in poker and refers to loss of composure.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the signs of trading tilt?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Main signs of tilt include: increasing position sizes beyond normal limits, trading against the trend, ignoring stop-losses, exceeding daily trade limits, chaotic entries and exits, and losing confidence in your strategy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is tilt dangerous for traders?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tilt destroys discipline and leads to risk management violations. Traders increase position sizes trying to recover losses, ignore strategy signals, and make impulsive trades. This can result in complete account loss in a short time.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I prevent tilt?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tilt prevention includes: adequate account size, proper sleep and rest, having a clear trading strategy, strict risk management with daily loss limits, and keeping a trading journal to analyze mistakes.',
          },
        },
        {
          '@type': 'Question',
          name: 'What should I do if tilt has already started?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'At the first signs of tilt, immediately stop trading and close your platform. Switch to another activity — exercise, walking, rest. Analyze the causes of the breakdown. Return to trading only after fully restoring emotional balance.',
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
      name: 'How to Deal with Tilt in Trading',
      description:
        'Step-by-step guide to recovering from emotional breakdown and preventing tilt',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Recognize tilt signs',
          text: 'Monitor your emotional state. If you feel irritation, desire to recover losses, or are increasing position sizes — these are tilt signals.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Immediately stop trading',
          text: "At the first signs of tilt, close all positions and exit the platform. Don't try to continue trading hoping to fix the situation.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Shift your focus',
          text: 'Engage in physical activity, take a walk outdoors, or rest. This helps reduce stress levels and restore mental clarity.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Analyze the causes',
          text: 'After recovery, examine what triggered the tilt: losing streak, fatigue, external stress, or euphoria from profits. Record conclusions in your journal.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Return with a plan',
          text: 'Resume trading only when emotions are under control. Start with reduced position sizes and strictly follow risk management rules.',
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
      name: 'Trading Psychology Glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Tilt',
          description:
            'An emotional state of losing control where traders make decisions based on emotions rather than analysis',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Risk Management',
          description:
            'A system of rules for capital management that determines acceptable loss levels and position sizes',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop-Loss',
          description:
            'A protective order for automatic position closure when a specified loss level is reached',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Drawdown',
          description:
            'A decrease in trading capital relative to its peak value, expressed as a percentage',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Overtrading',
          description:
            'Excessive number of trades exceeding normal trading plan, often a sign of tilt',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Journal',
          description:
            'Records of each trading operation for subsequent analysis and error identification',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Trading Discipline',
          description:
            'The ability to follow strategy rules regardless of emotional state',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Euphoria',
          description:
            'An emotional state of excessive confidence after profitable trades, leading to increased risks',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
