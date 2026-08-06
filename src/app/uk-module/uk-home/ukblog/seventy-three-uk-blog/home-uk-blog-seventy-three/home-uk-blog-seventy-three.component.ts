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
  selector: 'app-home-uk-blog-seventy-three',
  templateUrl: './home-uk-blog-seventy-three.component.html',
  styleUrl: './home-uk-blog-seventy-three.component.scss',
})
export class HomeUkBlogSeventyThreeComponent {
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
      'Макроекономічні показники у трейдингу | Фундаментальний аналіз'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з макроекономічних показників для трейдерів. Дізнайтеся, як ВВП, інфляція, процентні ставки та зайнятість впливають на фінансові ринки.',
    });

      this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/macroeconomicindicators.webp',
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
          headline: 'Макроекономічні показники та їх вплив на фінансові ринки',
          description:
            'Повний посібник з макроекономічних показників для трейдерів. Дізнайтеся, як ВВП, інфляція, процентні ставки та зайнятість впливають на фінансові ринки.',
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
          datePublished: '2025-06-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/uk/freestudying/macroeconomicindicators',
          },
          image: [
            'https://arapov.trade/assets/redesignArapovTrade/img/macroeconomicindicators.webp',
          ],
          articleSection: 'Трейдинг',
          keywords: [
            'макроекономічні показники',
            'ВВП',
            'інфляція',
            'процентні ставки',
            'фундаментальний аналіз',
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
          name: 'Що таке макроекономічні показники?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Макроекономічні показники — це статистичні дані, що відображають стан та динаміку економіки країни чи регіону. До ключових показників належать ВВП, інфляція, рівень безробіття, торговельний баланс та індекси ділової активності. Вони становлять основу фундаментального аналізу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як ВВП впливає на фінансові ринки?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Зростання ВВП вище прогнозів зміцнює національну валюту та підтримує фондовий ринок, сигналізуючи про здорову економіку. Сповільнення зростання або падіння ВВП може спровокувати рецесійні очікування, зниження фондових індексів та відтік капіталу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому інфляція важлива для трейдерів?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Інфляція визначає купівельну спроможність валюти та впливає на рішення центральних банків щодо процентних ставок. Висока інфляція зазвичай веде до підвищення ставок, що зміцнює валюту, але може негативно позначитися на фондовому ринку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке Non-Farm Payrolls і чому це важливо?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Non-Farm Payrolls (NFP) — щомісячний звіт про кількість створених робочих місць у несільськогосподарському секторі США. Це один з найвпливовіших економічних релізів, що викликає високу волатильність на валютному та фондовому ринках.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як використовувати економічний календар у торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Економічний календар допомагає планувати торгівлю з урахуванням майбутніх публікацій важливих даних. Трейдери відстежують час виходу показників, порівнюють прогнози з фактичними значеннями та використовують волатильність після релізів для відкриття позицій.',
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
      name: 'Як аналізувати макроекономічні показники для торгівлі',
      description:
        'Покрокове керівництво з використання макроекономічних даних у трейдингу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчення економічного календаря',
          text: 'Відстежуйте розклад публікації ключових показників: ВВП, інфляція, зайнятість, рішення щодо ставок. Відзначайте події високої важливості.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Аналіз консенсус-прогнозів',
          text: 'Вивчайте прогнози аналітиків перед публікацією даних. Ринкова реакція залежить від відхилення фактичних значень від очікувань.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцінка історичної динаміки',
          text: 'Порівнюйте поточні дані з попередніми значеннями. Виявляйте тренди — послідовне покращення чи погіршення показників.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: "Визначення міжринкових зв'язків",
          text: 'Аналізуйте вплив показників на різні класи активів: валюти, акції, облігації, сировину. Враховуйте кореляції між ринками.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Формування торгової стратегії',
          text: 'Інтегруйте макроекономічний аналіз з технічним. Використовуйте фундаментальні дані для визначення напрямку, технічний аналіз — для точок входу.',
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
      name: 'Термінологія макроекономічних показників',
      description: 'Основні терміни фундаментального аналізу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'ВВП',
          description:
            'Валовий внутрішній продукт — загальна вартість товарів та послуг, вироблених у країні за період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'CPI',
          description:
            'Індекс споживчих цін — показник зміни вартості споживчого кошика',
        },
        {
          '@type': 'DefinedTerm',
          name: 'PPI',
          description:
            'Індекс цін виробників — показник інфляції на рівні оптових цін',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NFP',
          description:
            'Non-Farm Payrolls — кількість робочих місць у несільськогосподарському секторі США',
        },
        {
          '@type': 'DefinedTerm',
          name: 'PMI',
          description:
            'Індекс ділової активності — показник настроїв у виробничому та сервісному секторах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Процентна ставка',
          description:
            'Базова ставка центрального банку, що визначає вартість запозичень',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговельний баланс',
          description:
            'Різниця між експортом та імпортом товарів і послуг країни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Індекс споживчої довіри',
          description:
            'Показник впевненості споживачів в економічних перспективах',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Грошова маса',
          description:
            'Загальний обсяг грошових коштів в обігу в економіці (M1, M2, M3)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'VIX',
          description:
            'Індекс волатильності — показник очікуваної волатильності фондового ринку',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
