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
  selector: 'app-home-ru-blog-fifty-four',
  templateUrl: './home-ru-blog-fifty-four.component.html',
  styleUrl: './home-ru-blog-fifty-four.component.scss',
})
export class HomeRuBlogFiftyFourComponent implements OnInit {
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

    this.ukrGroups = this.artickleServ.getRussianGroups();
    this.grr = this.artickleServ.selectedGroups;
    this.updateArticleCounts();
    this.checkedGroup = this.artickleServ.selectedGroups;

    this.titleService.setTitle(
      'Графические паттерны в трейдинге | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Графические паттерны технического анализа: треугольники, флаги, голова и плечи, двойная вершина. Как их находить и торговать пробои.',
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
    { title: 'Книги по трейдингу', link: 'https://arapov.trade/ru/books' },
    {
      title: 'Профессиональные курсы',
      link: 'https://arapov.trade/ru/studying',
    },
    {
      title: 'Базовый курс',
      link: 'https://arapov.trade/ru/freestudying/freeeducation',
    },
  ];

  onGroupChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;

    this.router.navigate(['/ru/freestudying'], {
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
      article.groupsRus.forEach((group) => {
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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

    this.router.navigate(['/ru/freestudying', nextpage]);
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
            'Графические фигуры теханализа: что реально работает, а что 50/50',
          description:
            'Графические паттерны технического анализа: треугольники, флаги, голова и плечи, двойная вершина. Как их находить и торговать пробои.',
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
            '@id': 'https://arapov.trade/ru/freestudying/chart-patterns',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/keypraicepattern.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords:
            'графические фигуры теханализа, ценовые паттерны, голова и плечи, двойная вершина, треугольник, флаг и вымпел, чашка с ручкой, паттерн 1-2-3',
          inLanguage: 'ru',
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
        'Независимый исследователь',
        'трейдер',
        'автор и основатель arapov.trade',
      ],
      description:
        'Независимый исследователь, практикующий трейдер, автор книг по трейдингу и научных публикаций. Специализируется на психологии трейдинга и когнитивных искажениях на финансовых рынках.',
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
          name: 'Работают ли графические фигуры технического анализа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Сама по себе фигура отрабатывает примерно поровну, и статистического перевеса на дистанции голый рисунок не даёт. Реально она начинает что-то значить только на сильном уровне и с подтверждением объёмом. Гуляющие по интернету проценты успешности расходятся от половины до девяноста с лишним, потому что слишком многое зависит от того, кто и как считал, поэтому кнопкой прибыли фигуру считать нельзя.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем разворотные фигуры отличаются от продолжающих?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Разворотные намекают, что тренд выдыхается и может смениться, и появляются в конце движения: это голова и плечи, двойная вершина и двойное дно. Продолжающие говорят, что после паузы тренд пойдёт в ту же сторону, и это флаг, вымпел, треугольник и чашка с ручкой. Любую из них стоит читать только вместе с объёмом и на старшем таймфрейме.',
          },
        },
        {
          '@type': 'Question',
          name: 'Какая фигура самая надёжная?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Надёжных в смысле гарантии нет, голый контур у всех даёт примерно пятьдесят на пятьдесят. Из всех фигур мне ближе флаг, потому что за ним стоит понятная механика: резкий импульс показывает, что одна сторона сильнее, а вялый откат это пауза, а не разворот. Особняком держится и паттерн 1-2-3: в нём читается логика набора позиции крупным капиталом, а вход в точке 3 даёт лучшее соотношение риска к прибыли.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему фигуры работают примерно 50 на 50?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Потому что картинка сама ничего не разворачивает, рынок двигают участники, которые в неё поверили и зашевелились. Узнаваемую фигуру видит вся толпа и ставит заявки в предсказуемых местах, а крупный капитал именно там собирает ликвидность: прокалывает границу, снимает стопы и нередко уходит в другую сторону. Поэтому я смотрю не на форму, а на уровень, ложный прокол и объём.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что использовать вместо графических фигур?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Объём, уровни и метод Вайкоффа. Я читаю, что делает крупный капитал, а не пытаюсь угадать рисунок: на каком уровне врыта ликвидность, был ли ложный прокол, что показывает объём на пробое и ретесте. Фигуру при этом знать всё равно полезно, но как карту психологии толпы, а не как сигнал для слепой торговли, и всегда со стопом и небольшим риском на сделку.',
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
      '@id': 'https://arapov.trade/ru/freestudying/chart-patterns#howto',
      name: 'Как разобраться в графических фигурах и не торговать их вслепую',
      description:
        'Пошаговый разбор ценовых паттернов и их грамотного применения через уровень и объём',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что такое ценовой паттерн и откуда он берётся',
          text: 'Ценовой паттерн это повторяющаяся фигура на графике, которую мозг находит в хаосе, но рынок не обязан её уважать.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Разделите фигуры на разворотные и продолжающие',
          text: 'Разворотные ловят конец тренда, продолжающие его паузу, и любую читают только вместе с объёмом и на старшем таймфрейме.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Изучите разворотные фигуры',
          text: 'Голова и плечи и двойная вершина с дном подтверждаются только пробоем линии шеи на возросшем объёме, до этого они лишь набросок.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Изучите фигуры продолжения',
          text: 'Треугольник, флаг, вымпел и чашка с ручкой показывают паузу в тренде, а вход берут после закрепления за границей с подтверждением объёмом.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Освойте паттерн 1-2-3 для входа за крупным капиталом',
          text: 'Паттерн 1-2-3 на сильном уровне даёт вход в точке 3 с коротким стопом и лучшим соотношением риска к прибыли.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Торгуйте контекст, а не рисунок',
          text: 'Голая фигура отрабатывает примерно поровну, поэтому решает уровень, ложный прокол и объём, а не форма, и всегда со стопом.',
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
      name: 'Глоссарий терминов статьи',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ценовой паттерн',
          description:
            'Повторяющаяся фигура на графике цены, по которой трейдеры пытаются предсказать дальнейшее движение, часть классического технического анализа.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Голова и плечи',
          description:
            'Разворотная фигура из трёх вершин с более высокой центральной и линией шеи под ними, пробой которой принято считать сигналом разворота тренда.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Двойная вершина',
          description:
            'Разворотный паттерн на вершине восходящего тренда, где цена дважды упирается примерно в один уровень и второй раз не может его пробить.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Треугольник',
          description:
            'Паттерн консолидации между двумя сходящимися линиями, где амплитуда колебаний и объём затухают перед выходом цены импульсом за одну из границ.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Флаг',
          description:
            'Паттерн продолжения тренда, в котором после резкого импульса цена входит в небольшой наклонный коридор против движения, а затем пробивает его в сторону тренда.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'вымпел',
          description:
            'Паттерн продолжения тренда после импульса, чья консолидация имеет форму маленького сходящегося треугольника, а не параллельного коридора, как у флага.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Чашка с ручкой',
          description:
            'Бычий паттерн продолжения тренда, в котором за плавной закруглённой коррекцией следует короткий откат-ручка, после чего цена пробивает прежний максимум вверх.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Паттерн 1-2-3',
          description:
            'Разворотная фигура из трёх точек, где точка 1 фиксирует экстремум старого движения, точка 2 первый откат, а точка 3 повторный откат, не обновляющий точку 1.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
