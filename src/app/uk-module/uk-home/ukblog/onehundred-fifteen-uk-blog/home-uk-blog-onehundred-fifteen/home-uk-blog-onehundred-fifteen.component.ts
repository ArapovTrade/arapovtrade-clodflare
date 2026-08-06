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
  selector: 'app-home-uk-blog-onehundred-fifteen',
  templateUrl: './home-uk-blog-onehundred-fifteen.component.html',
  styleUrl: './home-uk-blog-onehundred-fifteen.component.scss'
})
export class HomeUkBlogOnehundredFifteenComponent {
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
    this.titleService.setTitle('Альтсезон: що це і як пов`язаний із домінацією біткоїна');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке альтсезон, чому капітал перетікає з біткоїна в альткоїни, як це пов`язано з домінацією BTC і чому кінець альтсезону часто болісний.',
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
     "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Альтсезон: що це і як пов'язаний з домінацією біткоїна",
      "description": "Що таке альтсезон, чому капітал перетікає з біткоїна в альткоїни, як це пов'язано з домінацією BTC і чому кінець альтсезону часто болісний.",
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
      "dateModified": "2026-06-15T00:00:00Z",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://arapov.trade/uk/freestudying/altseason"
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://arapov.trade/assets/img/content/altseason.jpeg",
        "width": 1200,
        "height": 630
      },
      "articleSection": "Криптовалюти",
      "keywords": "альтсезон, криптовалюти",
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
      "name": "Що таке альтсезон простими словами?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Це період, коли більшість альткоїнів ростуть швидше за біткоїн. Міряють його індексом альтсезону. Понад три чверті великих монет обігнали біткоїн за три місяці й ринок вважають у сезоні."
      }
    },
    {
      "@type": "Question",
      "name": "Як домінація біткоїна пов'язана з альтсезоном?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Домінація це частка біткоїна в капіталізації ринку. Коли вона падає, капітал часто тече з біткоїна в альти, і ті розганяються швидше. Тому падіння домінації вважають однією з провісниць альтсезону."
      }
    },
    {
      "@type": "Question",
      "name": "Чи можна передбачити альтсезон?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Точно ні. Фіксованої дати й офіційного старту в альтсезону немає, починається він різко після затишшя й так само різко гасне. Спіймати початок і кінець вчасно майже нереально, тому більшість запізнюється."
      }
    },
    {
      "@type": "Question",
      "name": "Чи буде альтсезон у колишньому вигляді?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Питання спірне. Частина аналітиків вважає, що широкий альтсезон відійшов, а на зміну приходять точкові ралі окремих проєктів. Ліквідність стягується в біткоїн та ефір. Єдиної думки немає, тому сліпо чекати повторення минулого наївно."
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
  "@id": "https://arapov.trade/uk/freestudying/altseason#howto",
  "name": "Як розібратися та застосувати: Альтсезон",
  "description": "Покроковий розбір теми та її практичне застосування в торгівлі",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Розберіться, що таке альтсезон простими словами",
      "text": "Альтсезон — це період на крипторинку, коли більшість альткоїнів ростуть швидше за сам біткоїн."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Альтсезон і домінація біткоїна",
      "text": "Ключ до альтсезону це домінація біткоїна, його частка в загальній капіталізації крипторинку."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Оцініть, чи можна заробити на альтсезоні: тверезий погляд",
      "text": "Спокуса альтсезону зрозуміла: у його пік багато альткоїнів ростуть у рази, а окремі й у десятки разів за короткий час."
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
      "name": "Альтсезон",
      "description": "Це період на крипторинку, коли більшість альткоїнів ростуть швидше за сам біткоїн."
    }
  ]
    };

    this.addJsonLdSchema(data);
  }
}
