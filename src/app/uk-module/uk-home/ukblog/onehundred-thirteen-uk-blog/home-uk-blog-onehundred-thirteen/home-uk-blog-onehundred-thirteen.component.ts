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
  selector: 'app-home-uk-blog-onehundred-thirteen',
  templateUrl: './home-uk-blog-onehundred-thirteen.component.html',
  styleUrl: './home-uk-blog-onehundred-thirteen.component.scss'
})
export class HomeUkBlogOnehundredThirteenComponent {
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
    this.titleService.setTitle('Нейромережі в трейдингу: що вміє ШІ й де його межа');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що нейромережі реально вміють на ринку, а що їм не до снаги, чому ШІ не передбачає майбутнє і як використати його як інструмент, а не оракула.',
    });

     this.meta.updateTag({ name: 'datePublished', content: '2026-06-15' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-06-15' });
    

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
      '@context': 'https://schema.org',
      '@graph': [
        {
         "@type": "Article",
      "headline": "Нейромережі в трейдингу: що вміє ШІ і де його межа",
      "description": "Що нейромережі реально вміють на ринку, а що їм не до снаги, чому ШІ не передбачає майбутнє і як використати його як інструмент, а не оракула.",
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
      "datePublished": "2026-06-15T00:00:00Z",
      "dateModified": "2026-06-1500:00:00Z",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://arapov.trade/uk/freestudying/ai-trading"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://arapov.trade/assets/img/content/ai-trading.jpeg",
        "width": 1200,
        "height": 630
      },
      "articleSection": "ШІ в трейдингу",
      "keywords": "ші в трейдингу",
      "inLanguage": "uk"
    }
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
      "name": "Чи може ШІ торгувати замість мене?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Більшість популярних нейромереж не торгує й рахунком не керує, вони працюють як аналітик: розбирають дані й дають ймовірні сценарії. Рішення й ризик лишаються на тобі. Повна автоматизація це вже окрема історія з ботами, і підступів там вистачає."
      }
    },
    {
      "@type": "Question",
      "name": "Чи варто довіряти прогнозам нейромережі?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Як думці помічника так, як віщуванню ні. Висновки ШІ це ймовірні сценарії з закладеною похибкою, а на довгій дистанції точність сповзає майже до випадковості. Перевіряй їх власною системою, а не йди слідом наосліп."
      }
    },
    {
      "@type": "Question",
      "name": "У чому ШІ реально допомагає трейдеру?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "У великих даних і рутині: відсіює неліквід, рахує статистику угод, перевіряє логіку стратегії й підсвічує слабкі місця. Час на аналізі економить, але ні метод, ні дисципліну не замінює."
      }
    },
    {
      "@type": "Question",
      "name": "Чи замінить ШІ трейдера?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "З мого досвіду ні. Він учиться на минулому, а ринок змінюється й реагує на новини та емоції, які кепсько лягають у модель. Добрий асистент поверх системи, але рішення й контроль ризику лишаються за людиною."
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
  "@id": "https://arapov.trade/uk/freestudying/ai-trading#howto",
  "name": "Як розібратися та застосувати: ШІ в трейдингу",
  "description": "Покроковий розбір теми та її практичне застосування в торгівлі",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Розберіться, що таке ШІ в трейдингу і навіщо він трейдеру",
      "text": "ШІ в трейдингу — це нейромережі й алгоритми машинного навчання, що аналізують ринок: перемелюють дані, шукають закономірності й готують ймовірні сценарії."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Розберіться, що нейромережі реально вміють, а що ні",
      "text": "Найсильніше ШІ там, де треба перелопатити дані."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Зрозумійте, чому ШІ не замінить метод і дисципліну",
      "text": "Головна стеля ШІ ось у чому: він вчиться на минулому, а ринок не стоїть на місці."
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
      "name": "ШІ в трейдингу",
      "description": "Це нейромережі й алгоритми машинного навчання, що аналізують ринок: перемелюють дані, шукають закономірності й готують ймовірні сценарії."
    }
  ]
    };

    this.addJsonLdSchema(data);
  }
}
