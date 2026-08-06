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
import { ArticlesService } from '../../../../../servises/articles.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-uk-blog-sixty-two',
  templateUrl: './home-uk-blog-sixty-two.component.html',
  styleUrl: './home-uk-blog-sixty-two.component.scss',
})
export class HomeUkBlogSixtyTwoComponent {
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
      'Стратегія Smart Money: як знаходити точки входу | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Стратегії Smart Money для трейдингу: як знаходити точки входу за Order Blocks, Fair Value Gaps, Break of Structure та аналізом ліквідності. Повний посібник.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-07' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneystrategies.png',
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
          '@id':
            'https://arapov.trade/uk/freestudying/smartmoneystrategies#article',
          headline:
            'Стратегія Smart Money: як знаходити точки входу в трейдингу',
          description:
            'Повний посібник зі стратегій Smart Money: Order Blocks, Fair Value Gaps, Break of Structure та аналіз ліквідності для пошуку точних точок входу',
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartmoneystrategies1.webp',
            width: 1200,
            height: 630,
          },
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
              width: 200,
              height: 60,
            },
          },
          datePublished: '2026-03-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',

          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/smartmoneystrategies',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'Smart Money',
            'Order Blocks',
            'Fair Value Gaps',
            'Break of Structure',
            'ліквідність',
            'точки входу',
            'трейдинг',
          ],
          wordCount: 1321,
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
      '@id': 'https://arapov.trade/uk/freestudying/smartmoneystrategies#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке Smart Money у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money — це великі інституційні учасники ринку: інвестиційні банки, хедж-фонди, пенсійні фонди та маркет-мейкери. Вони володіють значним капіталом та аналітичними ресурсами, формуючи основні ринкові тенденції через накопичення та розподіл позицій.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як знаходити Order Blocks на графіку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Order Block — це остання свічка перед сильним імпульсним рухом. Бичачий Order Block формується останньою ведмежою свічкою перед зростанням, ведмежий — останньою бичачою свічкою перед падінням. Важливе підтвердження підвищеними об'ємами та повернення ціни до цієї зони.",
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке Fair Value Gap і як його використовувати?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fair Value Gap (FVG) — це незаповнений ціновий розрив, що утворюється при швидкому русі ціни. Він показує дисбаланс між покупцями та продавцями. Ціна прагне повернутися до цих зон, що створює торгові можливості для входу в позицію.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняється Break of Structure від Change of Character?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Break of Structure (BOS) підтверджує продовження поточного тренду через пробій ключового рівня. Change of Character (CHoCH) сигналізує про можливу зміну тренду, коли ціна припиняє формувати нові екстремуми у попередньому напрямку та пробиває протилежний рівень.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який ризик-менеджмент використовувати при торгівлі за Smart Money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Оптимальний ризик на угоду складає 1-2% від капіталу. Стоп-лос розміщується за зонами ліквідності. Мінімальне співвідношення ризику до прибутку — 1:2. Рекомендується часткове закриття позиції на ключових рівнях та використання трейлінг-стопу у трендових рухах.',
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
      '@id': 'https://arapov.trade/uk/freestudying/smartmoneystrategies#howto',
      name: 'Як знаходити точки входу за Smart Money Concepts',
      description:
        'Покрокова методика пошуку високоймовірних точок входу з використанням інституційних концепцій трейдингу',
      totalTime: 'PT30M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначення ринкової структури',
          text: 'Проаналізуйте поточний тренд, визначте ключові максимуми та мінімуми. Виявіть зони накопичення та розподілу на графіку.',
          url: 'https://arapov.trade/uk/freestudying/smartmoneystrategies#structure',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Пошук зон ліквідності',
          text: 'Знайдіть області скупчення стоп-ордерів: за рівнями підтримки та опору, біля денних та тижневих екстремумів, на круглих психологічних рівнях.',
          url: 'https://arapov.trade/uk/freestudying/smartmoneystrategies#liquidity',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ідентифікація Order Blocks та FVG',
          text: 'Визначте Order Blocks — останні свічки перед імпульсом. Знайдіть Fair Value Gaps — незаповнені розриви після різких рухів. Відмітьте ці зони на графіку.',
          url: 'https://arapov.trade/uk/freestudying/smartmoneystrategies#orderblocks',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Очікування підтверджуючих сигналів',
          text: "Дочекайтеся повернення ціни до зони інтересу. Шукайте підтвердження: свічкові патерни, збільшення об'ємів, Break of Structure або Change of Character.",
          url: 'https://arapov.trade/uk/freestudying/smartmoneystrategies#confirmation',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Вхід та управління позицією',
          text: 'Відкрийте позицію за наявності підтвердження. Розмістіть стоп-лос за зоною ліквідності. Визначте тейк-профіт біля наступної значимої зони. Використовуйте співвідношення ризику до прибутку мінімум 1:2.',
          url: 'https://arapov.trade/uk/freestudying/smartmoneystrategies#entry',
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
      '@id': 'https://arapov.trade/uk/freestudying/smartmoneystrategies#terms',
      name: 'Глосарій термінів Smart Money Concepts',
      description:
        'Ключові терміни та визначення методології Smart Money у трейдингу',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Великі інституційні учасники ринку — банки, хедж-фонди, маркет-мейкери, — що володіють значним капіталом та впливають на ринкові рухи',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'Зона на графіку, де інституційні гравці накопичували позиції перед значним ціновим рухом; остання свічка перед імпульсом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Незаповнений ціновий розрив, що утворюється при швидкому русі ціни; зона дисбалансу між попитом та пропозицією',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Break of Structure',
          description:
            'Пробій ключового максимуму або мінімуму, що підтверджує продовження поточного тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Change of Character',
          description:
            'Сигнал потенційної зміни тренду; пробій рівня у напрямку, протилежному поточному тренду',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Sweep',
          description:
            'Процес вибивання стоп-ордерів роздрібних трейдерів перед розворотом ціни; маніпуляція ліквідністю',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Тактика великих гравців з руху ціни до зон скупчення стоп-ордерів для збору ліквідності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Скупчення ордерів на певних цінових рівнях; ресурс, необхідний інституційним гравцям для відкриття великих позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркет-мейкер',
          description:
            'Учасник ринку, що забезпечує ліквідність шляхом виставлення котирувань на купівлю та продаж; великий інституційний гравець',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description:
            'Система управління ризиками у торгівлі, що включає визначення розміру позиції, рівнів стоп-лосу та співвідношення ризику до прибутку',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
