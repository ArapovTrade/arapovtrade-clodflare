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
  selector: 'app-home-uk-blog-sixty-one',
  templateUrl: './home-uk-blog-sixty-one.component.html',
  styleUrl: './home-uk-blog-sixty-one.component.scss',
})
export class HomeUkBlogSixtyOneComponent {
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
      'Smart Money Concepts: Повний Посібник з SMC | Arapov.trade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Smart Money Concepts (SMC) — повний посібник з торгівлі на боці інституційних учасників. Order Blocks, Fair Value Gaps, ліквідність та стратегії входу.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-07' }); this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/smartmoneyconceptsguide.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/uk/freestudying/smartmoneyconceptsguide',
          },
          headline:
            'Smart Money Concepts: повний гайд по стратегії розумних грошей',
          description:
            "Детальний розбір концепції Smart Money. Як великі гравці маніпулюють ціною, захоплення ліквідності, об'ємний аналіз.",
          image:
            'https://arapov.trade/assets/img/content/smartmoneyconceptsguide.webp',
          datePublished: '2024-06-15T00:00:00+03:00',
         dateModified: '2026-04-15T00:00:00Z',
          inLanguage: 'uk',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov.Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          video: {
            '@type': 'VideoObject',
            name: 'Smart Money и Захват Ликвидности | Обучение Трейдингу от А до Я',
            description:
              'Smart Money и захват ликвидности: полное руководство по стратегиям крупных игроков. Игорь Арапов показывает на живом примере фьючерса золота, как работает объемный анализ, стратегия Smart Money и почему профессиональные трейдеры манипулируют ценой перед разворотом рынка.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/nmDR1GUPoQg/maxresdefault.jpg',
              'https://img.youtube.com/vi/nmDR1GUPoQg/hqdefault.jpg',
            ],
            uploadDate: '2024-06-15T00:00:00+03:00',
            duration: 'PT37M3S',
            contentUrl: 'https://www.youtube.com/watch?v=nmDR1GUPoQg',
            embedUrl: 'https://www.youtube.com/embed/nmDR1GUPoQg',
            inLanguage: 'uk',
            keywords:
              'Smart Money, захват ликвидности, объемный анализ, смарт мани, трейдинг',

            hasPart: [
              {
                '@type': 'Clip',
                name: 'Концепция Smart Money: кто такие умные деньги на бирже',
                startOffset: 170,
                endOffset: 492,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=170',
              },
              {
                '@type': 'Clip',
                name: 'Композитный оператор: кто такие Smart Money',
                startOffset: 492,
                endOffset: 547,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=492',
              },
              {
                '@type': 'Clip',
                name: 'Уровни поддержки и сопротивления: как их правильно определять',
                startOffset: 547,
                endOffset: 656,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=547',
              },
              {
                '@type': 'Clip',
                name: 'Как увидеть Smart Money на графике через объемный анализ',
                startOffset: 656,
                endOffset: 1803,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=656',
              },
              {
                '@type': 'Clip',
                name: 'Захват ликвидности: логика ложного накола и манипуляций',
                startOffset: 1803,
                endOffset: 1888,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=1803',
              },
              {
                '@type': 'Clip',
                name: 'Основа работы любого финансового рынка: спрос и предложение',
                startOffset: 1888,
                endOffset: 2035,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=1888',
              },
              {
                '@type': 'Clip',
                name: 'Механика ложного накола: как профессионалы собирают стопы',
                startOffset: 2035,
                endOffset: 2140,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=2035',
              },
              {
                '@type': 'Clip',
                name: 'Дефицит ликвидности на рынке: почему это важно',
                startOffset: 2140,
                endOffset: 2223,
                url: 'https://www.youtube.com/watch?v=nmDR1GUPoQg&t=2140',
              },
            ],
          },
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
      '@id': 'https://arapov.trade/uk/freestudying/smartmoneyconceptsguide#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке Smart Money Concepts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Smart Money Concepts (SMC) — це методологія аналізу фінансових ринків, що базується на розумінні дій інституційних учасників: банків, хедж-фондів та маркет-мейкерів. Концепція розкриває механіку ціноутворення через аналіз ліквідності, ринкової структури та поведінки великого капіталу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке Order Block у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Order Block — це цінова зона на графіку, де інституційні учасники відкривали або закривали значні позиції перед сильним ринковим рухом. Бичачий Order Block формується останньою ведмежою свічкою перед зростанням, ведмежий — останньою бичачою свічкою перед падінням.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як визначити Fair Value Gap?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fair Value Gap (FVG) — це зона дисбалансу ціни, що виникає при різкому імпульсному русі. Бичачий FVG утворюється, коли мінімум першої свічки вище максимуму третьої свічки у висхідному русі. Ціна прагне заповнити цей розрив.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим SMC відрізняється від класичного теханалізу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Класичний теханаліз використовує індикатори (RSI, MACD), які запізнюються відносно ціни. SMC аналізує поточну динаміку ціни та обсягів у реальному часі, фокусуючись на механіці ліквідності та діях інституціоналів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як керувати ризиками при торгівлі за SMC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-лоси розміщуються за рівнями ліквідності, а не в очевидних місцях. Оптимальний ризик — 1-2% від депозиту на угоду. Використовуйте часткове закриття позицій, переведення стопу у беззбитковість та трейлінг-стоп.',
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
      '@id':
        'https://arapov.trade/uk/freestudying/smartmoneyconceptsguide#howto',
      name: 'Як торгувати за Smart Money Concepts',
      description:
        'Покроковий посібник із застосування SMC у торгівлі на фінансових ринках',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Аналіз ринкової структури',
          text: 'Визначте поточну фазу ринку: тренд або консолідація. Ідентифікуйте Break of Structure (BOS) та Change of Character (CHoCH) для розуміння напрямку руху.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначення зон ліквідності',
          text: 'Знайдіть області накопичення стоп-лосів: локальні максимуми/мінімуми, межі консолідації, очевидні рівні підтримки та опору.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Ідентифікація Order Blocks та FVG',
          text: 'Відмітьте Order Blocks — останні протилежні свічки перед імпульсом. Знайдіть Fair Value Gaps — незаповнені розриви ціни між свічками.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Очікування ретесту та підтвердження',
          text: 'Дочекайтеся повернення ціни в зону Order Block або FVG. Підтвердьте вхід свічковими патернами (пін-бар, поглинання) або збільшенням обсягів.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Управління позицією та ризиками',
          text: 'Розмістіть стоп-лос за рівнем ліквідності. Фіксуйте частковий прибуток на ключових рівнях. Переводьте стоп у беззбитковість при русі у ваш бік.',
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
      '@id':
        'https://arapov.trade/uk/freestudying/smartmoneyconceptsguide#glossary',
      name: 'Глосарій термінів Smart Money Concepts',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money Concepts',
          description:
            'Методологія аналізу ринку, що базується на розумінні дій інституційних учасників та механіки ліквідності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Order Block',
          description:
            'Цінова зона, де інституціонали відкривали або закривали значні позиції перед сильним рухом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Fair Value Gap',
          description:
            'Зона дисбалансу ціни, що виникає при різкому імпульсному русі без достатньої кількості зустрічних ордерів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Break of Structure',
          description:
            'Пробій значущого екстремуму, що підтверджує зміну тренду або продовження імпульсу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Change of Character',
          description: 'Перші ознаки можливого розвороту напрямку руху ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Grab',
          description:
            'Цілеспрямований рух ціни в зону стоп-лосів із подальшим розворотом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Liquidity Sweep',
          description:
            'Тактика вибивання стопів роздрібних трейдерів перед рухом у протилежний бік',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Інституціонали',
          description:
            'Великі учасники ринку: банки, хедж-фонди, маркет-мейкери та професійні керуючі активами',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зона ліквідності',
          description:
            'Область накопичення ордерів, де інституціонали збирають ліквідність для відкриття позицій',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Повернення ціни до пробитого рівня або зони для підтвердження зміни ролі',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
