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
  selector: 'app-home-uk-twenty-six',
  templateUrl: './home-uk-twenty-six.component.html',
  styleUrl: './home-uk-twenty-six.component.scss',
})
export class HomeUkTwentySixComponent implements OnInit {
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
      'Технічний аналіз ринку: методи та принципи прогнозування',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Повний посібник з технічного аналізу фінансових ринків. Вивчіть індикатори, патерни, рівні підтримки та опору для успішної торгівлі.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });
    this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/technicalanalysis.webp',
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
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/technicalanalysis',
          },
          headline: 'Технічний аналіз ринку: методи та принципи прогнозування',
          description:
            'Повний посібник з технічного аналізу фінансових ринків. Вивчіть індикатори, патерни, рівні підтримки та опору для успішної торгівлі.',
          image:
            'https://arapov.trade/assets/img/content/technicalanalysis.webp',
          datePublished: '2025-06-11T00:00:00+03:00',
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
            name: 'Технический анализ для начинающих трейдеров | Полное руководство',
            description:
              'Технический анализ для начинающих трейдеров. Узнайте, как использовать технический анализ рынка. Разбираем основные инструменты: уровни поддержки и сопротивления, наклонные каналы, соотношение риск/прибыль.',
            thumbnailUrl: [
              'https://img.youtube.com/vi/dOCLBmevcSU/maxresdefault.jpg',
              'https://img.youtube.com/vi/dOCLBmevcSU/hqdefault.jpg',
            ],
            uploadDate: '2025-11-14T00:00:00+02:00',
            duration: 'PT10M59S',
            contentUrl: 'https://www.youtube.com/watch?v=dOCLBmevcSU',
            embedUrl: 'https://www.youtube.com/embed/dOCLBmevcSU',
            inLanguage: 'ru',
            keywords:
              'технический анализ, уровни поддержки и сопротивления, наклонные каналы, трейдинг для начинающих',
            hasPart: [
              {
                '@type': 'Clip',
                name: 'Технический анализ рынка - что это и зачем нужен',
                startOffset: 103,
                endOffset: 148,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=103',
              },
              {
                '@type': 'Clip',
                name: 'Определение технического анализа и методы прогнозирования',
                startOffset: 148,
                endOffset: 190,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=148',
              },
              {
                '@type': 'Clip',
                name: 'Вероятности в трейдинге и винрейт технического анализа',
                startOffset: 190,
                endOffset: 230,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=190',
              },
              {
                '@type': 'Clip',
                name: 'Объемный анализ vs технический анализ - что эффективнее',
                startOffset: 230,
                endOffset: 261,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=230',
              },
              {
                '@type': 'Clip',
                name: 'Уровни поддержки и сопротивления - как строить и применять',
                startOffset: 261,
                endOffset: 300,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=261',
              },
              {
                '@type': 'Clip',
                name: 'Почему рынок реагирует на уровни поддержки и сопротивления',
                startOffset: 300,
                endOffset: 330,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=300',
              },
              {
                '@type': 'Clip',
                name: 'Когда использовать уровни в боковом движении',
                startOffset: 330,
                endOffset: 340,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=330',
              },
              {
                '@type': 'Clip',
                name: 'Наклонные каналы в трейдинге - построение и применение',
                startOffset: 340,
                endOffset: 390,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=340',
              },
              {
                '@type': 'Clip',
                name: 'Медвежий канал - как строить и торговать в нисходящем тренде',
                startOffset: 390,
                endOffset: 440,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=390',
              },
              {
                '@type': 'Clip',
                name: 'Бычий канал - восходящий тренд и правила торговли',
                startOffset: 440,
                endOffset: 659,
                url: 'https://www.youtube.com/watch?v=dOCLBmevcSU&t=440',
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
          name: 'Що таке технічний аналіз ринку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Технічний аналіз — метод прогнозування цінових рухів на основі історичних даних про ціну, обсяги торгів та графічних патернів. Він дозволяє виявляти тренди, визначати точки входу та виходу з позицій.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які основні принципи технічного аналізу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Три фундаментальні принципи: ціна враховує все (вся інформація відображена в котируваннях), цінові рухи не випадкові (ціни слідують трендам та патернам), історія повторюється (ринкова психологія формує моделі, що повторюються).',
          },
        },
        {
          '@type': 'Question',
          name: 'Які інструменти використовуються в технічному аналізі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні інструменти включають рівні підтримки та опору, трендові лінії, графічні патерни (трикутники, голова і плечі), технічні індикатори (RSI, MACD, ковзні середні) та аналіз обсягів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим технічний аналіз відрізняється від фундаментального?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Технічний аналіз вивчає цінові графіки та статистичні індикатори, ігноруючи внутрішню вартість активу. Фундаментальний аналіз оцінює економічні показники, фінансову звітність та макроекономічні фактори.',
          },
        },
        {
          '@type': 'Question',
          name: 'На яких ринках застосовний технічний аналіз?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Технічний аналіз універсальний та застосовується на форекс, фондовому ринку, криптовалютах, сировинних товарах та індексах. Методи адаптуються під волатильність та ліквідність конкретного ринку.',
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
      name: 'Як застосовувати технічний аналіз у торгівлі',
      description:
        'Покрокове керівництво з використання технічного аналізу для прийняття торгових рішень',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Оберіть таймфрейм',
          text: 'Визначте часовий інтервал для аналізу: хвилинні графіки для скальпінгу, годинні для дейтрейдингу, денні та тижневі для свінг-трейдингу та інвестування.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте тренд',
          text: 'Використовуйте трендові лінії та ковзні середні для виявлення напрямку ринку. Перетин швидкої та повільної EMA підтверджує зміну тренду.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Знайдіть ключові рівні',
          text: 'Побудуйте рівні підтримки та опору на основі історичних максимумів та мінімумів. Ці зони визначають потенційні точки розвороту або пробою.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Проаналізуйте патерни та індикатори',
          text: 'Шукайте графічні фігури та підтверджуйте сигнали технічними індикаторами. Комбінація RSI, MACD та обсягів підвищує надійність аналізу.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Керуйте ризиками',
          text: 'Встановіть стоп-лосс за рівнем підтримки або опору. Розрахуйте розмір позиції виходячи з допустимого ризику на угоду.',
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
      name: 'Терміни технічного аналізу',
      description: 'Глосарій ключових термінів технічного аналізу ринку',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description:
            'Метод прогнозування цін на основі вивчення історичних даних, графіків та статистичних індикаторів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень підтримки',
          description:
            'Цінова зона, де попит перевищує пропозицію і ціна схильна відскакувати вгору',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень опору',
          description:
            'Цінова зона, де пропозиція перевищує попит і ціна схильна розвертатися вниз',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тренд',
          description:
            'Стійкий напрямок руху ціни: висхідний (бичачий), низхідний (ведмежий) або боковий (флет)',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Патерн',
          description:
            'Графічна модель на ціновому графіку, що дозволяє прогнозувати подальший рух ціни',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Індикатор',
          description:
            'Математичний розрахунок на основі ціни або обсягу, що візуалізує ринкові умови',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Обсяг торгів',
          description:
            'Кількість одиниць активу, куплених та проданих за певний період часу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ковзна середня',
          description:
            'Індикатор, що згладжує цінові дані шляхом усереднення цін за певний період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пробій',
          description:
            'Подолання ціною рівня підтримки або опору із закріпленням за ним',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Таймфрейм',
          description:
            'Часовий інтервал, за який формується одна свічка або бар на графіку',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
