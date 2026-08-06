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
  selector: 'app-home-eu-blog-fifty-four',
  templateUrl: './home-eu-blog-fifty-four.component.html',
  styleUrl: './home-eu-blog-fifty-four.component.scss',
})
export class HomeEuBlogFiftyFourComponent implements OnInit {
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
    this.titleService.setTitle('Chart Patterns in Trading | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Chart patterns in technical analysis: triangles, flags, head and shoulders, double top. How to spot them and trade the breakouts.',
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
            "Do Chart Patterns Work? What's Real and What's a Coin Flip",
          description:
            'Chart patterns in technical analysis: triangles, flags, head and shoulders, double top. How to spot them and trade the breakouts.',
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
            '@id': 'https://arapov.trade/en/freestudying/chart-patterns',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/keypraicepattern.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Technical analysis',
          keywords:
            'chart patterns, do chart patterns work, head and shoulders, double top, triangle pattern, flag and pennant, cup and handle, 1-2-3 pattern, most reliable chart pattern',
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
        'Independent researcher',
        'Trader',
        'Author and founder of arapov.trade',
      ],
      description:
        'Independent researcher, practising trader, author of trading books and scientific publications. Specialises in trading psychology and cognitive biases in financial markets.',
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
          name: 'Do chart patterns actually work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On its own a pattern fills about as often as it fails, and the naked shape gives no statistical edge over a long run of trades. It starts to mean something only on a strong level and with volume behind the move. The success rates quoted online swing from fifty percent to ninety-something because so much depends on who counted and how, so a pattern is not a profit button.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the most reliable chart pattern?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'There is nothing reliable in the sense of a guarantee, and every naked shape is roughly a coin flip. Of all of them I lean toward the flag, because it rests on clear mechanics: a sharp impulse shows one side is stronger, and a sluggish pullback is a pause rather than a reversal. The 1-2-3 also stands apart, since you can read large-capital accumulation in it, and entering at point three gives the best risk-to-reward.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do chart patterns work only about half the time?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Because the picture itself reverses nothing. The market is moved by participants who saw the picture and acted on it. The whole crowd spots a familiar shape and stacks orders in predictable places, and that is exactly where large capital harvests liquidity: it spikes through the boundary, sweeps stops, and often leaves in the opposite direction. So I watch the level, the false break and the volume, not the shape.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do reversal and continuation patterns differ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Reversal patterns hint that a trend is running out of breath and may flip, and they show up at the end of a move: head and shoulders, double top and double bottom. Continuation patterns say the trend will resume after a pause, and those are the flag, pennant, triangle and cup with handle. Either type is worth reading only together with volume and on a higher timeframe.',
          },
        },
        {
          '@type': 'Question',
          name: 'What should I use instead of chart patterns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volume, levels and the Wyckoff approach. I read what large capital is doing rather than try to guess a drawing: which level holds the liquidity, whether there was a false break, and what volume shows on the breakout and retest. Knowing the pattern is still useful, but as a map of crowd psychology rather than a signal for blind trading, and always with a stop and a small risk per trade.',
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
      '@id': 'https://arapov.trade/en/freestudying/chart-patterns#howto',
      name: 'How to read chart patterns without trading them blind',
      description:
        'A step-by-step approach to price patterns and using them properly through level and volume',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand what a chart pattern is and where it comes from',
          text: 'A chart pattern is a recurring shape the brain finds in the noise of price, but the market is under no obligation to respect it.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Split patterns into reversal and continuation',
          text: 'Reversals catch the end of a trend, continuations catch its pause, and you read either one only with volume and on a higher timeframe.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Study the reversal patterns',
          text: 'Head and shoulders and the double top and bottom are confirmed only by a neckline break on rising volume; before that they are just a sketch.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Study the continuation patterns',
          text: 'Triangle, flag, pennant and the cup with handle show a pause in the trend, and you take the entry after a hold beyond the boundary with volume confirmation.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Use the 1-2-3 to enter behind large capital',
          text: 'On a strong level the 1-2-3 gives an entry at point three with a short stop and the best risk-to-reward ratio.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Trade the context, not the drawing',
          text: 'A naked pattern fills roughly fifty-fifty, so the level, the false break and the volume decide, not the shape, and always with a stop.',
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
      name: 'Glossary of terms used in this article',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Chart pattern',
          description:
            'A recurring shape on a price chart that traders use to anticipate the next move; part of classical technical analysis.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Head and shoulders',
          description:
            'A reversal pattern of three peaks with a higher central peak and a neckline beneath them, whose break is taken as a trend-reversal signal.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Double top',
          description:
            'A reversal pattern at the top of an uptrend where price stalls twice at roughly the same level and fails to break through the second time.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Triangle',
          description:
            'A consolidation pattern between two converging lines, where the swing range and volume fade before price exits with an impulse beyond one boundary.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Flag',
          description:
            'A continuation pattern in which, after a sharp impulse, price drifts into a small channel sloped against the move and then breaks out in the trend direction.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Pennant',
          description:
            'A continuation pattern after an impulse whose consolidation forms a small converging triangle rather than the parallel channel of a flag.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cup and handle',
          description:
            'A bullish continuation pattern where a smooth rounded correction is followed by a short pullback-handle, after which price breaks the prior high upward.',
        },
        {
          '@type': 'DefinedTerm',
          name: '1-2-3 pattern',
          description:
            'A reversal pattern of three points where point 1 marks the old extreme, point 2 is the first pullback, and point 3 is a second pullback that does not breach point 1.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
