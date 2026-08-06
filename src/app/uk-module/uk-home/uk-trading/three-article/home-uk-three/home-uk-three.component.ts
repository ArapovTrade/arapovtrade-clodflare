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
  selector: 'app-home-uk-three',
  templateUrl: './home-uk-three.component.html',
  styleUrl: './home-uk-three.component.scss',
})
export class HomeUkThreeComponent implements OnInit {
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
      'Що таке біржа: види, функції та учасники торгів | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повне керівництво з бірж: фондові, товарні, валютні та ф`ючерсні майданчики. Як працює біржа, хто її учасники та чому вона важлива для економіки.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/znakomstvosbirgey.webp',
    });
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
          headline: 'Що таке біржа: види, функції та учасники торгів',
          description:
            "Повне керівництво з бірж: фондові, товарні, валютні та ф'ючерсні майданчики. Як працює біржа, хто її учасники та чому вона важлива для економіки.",
          image: 'https://arapov.trade/assets/img/content/2article1pic.jpg',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/exchange',
          },
          articleSection: 'Навчання трейдингу',
          wordCount: 1520,
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
          name: 'Що таке біржа простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Біржа — це організований майданчик для торгівлі різними активами: акціями, валютами, товарами, ф'ючерсами. Вона забезпечує прозорість угод, формування справедливих цін та захист інтересів учасників.",
          },
        },
        {
          '@type': 'Question',
          name: 'Які види бірж існують?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Основні види: фондові біржі (акції, облігації), товарні (нафта, золото, зерно), валютні (обмін валют) та ф'ючерсні (похідні інструменти). Кожна спеціалізується на певних активах.",
          },
        },
        {
          '@type': 'Question',
          name: 'Хто є учасниками біржі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні учасники: брокери (посередники), інвестори (довгострокові вкладення), спекулянти (короткострокова торгівля), хеджери (захист від ризиків), маркет-мейкери (забезпечення ліквідності) та регулятори (нагляд).',
          },
        },
        {
          '@type': 'Question',
          name: 'Як почати торгувати на біржі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для початку торгівлі потрібно: обрати надійного брокера, відкрити торговий рахунок, вивчити основи аналізу ринку, почати з демо-рахунку для практики та поступово переходити до реальних угод з невеликими сумами.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому біржі важливі для економіки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Біржі забезпечують ліквідність ринків, формують справедливі ціни, дозволяють компаніям залучати капітал, а інвесторам — вкладати кошти. Вони є фундаментом сучасної фінансової системи.',
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
      name: 'Як почати торгувати на біржі',
      description: 'Покрокове керівництво для початківців трейдерів',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть брокера',
          text: 'Вивчіть рейтинги брокерів, порівняйте комісії, умови торгівлі та доступні інструменти. Оберіть ліцензованого брокера з хорошою репутацією.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Відкрийте торговий рахунок',
          text: 'Пройдіть процедуру реєстрації, підтвердіть особу та поповніть рахунок мінімальною сумою для початку торгівлі.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Вивчіть основи аналізу',
          text: 'Освойте базові концепції технічного та фундаментального аналізу, навчіться читати графіки та розуміти ринкові індикатори.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Практикуйтесь на демо-рахунку',
          text: 'Відпрацьовуйте стратегії на віртуальних грошах, щоб зрозуміти механіку торгівлі без ризику реальних втрат.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Почніть з малих сум',
          text: 'Переходьте до реальної торгівлі поступово, ризикуючи лише тими коштами, втрату яких можете собі дозволити.',
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
      name: 'Біржова термінологія',
      description: 'Ключові поняття біржової торгівлі',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Біржа',
          description:
            'Організований майданчик для торгівлі фінансовими інструментами та товарами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фондова біржа',
          description:
            'Майданчик для торгівлі цінними паперами — акціями та облігаціями',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Товарна біржа',
          description:
            'Майданчик для торгівлі сировинними товарами: нафтою, металами, зерном',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Брокер',
          description:
            'Посередник між трейдером та біржею, що виконує торгові накази',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Учасник, що забезпечує ліквідність шляхом постійного виставлення заявок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність швидко купити або продати актив без суттєвого впливу на ціну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кліринг',
          description:
            'Процес взаєморозрахунків та гарантування виконання угод',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Різниця між ціною купівлі та продажу активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'IPO',
          description: 'Первинне публічне розміщення акцій компанії на біржі',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджування',
          description:
            'Страхування ризиків за допомогою похідних фінансових інструментів',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
