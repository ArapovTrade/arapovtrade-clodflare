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
  selector: 'app-home-uk-blog-seventy-four',
  templateUrl: './home-uk-blog-seventy-four.component.html',
  styleUrl: './home-uk-blog-seventy-four.component.scss',
})
export class HomeUkBlogSeventyFourComponent {
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

    this.titleService.setTitle(
      'Глобальний фундаментальний аналіз валютних ринків | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Глобальний фундаментальний аналіз валютних ринків: відсоткові ставки, інфляція, ВВП, ринок праці та політика центральних банків. Практичний посібник для трейдерів.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-17' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/globalfundamentalanalysis.webp',
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
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
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
          headline: 'Глобальний фундаментальний аналіз валютних ринків',
          description:
            'Глобальний фундаментальний аналіз валютних ринків: відсоткові ставки, інфляція, ВВП, ринок праці та політика центральних банків. Практичний посібник для трейдерів.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/uk/freestudying/globalfundamentalanalysis',
          },
          image:
            'https://arapov.trade/assets/img/content/globalfundamentalanalysis1.png',
          articleSection: 'Навчання трейдингу',
          keywords: [
            'фундаментальний аналіз',
            'валютний ринок',
            'відсоткові ставки',
            'інфляція',
            'центральні банки',
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
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке фундаментальний аналіз валютних ринків?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фундаментальний аналіз валютних ринків — це метод оцінки вартості валют на основі вивчення макроекономічних показників: відсоткових ставок, інфляції, ВВП, рівня безробіття та політики центральних банків. На відміну від технічного аналізу, фундаментальний досліджує причини зміни курсів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як відсоткові ставки впливають на курс валюти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Підвищення відсоткових ставок робить валюту привабливішою для інвесторів, оскільки депозити та облігації приносять більший дохід. Це збільшує попит на валюту та зміцнює її курс. Зниження ставок має протилежний ефект — валюта слабшає.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому інфляція важлива для валютного трейдера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Висока інфляція знижує купівельну спроможність валюти та її привабливість для інвесторів. Центральні банки реагують на інфляцію зміною ставок, що безпосередньо впливає на валютний курс. Трейдери відстежують CPI та PPI для прогнозування дій регуляторів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які дані про зайнятість впливають на валютний ринок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключовий звіт — Non-Farm Payrolls (NFP) у США. Також важливі рівень безробіття, середня погодинна зарплата та кількість заявок на допомогу по безробіттю. Сильний ринок праці зміцнює валюту, слабкий — послаблює.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як торговельний баланс впливає на курс національної валюти?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Позитивний торговельний баланс (експорт перевищує імпорт) створює попит на національну валюту з боку іноземних покупців, зміцнюючи її. Дефіцит торговельного балансу послаблює валюту, оскільки країні потрібно більше іноземної валюти для оплати імпорту.',
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
      name: 'Як застосовувати фундаментальний аналіз валютних ринків',
      description:
        'Покрокова інструкція з використання макроекономічних даних для прийняття торгових рішень на валютному ринку',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть економічний календар',
          text: 'Відстежуйте розклад публікацій ключових макроекономічних показників: рішення щодо ставок, дані про інфляцію, ВВП, NFP. Плануйте торгівлю з урахуванням цих подій.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Аналізуйте розбіжності прогнозів і фактів',
          text: 'Порівнюйте фактичні дані з консенсус-прогнозами аналітиків. Сильні розбіжності викликають різкі рухи валют. Перевищення очікувань зазвичай зміцнює валюту.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Відстежуйте політику центральних банків',
          text: 'Вивчайте протоколи засідань ФРС, ЄЦБ, Банку Англії. Риторика регуляторів (яструбина чи голубина) сигналізує про майбутні зміни ставок і напрямок валюти.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Комбінуйте з технічним аналізом',
          text: 'Використовуйте фундаментальний аналіз для визначення напрямку тренду, а технічний — для точок входу та виходу. Це підвищує якість торгових рішень.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Оцінюйте міжринкові кореляції',
          text: "Вивчайте зв'язки між валютами, товарами та облігаціями. Наприклад, зростання цін на нафту часто зміцнює канадський долар, а зниження дохідності облігацій послаблює валюту.",
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
      name: 'Терміни фундаментального аналізу валютних ринків',
      description:
        'Глосарій ключових понять глобального фундаментального аналізу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description:
            'Метод оцінки вартості валюти на основі макроекономічних показників, політичних подій та економічного стану країни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Відсоткова ставка',
          description:
            'Ставка, за якою центральний банк кредитує комерційні банки. Ключовий інструмент грошово-кредитної політики, що впливає на курс валюти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інфляція',
          description:
            'Стійке зростання загального рівня цін на товари та послуги, що знижує купівельну спроможність валюти',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ВВП (валовий внутрішній продукт)',
          description:
            'Сукупна вартість усіх товарів і послуг, вироблених у країні за певний період. Основний індикатор економічного зростання',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Non-Farm Payrolls (NFP)',
          description:
            'Щомісячний звіт про кількість зайнятих у несільськогосподарському секторі США. Найважливіший індикатор стану ринку праці',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CPI (індекс споживчих цін)',
          description:
            'Показник, що вимірює зміну цін на кошик споживчих товарів і послуг. Основний індикатор інфляції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Carry Trade',
          description:
            'Стратегія, при якій трейдер позичає валюту з низькою ставкою та інвестує у валюту з високою ставкою для отримання різниці в дохідності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговельний баланс',
          description:
            'Різниця між експортом та імпортом країни. Позитивний баланс зміцнює валюту, негативний — послаблює',
        },
        {
          '@type': 'DefinedTerm',
          name: "Кількісне пом'якшення (QE)",
          description:
            'Нестандартна монетарна політика, при якій центральний банк купує активи для збільшення грошової маси та стимулювання економіки',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Платіжний баланс',
          description:
            'Статистичний звіт, що відображає всі економічні операції країни з рештою світу за певний період',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
