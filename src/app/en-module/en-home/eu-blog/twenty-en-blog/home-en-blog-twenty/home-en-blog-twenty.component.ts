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
  selector: 'app-home-en-blog-twenty',
  templateUrl: './home-en-blog-twenty.component.html',
  styleUrl: './home-en-blog-twenty.component.scss',
})
export class HomeEnBlogTwentyComponent implements OnInit {
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
      'Cryptocurrency Storage: Wallets and Security | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'How to safely store cryptocurrency: hot and cold wallets, the seed phrase, hardware wallets and rules for protecting assets from theft.',
    });

    this.meta.updateTag({ name: 'author', content: 'Ihor Arapov' });
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
          headline: 'Storing Crypto Safely: Where to Keep Your Coins in 2026',
          description:
            'How to safely store cryptocurrency: hot and cold wallets, the seed phrase, hardware wallets and rules for protecting assets from theft.',
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
            '@id': 'https://arapov.trade/en/freestudying/crypto-storage',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/cryptostoring44.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Cryptocurrency',
          keywords:
            'crypto storage, cold wallet, hardware wallet, seed phrase, Ledger, Trezor',
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
          name: 'Where is the safest place to store cryptocurrency?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The main capital is safer in a cold wallet with no internet connection, better on a hardware device like Ledger or Trezor. On an exchange it is worth leaving only what you are trading right now, because there the keys do not belong to you.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does a hot wallet differ from a cold one?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A hot wallet is connected to the internet and handy for frequent operations, but because of that link to the network it is vulnerable to hacks and phishing. A cold wallet keeps the keys offline and is protected from remote attacks, but is inconvenient for daily trading.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you photograph the seed phrase?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The seed phrase must live offline only. A photo in the gallery, a screenshot, a note in the cloud, or a message to yourself in a messenger is a direct path to theft, because any such file can leak.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where should you buy a hardware wallet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Only from the official manufacturer or an authorised reseller, never a marketplace listing or a private seller. A counterfeit device can ship with malware or a seed phrase already printed in the box, and funding it hands your coins straight to the scammer. A genuine wallet generates the seed in front of you on first setup; a ready-made phrase is always a trap.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if you lose your seed phrase?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'If you lose the seed phrase and also lose access to the device, the coins are gone for good: there is no support line and no recovery in crypto. That is why the seed is backed up by hand or on metal in two separate offline places. Losing it, not being hacked, is the most common way people lose crypto.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it safe to store cryptocurrency on an exchange?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Only for active trading and small amounts. On an exchange the coins essentially do not belong to you, the venue controls the keys, and it can be hacked or freeze withdrawals, which has happened more than once in the history of crypto.',
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
      '@id': 'https://arapov.trade/en/freestudying/crypto-storage#howto',
      name: 'How to store cryptocurrency safely',
      description:
        'A step-by-step breakdown: which wallet to choose, how to protect the seed phrase, and where to keep the main capital',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand how a hot wallet differs from a cold one',
          text: 'Cryptocurrency wallet is a store not of the coins themselves but of the keys to them, and this is the point beginners miss most often.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Choose a hardware wallet for long storage',
          text: 'Hardware wallet is a small physical device made only for storing keys offline, and the most practical kind of cold storage.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Protect the seed phrase and keep it offline only',
          text: 'Seed phrase is a set of 12 or 24 words by which a wallet is restored on any compatible device.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Set it up safely: buy from the maker, back up on metal, split the funds',
          text: 'Buy the device only from the official manufacturer, back the seed up by hand or on metal in two places, keep about 90 percent in cold and 10 on the exchange, and use multi-signature for large sums.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Separate the exchange and the savings wallet',
          text: 'When coins sit on an exchange, it is the exchange that controls the keys, not you.',
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
      name: 'Article glossary',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'cryptocurrency wallet',
          description:
            'A store not of the coins themselves but of the keys to them; the coins always sit in the blockchain, while the wallet holds the private key that proves they are yours.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'private key',
          description:
            'The secret cryptographic code that proves ownership of coins and authorises moving them; whoever holds it controls the funds, which is why it is kept offline inside a wallet rather than exposed.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'hardware wallet',
          description:
            'A small physical device made only for storing keys offline; the private key never leaves the device, and a transaction is signed inside it.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'seed phrase',
          description:
            'A set of 12 or 24 words that fully restores access to a wallet on any compatible device; it is money in text form.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
