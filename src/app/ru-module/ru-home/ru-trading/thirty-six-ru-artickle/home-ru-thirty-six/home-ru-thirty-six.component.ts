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
  selector: 'app-home-ru-thirty-six',
  templateUrl: './home-ru-thirty-six.component.html',
  styleUrl: './home-ru-thirty-six.component.scss',
})
export class HomeRuThirtySixComponent implements OnInit {
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
      'Механика ложных пробоев в трейдинге | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Механика ложных пробоев в трейдинге: как крупный капитал манипулирует рынком, методы идентификации и стратегии торговли против манипуляций Smart Money',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-05' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/falsebreakouts.webp',
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
          headline: 'Механика ложных пробоев в трейдинге',
          description:
            'Полное руководство по ложным пробоям: как крупный капитал манипулирует рынком, методы идентификации манипуляций и практические стратегии торговли',
          image: 'https://arapov.trade/assets/img/content/falsebreakouts1.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/ru/freestudying/falsebreakouts',
          },
          articleSection: 'Трейдинг',
          keywords: [
            'ложный пробой',
            'fake breakout',
            'Smart Money',
            'манипуляции рынка',
            'сбор ликвидности',
            'технический анализ',
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
      '@id': 'https://arapov.trade/ru#person',
      name: 'Игорь Арапов',
      alternateName: [
        'Igor Arapov',
              'Арапов Игорь',
              'I. Arapov',
              'Ігор Арапов',
              'І. В. Арапов',
              'Арапов Ігор',
              'Arapov Igor',
      ],
      url: 'https://arapov.trade/ru',
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
      jobTitle: ['Независимый исследователь', 'трейдер', 'автор и основатель arapov.trade'],
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
          name: 'Что такое ложный пробой в трейдинге?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ложный пробой — это кратковременный выход цены за границу значимого уровня поддержки или сопротивления с последующим быстрым возвратом. Такое движение создаёт иллюзию начала нового тренда, провоцируя трейдеров на вход в убыточные позиции.',
          },
        },
        {
          '@type': 'Question',
          name: 'Почему Smart Money создают ложные пробои?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Институциональные игроки используют ложные пробои для сбора ликвидности (стоп-ордеров розничных трейдеров), создания эмоционального давления на рынок и получения выгодных цен для входа в крупные позиции перед основным движением.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как отличить ложный пробой от истинного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ключевые признаки ложного пробоя: отсутствие роста объёмов при пробое, быстрый возврат цены в диапазон в течение 5-10 свечей, формирование разворотных свечных паттернов, дивергенции на индикаторах и отсутствие закрепления за уровнем.',
          },
        },
        {
          '@type': 'Question',
          name: 'В каких рыночных условиях чаще происходят ложные пробои?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ложные пробои наиболее вероятны перед публикацией важных новостей, во время сессионных переходов между торговыми площадками, в периоды длительной консолидации, а также во время праздников и экспирации деривативов.',
          },
        },
        {
          '@type': 'Question',
          name: 'Как торговать против ложных пробоев?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основные стратегии: ожидание подтверждения пробоя и ретеста уровня, вход в противоположном направлении после идентификации манипуляции, анализ объёмов и свечных паттернов для подтверждения, использование коротких стоп-приказов за экстремумом ложного движения.',
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
      name: 'Как идентифицировать и торговать ложные пробои',
      description:
        'Пошаговое руководство по распознаванию манипуляций крупного капитала и использованию ложных пробоев в торговле',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Определите ключевые уровни',
          text: 'Отметьте на графике значимые уровни поддержки и сопротивления, где концентрируются стоп-ордера большинства трейдеров. Это потенциальные зоны для манипуляций Smart Money.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Анализируйте объёмы при пробое',
          text: 'Наблюдайте за объёмами торгов в момент пробоя уровня. Истинный пробой сопровождается значительным ростом объёмов. Отсутствие объёмного подтверждения указывает на потенциальную манипуляцию.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дождитесь реакции цены',
          text: 'Не входите в рынок сразу после пробоя. Дождитесь закрытия свечи за уровнем и понаблюдайте за поведением цены. Быстрый возврат в диапазон сигнализирует о ложном пробое.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Используйте подтверждающие сигналы',
          text: 'Ищите разворотные свечные паттерны (пин-бары, поглощения), дивергенции на индикаторах RSI или MACD, а также признаки отвержения ценой новой зоны в виде длинных теней свечей.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Войдите в позицию с контролем риска',
          text: 'После подтверждения ложного пробоя откройте позицию в направлении возврата цены. Разместите стоп-приказ за экстремумом ложного движения и используйте частичную фиксацию прибыли.',
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
      name: 'Глоссарий терминов по ложным пробоям',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Ложный пробой',
          description:
            'Кратковременный выход цены за значимый уровень поддержки или сопротивления с последующим быстрым возвратом в исходный диапазон',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description:
            'Институциональные игроки и крупный капитал, способный влиять на движение цены и использующий манипуляции для получения выгодных позиций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ликвидность',
          description:
            'Совокупность стоп-ордеров и отложенных заявок участников рынка, которую крупный капитал использует для входа и выхода из позиций',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Сбор ликвидности',
          description:
            'Процесс выбивания стоп-ордеров розничных трейдеров крупным капиталом для накопления объёма перед направленным движением',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-хантинг',
          description:
            'Целенаправленное движение цены к зонам концентрации защитных приказов для их срабатывания и последующего разворота',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест уровня',
          description:
            'Возврат цены к пробитому уровню для проверки его трансформации из сопротивления в поддержку или наоборот',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Импульсный пробой',
          description:
            'Резкий выход цены за уровень с мгновенным возвратом, характерный для манипуляций во время новостей',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Объёмный анализ',
          description:
            'Метод оценки подлинности ценовых движений через анализ торговых объёмов и их распределения',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дивергенция',
          description:
            'Расхождение между направлением движения цены и показаниями технических индикаторов, указывающее на ослабление импульса',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Зона консолидации',
          description:
            'Горизонтальный диапазон движения цены, где происходит накопление или распределение позиций крупными игроками',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
