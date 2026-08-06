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
  selector: 'app-home-uk-blog-seventy-one',
  templateUrl: './home-uk-blog-seventy-one.component.html',
  styleUrl: './home-uk-blog-seventy-one.component.scss',
})
export class HomeUkBlogSeventyOneComponent {
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
    this.titleService.setTitle('Торгівля на новинах: стратегії трейдера');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтесь, як торгувати на новинах: вплив економічних подій, стратегії трейдингу та мінімізація ризиків від ArapovTrade.',
    });

     this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/newstrading.webp',
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
          '@type': 'Article',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/newstrading',
          },
          headline: 'Торгівля на новинах у трейдингу',
          description:
            'Комплексне керівництво з новинного трейдингу: стратегії, інструменти аналізу, управління ризиками',
          image: 'https://arapov.trade/assets/img/content/newstrading1.png',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-01-10T00:00:00Z',
     dateModified: '2026-04-15T00:00:00Z',
          articleSection: 'Навчання трейдингу',
          keywords:
            'торгівля на новинах, новинний трейдинг, економічний календар, волатильність, NFP, процентні ставки',
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
          name: 'Які новини найсильніше впливають на ринок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найбільший вплив мають рішення центральних банків щодо процентних ставок, дані по зайнятості (NFP), показники інфляції та ВВП. Несподівані геополітичні події також викликають потужні рухи.',
          },
        },
        {
          '@type': 'Question',
          name: 'Коли краще входити в ринок — до чи після новини?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Консервативний підхід передбачає вхід після стабілізації первинної реакції — через 5-15 хвилин після публікації. Це знижує ризик хибних рухів та розширених спредів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому розширюються спреди під час новин?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У момент публікації ліквідність падає, оскільки маркет-мейкери знижують обсяги через невизначеність. Брокери розширюють спреди для компенсації ризиків виконання ордерів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як захистити позицію при торгівлі на новинах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Використовуйте стоп-лоси з урахуванням підвищеної волатильності, зменшуйте розмір позиції, уникайте високого кредитного плеча та заздалегідь визначайте рівні виходу з угоди.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна автоматизувати торгівлю на новинах?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, існують алгоритмічні системи для новинного трейдингу. Однак вони вимагають швидкого з`єднання з біржею, якісних даних та ретельного тестування стратегій.',
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
      name: 'Як торгувати на новинах',
      description: 'Покрокове керівництво з новинного трейдингу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Вивчіть економічний календар',
          text: 'Визначте важливі події тижня, час їх виходу та очікуваний вплив на ринок.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Проаналізуйте прогнози',
          text: 'Порівняйте консенсус-прогнози аналітиків з попередніми значеннями.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Визначте ключові рівні',
          text: 'Відмітьте на графіку рівні підтримки та опору.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Дочекайтеся стабілізації',
          text: 'Після публікації зачекайте 5-15 хвилин, поки ринок визначить напрямок.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Керуйте ризиками',
          text: 'Використовуйте зменшений розмір позиції та встановіть стоп-лос з урахуванням волатильності.',
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
      name: 'Глосарій торгівлі на новинах',
      description: 'Ключові поняття новинного трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Новинний трейдинг',
          description:
            'Стратегія торгівлі, заснована на реакції ринку на економічні та корпоративні новини',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Економічний календар',
          description:
            'Розклад публікації макроекономічних даних та важливих подій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'NFP',
          description:
            'Non-Farm Payrolls — звіт про зайнятість у несільськогосподарському секторі США',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description: 'Ступінь мінливості ціни активу за певний період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description: 'Різниця між ціною купівлі та продажу активу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проковзування',
          description:
            'Різниця між очікуваною та фактичною ціною виконання ордера',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Геп',
          description:
            'Ціновий розрив між закриттям та відкриттям торгової сесії',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ATR',
          description: 'Індикатор середнього істинного діапазону волатильності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Консенсус-прогноз',
          description:
            'Усереднене очікування аналітиків щодо економічного показника',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хеджування',
          description: 'Відкриття протилежних позицій для зниження ризиків',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
