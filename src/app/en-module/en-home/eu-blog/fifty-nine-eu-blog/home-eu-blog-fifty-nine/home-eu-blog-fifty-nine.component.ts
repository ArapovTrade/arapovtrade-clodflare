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
  selector: 'app-home-eu-blog-fifty-nine',
  templateUrl: './home-eu-blog-fifty-nine.component.html',
  styleUrl: './home-eu-blog-fifty-nine.component.scss',
})
export class HomeEuBlogFiftyNineComponent implements OnInit {
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
      'Neural Networks and AI in Trading: What They Can Do | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'What neural networks really can do on the market, what is beyond them, why AI does not predict the future and how to use it as a tool, not an oracle.',
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
            'AI in Trading and Price Prediction: What Neural Networks Can Do and Where Their Limit Is',
          description:
            'What neural networks really can do on the market, what is beyond them, why AI does not predict the future and how to use it as a tool, not an oracle.',
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
            '@id': 'https://arapov.trade/en/freestudying/ai-in-trading',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ai-trading.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'AI in trading',
          keywords:
            'AI in trading, price prediction, neural network, machine learning, overfitting, expected value, probability, Wyckoff',
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
          name: 'Can a neural network predict the price of a stock or bitcoin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Reliably no, and that applies to a neural network and a human alike. AI catches patterns in past data well and hands out probable scenarios, but as the horizon lengthens its accuracy falls, and already over a month to three it drops below half, that is to random guessing. A price changes when the crowd's expectations and big capital's actions change, not on a schedule you can compute in advance.",
          },
        },
        {
          '@type': 'Question',
          name: 'What is AI in trading in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It's the use of neural networks and machine learning to dissect the market: grind through data, find patterns and assemble probable scenarios. In practice it's most often chat services and analytical models whose job is to help you think, not to press buttons for you. Such services usually take on neither the trades nor account management.",
          },
        },
        {
          '@type': 'Question',
          name: 'What can a neural network really do in trading?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Its strength is not in predicting the market but in working with your own history. Give it a trade journal, and in a minute you'll get a picture of where and when you lose more often and at which moments discipline breaks down. It will also filter out the illiquid, stress-test a strategy's logic and point at its weak spots. But all of that reflects your past, not a glimpse of the future, and it promises no profit.",
          },
        },
        {
          '@type': 'Question',
          name: 'Will AI replace the trader and their method?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "No. A neural network's knowledge is drawn from the past, while the market is endlessly recut by fresh participants, news and the crowd's mood, so a model goes stale, and a sophisticated one also clings to history through overfitting. Its place is a helper on top of your system, not in its place. Where to enter, where to set a stop and what risk to run are decided by method and discipline, not a model's answer.",
          },
        },
        {
          '@type': 'Question',
          name: "How to earn if the price can't be predicted?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Through a positive expected value, not through guessing every trade. At a risk-to-reward ratio of one to three, the system stays in the black even at forty percent profitable trades. About a third of trades are inevitably losing, and losses come in streaks, so the risk per trade is kept tiny, around one to two percent, and always with a stop.',
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
      '@id': 'https://arapov.trade/en/freestudying/ai-in-trading#howto',
      name: 'How to understand AI in trading',
      description:
        "A step-by-step look at what AI in trading is, why an exact price forecast doesn't exist, and how to earn with probability and expected value",
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand what AI in trading is',
          text: "AI in trading is an analyst in a dialogue format that sifts data and hands you probable scenarios, but doesn't execute the trade or manage the account.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: "Accept that there's no exact price forecast",
          text: "Neither AI nor a human predicts an exact price; over a month to three a model's accuracy falls to random, because price is moved by the crowd's expectations and big capital.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Use AI as a mirror of your trading',
          text: "Load your trade journal and AI shows when and on what you lose more often; it's a mirror of the past, not a forecast, and overfitting makes a model work worse in the present the tighter it's fitted to history.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Keep AI an assistant on top of your system',
          text: "The entry, the stop and a one-to-two-percent risk are decided by your method on volume and levels, not by a model's prompt; AI doesn't hold discipline for you.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Earn on probability and expected value',
          text: 'Read volume and big capital by Wyckoff: at 1 to 3 the system is in the black even at forty percent wins, losses come in streaks, so the risk per trade is tiny and always with a stop.',
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
      name: 'Glossary of terms used in the article',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'AI in trading',
          description:
            'The use of neural networks and machine learning to analyse the market: processing data, finding patterns and preparing probable scenarios; in practice usually chat services and analytical models that help a trader think rather than trade for them.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Overfitting',
          description:
            'When a model retells the past all the more precisely the more helplessly it responds to the present, so a system polished to the history seizes up the moment the market changes its behaviour.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
