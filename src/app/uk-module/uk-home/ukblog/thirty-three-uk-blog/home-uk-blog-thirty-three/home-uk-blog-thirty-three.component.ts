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
  selector: 'app-home-uk-blog-thirty-three',
  templateUrl: './home-uk-blog-thirty-three.component.html',
  styleUrl: './home-uk-blog-thirty-three.component.scss',
})
export class HomeUkBlogThirtyThreeComponent implements OnInit {
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
      'Мікроструктура ринку: стакан і стрічка | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Як влаштована мікроструктура ринку: біржовий стакан, стрічка принтів, ліквідність та айсберг-ордери. Як читати потік заявок і угод.',
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
            'Мікроструктура ринку: як формується ціна, стакан, спред, ліквідність і маркетмейкер',
          description:
            'Як влаштована мікроструктура ринку: біржовий стакан, стрічка принтів, ліквідність та айсберг-ордери. Як читати потік заявок і угод.',
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
            '@id': 'https://arapov.trade/uk/freestudying/market-microstructure',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/stockorderbook.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Словник трейдера',
          keywords:
            'мікроструктура ринку, біржовий стакан, bid ask, спред, ліквідність, волатильність, маркетмейкер',
          inLanguage: 'uk',
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
          name: 'Як формується ціна на біржі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Через баланс попиту та пропозиції. Коли покупці напористіші, ціна росте, доки не набереться достатньо продавців, і навпаки. Ціна це згода учасників у кожен момент, а справжній відбиток цієї сутички проступає в обсязі, за яким і видно, хто тримає рух.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке Bid, Ask і спред?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bid це найкраща ціна, за якою готові купити, Ask це найкраща ціна, за якою готові продати. Усі заявки складаються в біржовий стакан, а проміжок між Bid і Ask називають спредом. Це плата за миттєвий вхід: відкривши угоду, ви одразу в мінусі на величину спреду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке ліквідність ринку і навіщо вона трейдеру?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це здатність ринку увібрати ордер без помітного зсуву ціни. На ліквідному ринку вузький спред і виконання за очікуваною ціною, на тонкому широкий спред, проковзування та різкі розриви. А зони скупчення стопів це пули ліквідності, до яких великий капітал навмисно жене ціну.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна новачку торгувати по біржовому стакану?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'За моїм досвідом це важко: стакан змінюється щосекунди, а швидкість і алгоритми на боці великих гравців, які ще й ховають заявки спуфінгом та айсбергами. Новачку стійкіше спиратися на рівні та обсяги, де вже видно, хто реально набирав позицію.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи правда, що маркетмейкер вибиває мій стоп?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Не особисто ваш. Він збирає ліквідність там, де її багато, а це очевидні місця, куди натовп ставить стопи: круглі рівні та локальні екстремуми. Частіше трейдер втрачає не через лиходія, а тому що сам поставив стоп у найпередбачуванішому місці.',
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
      '@id': 'https://arapov.trade/uk/freestudying/market-microstructure#howto',
      name: 'Як розуміти мікроструктуру ринку',
      description:
        'Покроковий розбір того, як народжується ціна, як влаштовані стакан, спред і ліквідність та яку роль грає маркетмейкер',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, що ціну ліпить баланс попиту та пропозиції',
          text: 'Ціна це завжди згода між тими, хто хоче купити, і тими, хто хоче продати.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розберіться в стакані, Bid і Ask',
          text: 'Біржовий стакан це список усіх активних заявок на купівлю та продаж, вишикуваних за цінами.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Рахуйте спред як витрату кожної угоди',
          text: 'Спред це різниця між ціною купівлі та ціною продажу, прихована витрата кожної угоди.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Навчіться бачити ліквідність та її пули',
          text: 'Ліквідність це здатність ринку увібрати торговий ордер без помітної зміни ціни.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Підлаштовуйте ризик під волатильність через ATR',
          text: 'Волатильність це розмах цінових коливань за період, а не напрямок руху.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Зрозумійте логіку маркетмейкера й ідіть за капіталом, а не проти',
          text: 'Маркетмейкер це професійний учасник, який тримає подвійне котирування і забезпечує ліквідність.',
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
          name: 'Біржовий стакан',
          description:
            'Список усіх активних заявок на купівлю та продаж активу, вишикуваних за цінами; його ще називають книгою заявок чи глибиною ринку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між ціною купівлі (Ask) і ціною продажу (Bid) одного активу в даний момент; прихована витрата кожної угоди.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність ринку увібрати торговий ордер без помітної зміни ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Міра розмаху цінових коливань активу за певний період; характеризує амплітуду руху, а не його напрямок.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркетмейкер',
          description:
            'Професійний учасник ринку, який за договором із біржею тримає подвійне котирування і забезпечує ліквідність.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
