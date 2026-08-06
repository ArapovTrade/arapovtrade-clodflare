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
  selector: 'app-home-ru-blog-four',
  templateUrl: './home-ru-blog-four.component.html',
  styleUrl: './home-ru-blog-four.component.scss',
})
export class HomeRuBlogFourComponent implements OnInit {
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

    this.titleService.setTitle('Концепция Smart Money (SMC) | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Что такое Smart Money Concept: структура рынка, ликвидность, Order Blocks и FVG. Как торгуют крупные игроки и как читать их следы.',
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
            'Smart Money: полный гайд по концепции умных денег в трейдинге',
          description:
            'Что такое Smart Money Concept: структура рынка, ликвидность, Order Blocks и FVG. Как торгуют крупные игроки и как читать их следы.',
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
            '@id': 'https://arapov.trade/ru/freestudying/smart-money-guide',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/smartmoneyconceptsguide.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Smart Money',
          keywords:
            'Smart Money, умные деньги, охота за стопами, ложный пробой, ловушки Smart Money, ордер-блок, ликвидность, SMC',
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
          name: 'Кто такие Smart Money простыми словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это крупные профессиональные участники рынка: банки, фонды и маркетмейкеры. У них большой капитал и доступ к информации, поэтому именно они двигают цену, а розничная толпа чаще идёт следом.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чем Smart Money отличаются от розничных трейдеров?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Подходом. Толпа торгует на эмоциях, спешит и гоняется за движением, покупая дорого. Крупные действуют холодно, по плану и с терпением, покупая дёшево и продавая дорого.',
          },
        },
        {
          '@type': 'Question',
          name: 'Что такое охота за стопами (Stop Hunting)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Это намеренное движение цены к зонам скопления стоп-лоссов, чтобы выбить их и собрать ликвидность. Крупные игроки продавливают цену туда, где стоят стопы толпы, забирают эти заявки и разворачивают рынок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как отличить ложный пробой от настоящего?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Главный признак это объём. Настоящий пробой идёт на растущем объёме и закрепляется за уровнем, а ложный выскакивает на тонком объёме и быстро возвращается в диапазон. Быстрый разворот после прокола это явная ловушка.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как увидеть Smart Money на графике?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'По следам: аномальным всплескам объёма, снятию ликвидности через ложные проколы уровней и фазам накопления и распределения. Главный инструмент здесь объёмный анализ, без него любая зона это гадание.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как защититься от манипуляций Smart Money?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Не ставьте стоп в самых очевидных местах, вплотную за экстремумом или круглым уровнем, давайте ему запас. Не входите в момент прокола, а дождитесь, пока ловушка отработает и цена подтвердит разворот на объёме.',
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
      '@id': 'https://arapov.trade/ru/freestudying/smart-money-guide#howto',
      name: 'Как читать рынок по концепции Smart Money',
      description:
        'Пошаговый разбор: кто такие умные деньги, как они манипулируют ценой и как идти за ними по следу в объёме',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Поймите, кто такие Smart Money',
          text: 'Smart Money это крупные участники с большим капиталом и информацией: банки, фонды и маркетмейкеры, которые покупают дёшево и продают дорого.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Разберитесь, как они набирают позицию',
          text: 'Крупный капитал дробит объём на мелкие и айсберг-ордера, тихо накапливая позицию внизу и распределяя её наверху по логике Вайкоффа.',
        },
        {
          '@type': 'HowToStep',
          name: 'Увидьте фазы Вайкоффа за Smart Money',
          text: 'Крупный капитал работает по сценарию Вайкоффа: накопление в боковике внизу, тренд по пути наименьшего сопротивления и распределение наверху; падение часто начинается из-за дефицита спроса, а не агрессии продавцов.',
          position: 3,
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Поймите механику контроля',
          text: 'Контроль это работа с предсказуемостью толпы и ликвидностью у очевидных уровней, а не тайный заговор против вас.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Распознавайте ловушки и ложный пробой',
          text: 'Охота за стопами и ложный пробой выбивают стопы толпы; отличает ложный прокол от настоящего объём.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Ищите след на графике',
          text: 'Крупного выдают всплеск объёма, снятие ликвидности проколом и боковик накопления, но без объёма любая зона это гадание.',
        },
        {
          '@type': 'HowToStep',
          name: 'Подтверждайте след объёмом, а не только ценой',
          text: 'Ордер-блоки и имбалансы по чистой цене легко подогнать задним числом; добавляйте биржевой объём с CME как реальный след крупного капитала, ведь повышенный объём на росте выдаёт покупателя, на падении продавца.',
          position: 7,
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: 'Освойте элементы SMC',
          text: 'Ликвидность, ордер-блок, имбаланс и структура (BOS и CHoCH) это инструменты концепции, но новичку важнее структура и объём.',
        },
        {
          '@type': 'HowToStep',
          name: 'Не верьте мифам SMC и держите риск',
          text: 'Манипуляция это не заговор против вас, а нужда крупного капитала в ликвидности у скоплений стопов; не входите в каждую зону подряд и всегда торгуйте со стопом и расчётом риска на сделку.',
          position: 9,
        },
        {
          '@type': 'HowToStep',
          position: 10,
          name: 'Входите за крупным после ловушки',
          text: 'Найдите импульсный уровень, дождитесь захвата ликвидности и ложного накола, и входите за крупным со стопом за прокол при риске к прибыли от 1:3.',
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
          name: 'Smart Money',
          description:
            'Крупные профессиональные участники рынка, которые обладают большим капиталом и доступом к информации, недоступной обычному трейдеру; дословно умные деньги.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Stop Hunting',
          description:
            'Намеренное движение цены к зонам, где скопились стоп-лоссы трейдеров, чтобы выбить эти заявки и использовать их как ликвидность; по-русски сбор стопов.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фаза накопления',
          description:
            'Боковик, чаще после долгого падения, в котором крупный капитал тихо набирает позицию у напуганной толпы, распродающей активы внизу; внешне скучный диапазон, в котором закладывается будущее движение.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
