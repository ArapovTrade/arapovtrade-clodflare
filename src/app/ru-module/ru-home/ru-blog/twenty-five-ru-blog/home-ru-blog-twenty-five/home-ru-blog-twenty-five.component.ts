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
  selector: 'app-home-ru-blog-twenty-five',
  templateUrl: './home-ru-blog-twenty-five.component.html',
  styleUrl: './home-ru-blog-twenty-five.component.scss',
})
export class HomeRuBlogTwentyFiveComponent implements OnInit {
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
      'Усреднение и мартингейл в трейдинге | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое усреднение и метод мартингейла, почему они кажутся выгодными и как именно сливают депозит новичков. Психология и математика риска.',
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
          headline: 'Усреднение и мартингейл: почему доливать в убыток опасно',
          description:
            'Что такое усреднение и метод мартингейла, почему они кажутся выгодными и как именно сливают депозит новичков. Психология и математика риска.',
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
            '@id': 'https://arapov.trade/ru/freestudying/averaging-martingale',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/averagingintrading.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Психология трейдинга',
          keywords:
            'усреднение в трейдинге, метод мартингейла, усреднение против тренда, психология усреднения, риск-менеджмент',
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
          name: 'Что такое усреднение в трейдинге простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это долив к уже открытой позиции по новой цене, чтобы сдвинуть среднюю цену входа. Купили биткоин по десять тысяч, цена упала до пяти, докупили ещё один, и средняя стала семь с половиной. Выйти в ноль теперь нужно вдвое меньшим движением, но если долив идёт против тренда, это лишь оттягивает слив депозита.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему усреднение против тренда опасно для новичка?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Потому что вы докупаете на слабом рынке, а падает он часто именно затем, чтобы вынести упрямых покупателей. Долив без стопа снимает у убытка потолок, и одна позиция способна обнулить счёт. Тренды уходят дальше, чем кажется: евро к доллару в 2014-2015 годах сполз с 1.40 примерно до 1.05 за несколько месяцев, и никакое усреднение там не спасало.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое метод Мартингейла и почему он обнуляет депозит?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это удвоение объёма после каждого убытка ради отыгрыша всех потерь одной сделкой. Ставка растёт по экспоненте: один, два, четыре, восемь и так далее, и уже на седьмом убытке подряд нужна сумма в 128 раз больше начальной. Рынок способен идти против позиции дольше, чем у трейдера хватает денег удваиваться, поэтому длинная серия убытков стирает счёт.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему трейдеры усредняют в минус, хотя это рискованно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Причина психологическая. Признать убыток больно, ведь это значит признать ошибку, и вместо стопа включаются отрицание и надежда на разворот. Долив даёт ложное чувство контроля, но по сути это спор не с рынком, а с собственным эго, и маленький убыток он превращает в большой.',
          },
        },
        {
          '@type': 'Question',
          name: 'Когда усреднение вообще допустимо?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Только по тренду, малым лотом и обязательно со стопом на всю позицию. Это усиление уже работающей прибыльной сделки на откате, а не спасение тонущей. По моему опыту новичку лучше про усреднение забыть и сначала окрепнуть на обычной торговле с понятным стопом и аккуратным риском.',
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
      '@id': 'https://arapov.trade/ru/freestudying/averaging-martingale#howto',
      name: 'Как не слить депозит на усреднении и мартингейле',
      description:
        'Пошаговый разбор усреднения и метода Мартингейла и их безопасное применение в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, что такое усреднение и как считается средняя цена',
          text: 'Усреднение это долив к открытой позиции по новой цене, чтобы сдвинуть среднюю цену входа ближе к рынку.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Разберитесь, почему долив против тренда сливает счёт',
          text: 'Доливая против тренда, вы покупаете там, где рынок выносит упрямцев, а усреднение без стопа снимает у убытка потолок.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Увидьте психологию за доливом в минус',
          text: 'Трейдер усредняет в убыток, потому что не хочет признать ошибку, и спорит не с рынком, а с собственным эго.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Поймите математику Мартингейла',
          text: 'Удвоение после убытка растёт по экспоненте и на седьмом убытке требует суммы в 128 раз больше начальной, поэтому длинная серия обнуляет счёт.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Защититесь планом, фиксированным риском и доливом только по тренду',
          text: 'Заранее поставленный стоп, малый фиксированный риск и долив только в сторону прибыльного движения убирают саму ловушку.',
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
          name: 'Усреднение',
          description:
            'Долив к уже открытой позиции по новой цене, чтобы сдвинуть среднюю цену входа; против тренда лишь наращивает убыток, по тренду со стопом усиливает работающую сделку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Метод Мартингейла',
          description:
            'Стратегия управления ставкой, при которой объём следующей сделки удваивается после каждого убытка в расчёте отыграть все потери одной выигрышной сделкой.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
