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
  selector: 'app-home-uk-twenty-two',
  templateUrl: './home-uk-twenty-two.component.html',
  styleUrl: './home-uk-twenty-two.component.scss',
})
export class HomeUkTwentyTwoComponent implements OnInit {
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
      'Економічні фактори у трейдингу | Вплив на валютні курси',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з економічних факторів, що впливають на валютні курси. Дізнайтеся про роль центральних банків, макроекономічні показники, інфляцію та сировинні ринки.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-01-20' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economicfactors.webp',
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
          headline: 'Економічні фактори та їх вплив на валютні курси',
          description:
            'Повний посібник з економічних факторів, що впливають на валютні курси. Дізнайтеся про роль центральних банків, макроекономічні показники, інфляцію та сировинні ринки.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          image: 'https://arapov.trade/assets/img/content/economicfactors.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/econimicfactors',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'економічні фактори',
            'валютні курси',
            'центральні банки',
            'процентні ставки',
            'інфляція',
          ],
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
          name: 'Як процентні ставки впливають на валютний курс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Підвищення процентної ставки центральним банком робить валюту привабливішою для інвесторів, оскільки збільшує дохідність активів у цій валюті. Це стимулює приплив капіталу та зміцнює курс. Зниження ставки чинить протилежний ефект — валюта слабшає.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які макроекономічні показники важливі для валютного ринку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключові показники включають ВВП (зростання економіки), рівень інфляції (CPI, PPI), дані по ринку праці (безробіття, Non-Farm Payrolls), торговельний баланс та індекс ділової активності PMI. Ці дані формують очікування щодо монетарної політики.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як ціни на нафту впливають на валюти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Зростання цін на нафту зміцнює валюти країн-експортерів (CAD, RUB, NOK), оскільки збільшує їхні експортні доходи. Для країн-імпортерів (JPY, INR) зростання нафтових цін створює тиск на валюту через збільшення імпортних витрат.',
          },
        },
        {
          '@type': 'Question',
          name: "Що таке кількісне пом'якшення і як воно впливає на курс?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Кількісне пом'якшення (QE) — це програма центрального банку зі скупки активів для збільшення грошової маси та стимулювання економіки. QE зазвичай послаблює валюту, оскільки збільшує її пропозицію на ринку та знижує процентні ставки.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як геополітичні події впливають на валютні курси?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Політична нестабільність, конфлікти, санкції та торгові війни створюють невизначеність на ринках. Інвестори переводять капітал у захисні активи (USD, CHF, JPY, золото), що зміцнює ці валюти та послаблює валюти постраждалих країн.',
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
      name: 'Як аналізувати економічні фактори для торгівлі валютами',
      description:
        'Покрокове керівництво з фундаментального аналізу валютного ринку',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Моніторинг економічного календаря',
          text: 'Відстежуйте розклад публікації ключових економічних даних: рішення щодо ставок, дані по інфляції, ВВП, зайнятості. Плануйте торгівлю з урахуванням цих подій.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Аналіз політики центральних банків',
          text: "Вивчайте заяви та протоколи засідань центральних банків. Визначайте напрямок монетарної політики: посилення чи пом'якшення.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцінка макроекономічних показників',
          text: 'Порівнюйте фактичні дані з прогнозами аналітиків. Значні відхилення від очікувань викликають сильні рухи на ринку.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: "Врахування міжринкових зв'язків",
          text: "Аналізуйте кореляції між валютами, сировинними ринками та фондовими індексами. Розуміння цих зв'язків покращує якість прогнозів.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Формування торгових рішень',
          text: 'Інтегруйте фундаментальний аналіз з технічним. Використовуйте економічні дані для визначення напрямку, а технічний аналіз — для точок входу.',
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
      name: 'Термінологія економічних факторів',
      description: 'Основні терміни фундаментального аналізу валютного ринку',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Процентна ставка',
          description:
            'Базова ставка центрального банку, що визначає вартість запозичень в економіці',
        },
        {
          '@type': 'DefinedTerm',
          name: "Кількісне пом'якшення",
          description:
            'Програма центрального банку зі скупки активів для збільшення грошової маси',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інфляція',
          description:
            'Зростання загального рівня цін на товари та послуги, що знижує купівельну спроможність валюти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ВВП',
          description:
            'Валовий внутрішній продукт — показник загальної вартості товарів та послуг, вироблених у країні',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Non-Farm Payrolls',
          description:
            'Кількість нових робочих місць у несільськогосподарському секторі США',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговельний баланс',
          description:
            'Різниця між експортом та імпортом товарів і послуг країни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Індекс споживчих цін',
          description: 'CPI — показник зміни цін на споживчі товари та послуги',
        },
        {
          '@type': 'DefinedTerm',
          name: 'PMI',
          description:
            'Індекс ділової активності, що відображає настрої у виробничому секторі',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Грошова маса',
          description: 'Загальний обсяг грошових коштів в обігу в економіці',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Захисний актив',
          description:
            'Актив, в який інвестори переводять капітал у періоди невизначеності',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
