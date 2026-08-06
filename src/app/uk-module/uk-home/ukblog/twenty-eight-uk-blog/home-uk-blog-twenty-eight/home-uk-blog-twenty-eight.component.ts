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
  selector: 'app-home-uk-blog-twenty-eight',
  templateUrl: './home-uk-blog-twenty-eight.component.html',
  styleUrl: './home-uk-blog-twenty-eight.component.scss',
})
export class HomeUkBlogTwentyEightComponent implements OnInit {
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
    this.titleService.setTitle('Фундаментальний аналіз ринку | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Основи фундаментального аналізу: економічні показники, ставки центробанків, новини і як вони впливають на ринок та валютні курси.',
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
          headline:
            'Фундаментальний аналіз у трейдингу: повний гайд з макро, ставок і новин',
          description:
            'Основи фундаментального аналізу: економічні показники, ставки центробанків, новини і як вони впливають на ринок та валютні курси.',
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
            '@id': 'https://arapov.trade/uk/freestudying/fundamental-analysis',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/fundamentalanalysis.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Фундаментальний аналіз',
          keywords:
            'фундаментальний аналіз, економічні фактори, макроекономічні індикатори, ВВП, PMI, інфляція, ключова ставка, ФРС, економічний календар, торгівля на новинах, обʼємний аналіз',
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
          name: 'Що таке фундаментальний аналіз простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це оцінка активу через економіку, ставки й звітність, щоб зрозуміти його справедливу вартість. Дешевше за справедливу ціну актив вважають недооціненим, дорожче переоціненим. Для довгострокового інвестора це сильний інструмент, а трейдеру він відповідає на питання чому рухається ціна, але не на питання коли входити.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які економічні фактори рухають ринок?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ставки центральних банків, інфляція, зайнятість, торговий баланс, ділова активність PMI, ціни на сировину й золото, а також геополітика. Найсильніше на валюти впливає ставка, бо вона задає вартість грошей в економіці.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що показує PMI і чому важлива позначка 50?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PMI це індекс ділової активності з опитувань менеджерів із закупівель. Позначка 50 це вододіл: вище неї економіка розширюється, нижче стискається. Показник випереджальний, тому ринок реагує на нього жвавіше, ніж на запізнілий ВВП.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як ставка ФРС впливає на долар і ризикові активи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Підвищення ставки дорожчає гроші, зазвичай зміцнює долар і тисне на акції та крипту. Зниження здешевлює гроші, послаблює долар і підтримує ризикові активи й золото. Від рішення до реальної реакції економіки тягнеться лаг, як правило понад пів року.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи варто торгувати на виході економічних новин?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У моєму досвіді в сам момент виходу лізти не варто: спред розширюється, ціну кидає в обидва боки, а подвійний викид збирає стопи навіть за правильно вгаданим напрямком. Розумніше знати про релізи заздалегідь, перечекати сплеск і ввійти вже за реакцією ціни на рівні.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що використовувати замість фундаментального аналізу для входу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Обʼємний аналіз. Фундаментал тримають як фон і напрямок вітру, а вхід беруть за обсягом і реакцією ціни біля сильних рівнів, де видно слід великого капіталу. Принцип простий: спершу побачити дію на графіку, потім увійти, а не вгадувати новину заздалегідь.',
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
      '@id': 'https://arapov.trade/uk/freestudying/fundamental-analysis#howto',
      name: 'Як трейдеру працювати з фундаментальним аналізом',
      description:
        'Покроковий розбір макроекономіки для трейдера: від розуміння факторів та індикаторів до роботи з календарем і входу за обсягом замість новини',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, що фундаментал відповідає на чому, а не на коли',
          text: 'Фундаментальний аналіз оцінює справедливу вартість активу через економіку й ставки, відповідаючи на питання чому рухається ціна, але не коли входити.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Знайте, які фактори рухають ринки',
          text: 'Ринки рухають ставки центральних банків, інфляція, зайнятість, торговий баланс, ділова активність, сировина, золото й геополітика.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Читайте ключові індикатори: ВВП, PMI, інфляцію, зайнятість',
          text: 'Головні індикатори це ВВП як загальне зростання, PMI як ділова активність, інфляція й дані по зайнятості.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Слідкуйте за ставкою й рішеннями центральних банків',
          text: 'Ключова ставка центрального банку це найсильніший фундаментальний важіль для долара й ризикових активів.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Використовуйте економічний календар захисно',
          text: 'Економічний календар потрібен насамперед щоб не потрапити зненацька й не відкрити угоду прямо перед сильною новиною.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Входьте за обсягом біля рівня, а не за самою новиною',
          text: 'Вхід вигідніше брати за обсягом і реакцією ціни біля сильного рівня, після того як стало видно дію великого капіталу.',
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
      name: 'Глосарій термінів статті',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Фундаментальний аналіз',
          description:
            'Це метод оцінки активу через вивчення економічних і фінансових факторів: ставок центробанків, інфляції, звітності компаній і стану галузі.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ВВП',
          description:
            'Це сумарна вартість усіх товарів і послуг, що країна виробила за період, і головна мірка розміру й зростання економіки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ключова ставка',
          description:
            'Це відсоток, під який центральний банк кредитує комерційні банки, головний важіль управління вартістю грошей в економіці.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ФРС',
          description:
            'Це Федеральна резервна система, центральний банк Сполучених Штатів, який керує грошовою політикою країни через відсоткову ставку й кількість грошей в економіці.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Економічний календар',
          description:
            'Це таблиця майбутніх економічних подій із датою, часом і ступенем їхньої важливості, де по кожній події показують прогноз, минуле значення й фактичний результат.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торгівля на новинах',
          description:
            'Це стиль торгівлі, за якого трейдер намагається заробити на різкому русі ціни в момент виходу важливої економічної новини.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
