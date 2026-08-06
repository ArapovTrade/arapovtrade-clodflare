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
  selector: 'app-home-uk-blog-thirty-five',
  templateUrl: './home-uk-blog-thirty-five.component.html',
  styleUrl: './home-uk-blog-thirty-five.component.scss',
})
export class HomeUkBlogThirtyFiveComponent implements OnInit {
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
      'Трейдер та інвестор: у чому різниця | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-25' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-06-25' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Чим трейдер відрізняється від інвестора, що краще — трейдинг чи інвестиції, у чому різниця в горизонті, ризиках і підході до ринку.',
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
          headline: 'Трейдинг vs інвестиції: у чому різниця і що обрати',
          description:
            'Чим трейдер відрізняється від інвестора, що краще — трейдинг чи інвестиції, у чому різниця в горизонті, ризиках і підході до ринку.',
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
            '@id': 'https://arapov.trade/uk/freestudying/trading-vs-investing',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tradingandinvestments.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Трейдинг проти інвестицій',
          keywords:
            'трейдинг проти інвестицій, трейдер проти інвестора, різниця, контроль ризику, горизонт, дивіденди, стоп-лосс',
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
          name: 'У чому різниця між трейдингом та інвестиціями?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Трейдер заробляє на різниці цін у короткому горизонті, купуючи дешевше й продаючи дорожче. Інвестор купує актив надовго й заробляє на його зростанні та грошовому потоці на кшталт дивідендів. Трейдинг це робота, інвестиції ближчі до володіння.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що вигідніше: трейдинг чи інвестиції?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Дохідність трейдингу потенційно вища, але нестабільніша й дається важче це плата за час, навичку й ризик. Інвестиції зростають повільніше, зате спокійніше. Що вигідніше, залежить від того, скільки часу й нервів ви готові вкласти.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняється контроль ризику?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У трейдингу ризик швидкий, захист механічний: стоп-лосс і невеликий ризик на угоду. В інвестуванні ризик повільний, і працюють диверсифікація та довгий горизонт, що згладжує просадки. Але контроль ризику потрібен і там, і там.',
          },
        },
        {
          '@type': 'Question',
          name: 'З чого краще почати новачкові?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'За моїм досвідом тому, хто не готовий сидіти в графіку щодня, спокійніше почати з інвестицій. Можна й поєднувати: основну частину капіталу тримати в довгострокових вкладеннях, а невеликою частиною активно торгувати, якщо вистачає дисципліни.',
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
      '@id': 'https://arapov.trade/uk/freestudying/trading-vs-investing#howto',
      name: 'Як обрати між трейдингом та інвестиціями',
      description:
        'Покроковий розбір того, чим трейдинг та інвестиції різняться по суті, за цілями, горизонтом і контролем ризику',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте ключову відмінність трейдингу від інвестування',
          text: 'Трейдинг це заробіток на різниці цін на короткому відрізку, а інвестиції це купівля активу надовго; в інвестицій є прибавкова вартість, у трейдингу лише різниця цін.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Підберіть ціль і горизонт під себе',
          text: 'Трейдер працює в короткому горизонті заради регулярного доходу і це щоденна професія, а інвестор грає вдовгу заради захисту й зростання капіталу.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Побудуйте контроль ризику під свій підхід',
          text: 'У трейдингу захист механічний, стоп у кожній угоді й малий ризик; в інвестиціях працюють диверсифікація й довгий горизонт, і там і там заробляє контроль ризику, а не вгадування.',
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
      name: 'Глосарій трейдингу',
      description: 'Основні терміни біржової торгівлі',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Трейдинг',
          description:
            'Діяльність з купівлі та продажу фінансових інструментів з метою отримання прибутку від зміни їхньої вартості',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер, що автоматично закриває позицію при досягненні заданого рівня збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Технічний аналіз',
          description:
            'Метод прогнозування цін на основі вивчення графіків та історичних даних про рух котирувань',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description:
            'Метод оцінки вартості активів на основі економічних показників, новин та фінансових звітів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Волатильність',
          description:
            'Міра мінливості ціни активу, що показує амплітуду коливань котирувань за певний період',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність активу швидко продаватися або купуватися без суттєвого впливу на його ціну',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між ціною купівлі (ask) та ціною продажу (bid) фінансового інструменту',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Скальпінг',
          description:
            'Стиль торгівлі з безліччю короткострокових угод, спрямований на отримання невеликого прибутку з кожної операції',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свінг-трейдинг',
          description:
            'Стиль торгівлі з утриманням позицій від кількох днів до тижнів для захоплення середньострокових цінових рухів',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Диверсифікація',
          description:
            'Розподіл капіталу між різними активами для зниження загального ризику інвестиційного портфеля',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
