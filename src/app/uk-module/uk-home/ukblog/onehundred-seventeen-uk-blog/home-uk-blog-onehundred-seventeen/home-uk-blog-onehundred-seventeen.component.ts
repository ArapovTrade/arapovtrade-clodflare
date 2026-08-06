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
  selector: 'app-home-uk-blog-onehundred-seventeen',
  templateUrl: './home-uk-blog-onehundred-seventeen.component.html',
  styleUrl: './home-uk-blog-onehundred-seventeen.component.scss',
})
export class HomeUkBlogOnehundredSeventeenComponent {
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

    this.ukrGroups = this.artickleServ.getUkrainianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;
    this.titleService.setTitle(
      'Що таке облігації простими словами: купон, номінал, дохідність',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке облігації, як вони працюють, що таке номінал, купон і дохідність, які бувають види облігацій і наскільки вони надійні для інвестора.',
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

    this.router.navigate(['/uk/freestudying', nextpage]);
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
      'script[type="application/ld+json"]',
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
            (Array.isArray(schemaType) && schemaType.includes(type)),
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
      "headline": "Що таке облігації простими словами: купон, номінал, дохідність",
      "description": "Що таке облігації, як вони працюють, що таке номінал, купон і дохідність, які бувають види облігацій і наскільки вони надійні для інвестора.",
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
        "@id": "https://arapov.trade/uk/freestudying/bonds-coupon-yield"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://arapov.trade/assets/img/content/bonds-coupon-yield.jpeg",
        "width": 1200,
        "height": 630
      },
      "articleSection": "Фундаментальний аналіз",
      "keywords": "облігації, купон, номінал, дохідність облігацій",
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
        'https://t.me/ArapovTrade',
      ],
      jobTitle: [
        'Незалежний дослідник',
        'трейдер',
        'автор і засновник arapov.trade',
      ],
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
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке облігації простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Це борговий папір. Купуючи його, ви даєте гроші в борг компанії або державі під відсоток. Емітент зобов'язується повернути номінал до дати погашення й платити по дорозі купони.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чим облігації відрізняються від акцій?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Акція це частка в бізнесі й право на частину прибутку, а облігація це борг з фіксованими умовами. Власник облігації кредитор, а не співвласник, і дохід за нею відомий заздалегідь.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке купон і номінал?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Номінал це сума, яку емітент поверне в дату погашення. Купон це відсоток за користування вашими грошима, зазвичай раз на півроку або рік.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи надійні облігації?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Державні облігації вважають одними з найнадійніших, корпоративні ризикованіші. Але надійний не значить безризиковий. Лишаються ризик дефолту емітента й ризик падіння ціни при зростанні ставок.',
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
      '@id': 'https://arapov.trade/uk/freestudying/bonds-coupon-yield#howto',
      name: 'Як розібратися та застосувати: облігації',
      description:
        'Покроковий розбір теми та її практичне застосування в торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Розберіться, що таке облігація',
          text: "Облігація — це борговий цінний папір, за яким емітент бере в інвестора гроші в борг і зобов'язується повернути номінал до дати погашення, виплачуючи купони.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Зрозумійте ключові параметри',
          text: "В облігації кілька ключових параметрів: номінал, купон, дата погашення й дохідність, а ціна на ринку обернено пов'язана зі ставкою центробанку.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Розрізняйте види та ризики',
          text: 'Облігації розрізняють за тим, хто їх випускає, держава чи компанія.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Не плутайте надійний з безризиковим',
          text: 'Облігація це інструмент передбачуваного доходу, а не поле для трейдера; надійна не значить безризикова, лишаються дефолт і ризик ставки.',
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
      name: 'Глосарій термінів статті',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Облігація',
          description:
            "Це борговий цінний папір, за яким емітент бере в інвестора гроші в борг і зобов'язується повернути номінал до дати погашення, а по дорозі платить відсотки у вигляді купонів.",
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
