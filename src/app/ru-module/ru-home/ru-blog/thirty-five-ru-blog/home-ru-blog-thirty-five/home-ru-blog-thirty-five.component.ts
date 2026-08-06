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
  selector: 'app-home-ru-blog-thirty-five',
  templateUrl: './home-ru-blog-thirty-five.component.html',
  styleUrl: './home-ru-blog-thirty-five.component.scss',
})
export class HomeRuBlogThirtyFiveComponent implements OnInit {
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
      'Трейдер и инвестор: в чём разница | Arapov.trade',
    );
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Чем трейдер отличается от инвестора, что лучше — трейдинг или инвестиции, в чём разница в горизонте, рисках и подходе к рынку.',
    });
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
          headline: 'Трейдинг vs инвестиции: в чём разница и что выбрать',
          description:
            'Чем трейдер отличается от инвестора, что лучше — трейдинг или инвестиции, в чём разница в горизонте, рисках и подходе к рынку.',
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
            '@id': 'https://arapov.trade/ru/freestudying/trading-vs-investing',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tradingandinvestments.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Словарь трейдера',
          keywords: 'трейдинг',
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
          name: 'В чём разница между трейдингом и инвестициями?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдер зарабатывает на разнице цен в коротком горизонте, покупая дешевле и продавая дороже. Инвестор покупает актив надолго и зарабатывает на его росте и денежном потоке вроде дивидендов. У инвестора под активом есть прибавочная стоимость, у трейдера только разница цен, поэтому трейдинг это работа, а инвестиции ближе к владению.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что выгоднее: трейдинг или инвестиции?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Доходность трейдинга потенциально выше, но нестабильнее и достаётся тяжелее, это плата за время, навык и риск. Инвестиции растут медленнее, зато спокойнее и предсказуемее. Что выгоднее, зависит от того, сколько времени и нервов вы готовы вложить, и большинство активных новичков в минусе именно потому, что лезут в трейдинг без системы.',
          },
        },
        {
          '@type': 'Question',
          name: 'Трейдинг это казино?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Без системы и без стопа, да, на полном плече это казино, и депозит уйдёт, это только вопрос времени. С торговой системой, обязательным стопом и небольшим риском на сделку трейдинг превращается в ремесло, где на дистанции решает не угадывание, а контроль риска и математическое ожидание.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем отличается контроль риска?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'В трейдинге риск быстрый, защита механическая: стоп-лосс и небольшой риск на сделку. В инвестировании риск медленный, и работают диверсификация и длинный горизонт, который сглаживает просадки. Но контроль риска нужен и там, и там, без него обнуляется любой счёт.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли совмещать трейдинг и инвестиции?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, и многие так и делают: основную часть капитала держат в долгосрочных вложениях, а небольшой частью активно торгуют. Это разумный гибрид, если хватает времени и дисциплины на обе роли. По моему опыту новичку, который не готов сидеть в графике каждый день, спокойнее начать с инвестиций.',
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
      '@id': 'https://arapov.trade/ru/freestudying/trading-vs-investing#howto',
      name: 'Как разобраться и применять: Трейдинг vs инвестиции: в чём разница и что выбрать',
      description:
        'Пошаговый разбор темы и её практическое применение в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Чем трейдинг отличается от инвестиций по сути',
          text: 'Трейдинг это активная торговля, при которой зарабатывают на разнице цен: купить дешевле, продать дороже и зафиксировать прибыль на коротком отрезке.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Трейдер vs инвестор: цели, горизонт, вовлечённость',
          text: 'Из этой разницы вытекают и совершенно разные образ жизни, горизонт и цели.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Что выгоднее и трейдинг это казино или нет',
          text: 'Доходность трейдинга потенциально выше, но достаётся куда тяжелее, и тут же рождается главный миф о казино.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Контроль рисков и что выбрать новичку',
          text: 'Самое практичное в том, что риск у этих двух подходов устроен совершенно по-разному.',
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
      name: 'Глоссарий трейдинга',
      description: 'Основные термины биржевой торговли',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Деятельность по покупке и продаже финансовых инструментов с целью получения прибыли от изменения их стоимости',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Защитный ордер, автоматически закрывающий позицию при достижении заданного уровня убытка',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технический анализ',
          description:
            'Метод прогнозирования цен на основе изучения графиков и исторических данных о движении котировок',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальный анализ',
          description:
            'Метод оценки стоимости активов на основе экономических показателей, новостей и финансовых отчётов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильность',
          description:
            'Мера изменчивости цены актива, показывающая амплитуду колебаний котировок за определённый период',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Способность актива быстро продаваться или покупаться без существенного влияния на его цену',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Разница между ценой покупки (ask) и ценой продажи (bid) финансового инструмента',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпинг',
          description:
            'Стиль торговли с множеством краткосрочных сделок, направленный на получение небольшой прибыли с каждой операции',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свинг-трейдинг',
          description:
            'Стиль торговли с удержанием позиций от нескольких дней до недель для захвата среднесрочных ценовых движений',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсификация',
          description:
            'Распределение капитала между различными активами для снижения общего риска инвестиционного портфеля',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
