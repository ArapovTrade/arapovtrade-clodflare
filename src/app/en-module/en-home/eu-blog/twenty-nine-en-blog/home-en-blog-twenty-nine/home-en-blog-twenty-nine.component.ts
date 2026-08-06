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
  selector: 'app-home-en-blog-twenty-nine',
  templateUrl: './home-en-blog-twenty-nine.component.html',
  styleUrl: './home-en-blog-twenty-nine.component.scss',
})
export class HomeEnBlogTwentyNineComponent implements OnInit {
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
      'Bonds: Coupon, Face Value, Yield | Arapov.trade',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'What bonds are in simple terms, how coupon, face value and yield work, what types exist and how reliable they are for an investor.',
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
          headline: 'What Bonds Are in Simple Terms: Coupon, Face Value, Yield',
          description:
            'What bonds are in simple terms, how coupon, face value and yield work, what types exist and how reliable they are for an investor.',
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
            '@id': 'https://arapov.trade/en/freestudying/bonds-guide',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/bonds-guide.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Fundamental Analysis',
          keywords: 'bonds, coupon, face value, bond yield',
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
          name: 'What are bonds in simple terms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A debt security: by buying it, you lend money to a company or a state at interest. The issuer undertakes to return the face value by the maturity date and to pay coupons along the way.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do bonds differ from shares?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A share is a stake in a business and a right to part of the profit, while a bond is a debt with fixed terms. The holder of a bond is a creditor, not a co-owner, and the income on it is known in advance.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are a coupon and a face value?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Face value is the sum the issuer will return at the maturity date. The coupon is the percent it pays for the use of your money, usually once every half-year or year.',
          },
        },
        {
          '@type': 'Question',
          name: "What's the difference between the coupon rate and the yield?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "The coupon rate is a fixed percent of the face value, set at issue and unchanged. Yield is measured against the price you actually paid: current yield divides the coupon by today's price, and yield to maturity adds the gap between your price and the face value returned at the end. Compare bonds by yield to maturity, not by the coupon.",
          },
        },
        {
          '@type': 'Question',
          name: 'Are bonds reliable?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Government bonds are considered among the most reliable, corporate ones are riskier. But reliable does not mean risk-free: the risk of the issuer's default and the risk of a price fall when rates rise remain.",
          },
        },
        {
          '@type': 'Question',
          name: 'Should a trader buy bonds?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "For a retail trader, buying individual bonds for the coupon is an investor's job rather than a trade. But bond yields are worth watching as a macro signal: they track the central-bank rate, which drives the dollar and through it the risk assets a trader actually deals in.",
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
      '@id': 'https://arapov.trade/en/freestudying/bonds-guide#howto',
      name: 'How to understand and apply: bonds',
      description:
        'A step-by-step breakdown of the topic and its practical application in trading',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Understand what a bond is',
          text: 'A bond is a debt security on which the issuer borrows money from an investor and undertakes to return the face value by the maturity date, paying coupons.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Grasp the key parameters',
          text: 'A bond has a face value, a coupon, a maturity date, and a yield, and its market price is inversely linked to the central bank rate.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Tell the coupon apart from the yield',
          text: 'The coupon rate is a fixed percent of face value, while yield is measured against the price you paid; compare bonds by yield to maturity, not by the coupon.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Tell apart the types and risks',
          text: "Government bonds are more reliable, corporate ones more profitable, zero-coupon and callable issues change the math; the main risks are the issuer's default and a rate change.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Read yields as a macro signal',
          text: 'Bond yields track the central-bank rate, which moves the dollar and through it risk assets, so the curve works as a barometer of risk-on versus risk-off.',
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
          name: 'Yield to maturity',
          description:
            'The full yield of a bond accounting for coupons and the gap between purchase price and face value at maturity; the main metric for comparing issues.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Duration',
          description:
            'The average period over which a bond investment pays back through coupons and redemption, and a measure of the price sensitivity to interest-rate changes.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bond',
          description:
            'A debt security on which the issuer borrows money from an investor and undertakes to return the face value by the maturity date, paying interest in the form of coupons along the way.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Coupon rate',
          description:
            'The fixed annual interest a bond pays as a percent of its face value, set at issue and unchanged for the life of the security, regardless of its market price.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
