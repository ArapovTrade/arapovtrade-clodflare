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
  selector: 'app-home-ru-blog-fifty-nine',
  templateUrl: './home-ru-blog-fifty-nine.component.html',
  styleUrl: './home-ru-blog-fifty-nine.component.scss',
})
export class HomeRuBlogFiftyNineComponent implements OnInit {
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
      'Нейросети и ИИ в трейдинге: что умеют | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что нейросети реально умеют на рынке, а что им не под силу, почему ИИ не предсказывает будущее и как использовать его как инструмент, а не оракула.',
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
            'ИИ в трейдинге и прогноз цены: что нейросети умеют и где их предел',
          description:
            'Что нейросети реально умеют на рынке, а что им не под силу, почему ИИ не предсказывает будущее и как использовать его как инструмент, а не оракула.',
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
            '@id': 'https://arapov.trade/ru/freestudying/ai-in-trading',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ai-trading.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технический анализ',
          keywords:
            'ИИ в трейдинге, нейросеть прогноз цены, может ли ИИ предсказать цену, переобучение, математическое ожидание, объёмный анализ',
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
          name: 'Может ли нейросеть предсказать цену акции или биткоина?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Надёжно нет, и это касается и нейросети, и человека. ИИ неплохо ловит закономерности в прошлых данных и выдаёт вероятные сценарии, но с удлинением горизонта точность падает, и уже на дистанции в месяц-три опускается ниже половины, то есть до случайного угадывания. Цена меняется тогда, когда меняются ожидания толпы и действия крупного капитала, а не по расписанию, которое можно вычислить наперёд.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое ИИ в трейдинге простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это применение нейросетей и алгоритмов машинного обучения для анализа рынка: обработки данных, поиска закономерностей и подготовки вероятных сценариев. Чаще всего речь о чат-сервисах и аналитических моделях, которые помогают трейдеру думать, а не торгуют вместо него. Сделки они обычно не исполняют и счётом не управляют.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что нейросеть реально умеет в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Лучше всего ИИ работает не с будущим рынка, а с вашими собственными данными. Загрузите таблицу сделок, и за минуту он покажет, в какие часы и на каких инструментах вы теряете чаще и где проседает дисциплина. Он фильтрует неликвидные активы, проверяет логику стратегии и подсказывает её слабые места. Но это зеркало вашего прошлого, а не прогноз будущего, и прибыль он не гарантирует.',
          },
        },
        {
          '@type': 'Question',
          name: 'Заменит ли ИИ трейдера и его метод?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Нет. ИИ учится на прошлом, а рынок постоянно меняют новые участники, новости и эмоции толпы, поэтому модель быстро устаревает, а сложная ещё и переобучается под историю. Нейросеть полезна как ассистент поверх торговой системы, но не вместо неё. Где вход, где стоп и каким риском торговать, решает метод и дисциплина, а не подсказка модели.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как зарабатывать, если цену нельзя предсказать?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Через положительное математическое ожидание, а не через угадывание каждой сделки. При соотношении риска к прибыли 1:3 система держится в плюсе даже при сорока процентах прибыльных сделок. Около трети сделок неизбежно убыточны, а минусы идут сериями, поэтому риск на сделку держат крошечным, в районе одного-двух процентов, и всегда со стопом.',
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
      '@id': 'https://arapov.trade/ru/freestudying/ai-in-trading#howto',
      name: 'Как использовать ИИ в трейдинге и не попасть в ловушку прогноза',
      description:
        'Пошаговый разбор роли нейросетей в трейдинге и работы с вероятностями вместо предсказаний',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что такое ИИ в трейдинге',
          text: 'ИИ в трейдинге это нейросети и машинное обучение для анализа данных и вероятных сценариев, а не бот, торгующий вместо вас.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Осознайте, что точного прогноза цены нет',
          text: 'Ни нейросеть, ни человек не предскажут цену надёжно, потому что её двигают ожидания толпы и крупный капитал, а не расписание.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Используйте ИИ как зеркало своей торговли',
          text: 'Загрузите журнал сделок, и ИИ покажет, когда и на чём вы теряете, но это разбор прошлого, а не прогноз будущего.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Держите ИИ ассистентом поверх системы',
          text: 'ИИ учится на прошлом и переобучается, поэтому решение о входе, стопе и риске остаётся за методом и дисциплиной.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Зарабатывайте на вероятностях и математическом ожидании',
          text: 'Соотношение риска к прибыли 1:3 и крошечный риск на сделку выводят систему в плюс без угадывания цены.',
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
          name: 'ИИ в трейдинге',
          description:
            'Применение нейросетей и алгоритмов машинного обучения для анализа рынка: обработки данных, поиска закономерностей и подготовки вероятных сценариев, а не исполнения сделок вместо трейдера.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'переобучение',
          description:
            'Ситуация, когда модель тем точнее описывает прошлые данные, чем хуже реагирует на текущий рынок, идеально объясняя историю и теряясь в новых условиях.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
