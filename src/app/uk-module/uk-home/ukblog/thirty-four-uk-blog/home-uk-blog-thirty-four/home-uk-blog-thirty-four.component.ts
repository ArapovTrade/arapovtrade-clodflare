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
  selector: 'app-home-uk-blog-thirty-four',
  templateUrl: './home-uk-blog-thirty-four.component.html',
  styleUrl: './home-uk-blog-thirty-four.component.scss',
})
export class HomeUkBlogThirtyFourComponent implements OnInit {
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
    this.titleService.setTitle('Види ордерів на біржі | Arapov.trade');

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Види ордерів на біржі: ринковий, лімітний, стоп і стоп-лімітний. Чим відрізняються, коли застосовувати і як вони виконуються.',
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
          headline: 'Ордери на біржі: усі типи заявок і як їх застосовувати',
          description:
            'Види ордерів на біржі: ринковий, лімітний, стоп і стоп-лімітний. Чим відрізняються, коли застосовувати і як вони виконуються.',
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
            '@id': 'https://arapov.trade/uk/freestudying/order-types',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/ordertypes.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Біржа',
          keywords:
            'ордери, види ордерів, ринковий ордер, лімітний ордер, стоп-ордер, стоп-лімітний, стоп-лосс, трейлінг-стоп, айсберг, алгоритмічні ордери',
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
          name: 'Чим ринковий ордер відрізняється від лімітного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ринковий виконується миттєво за будь-якою доступною ціною, ви отримуєте швидкість, але платите спред і можливе прослизання. Лімітний виконується тільки за вашою ціною або кращою і дає контроль, проте його виконання не гарантоване: ціна може до нього й не дійти.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке стоп-ордер і як він рухає ціну?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це відкладена заявка, що спить до свого рівня, а на дотику стоп-ціни перетворюється на ринкову. Коли спрацьовує скупчення таких ордерів, усі вони разом виливаються в ринок і штовхають ціну далі в той самий бік, тому зони стопів служать паливом для різких рухів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Де правильно ставити стоп-лосс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Не на круглому числі і не впритул до входу, а за структурним рівнем із запасом, там, де сценарій угоди вважається зламаним. Уже від цієї відстані рахують обсяг, ризикуючи близько одного-двох відсотків депозиту на угоду, а не підбираючи розмір першим.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим стоп-лімітний ордер відрізняється від стоп-маркета?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп-маркет на спрацюванні стає ринковим і виконується завжди, але за доступною ціною, іноді з прослизанням. Стоп-лімітний виставляє лімітну заявку і контролює ціну, але може не виконатися, якщо ринок проскочить її. Один гарантує вихід, інший ціну, тому на захист депозиту я беру стоп-маркет.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому ринок вибиває мій стоп-лосс?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Найчастіше тому, що він стоїть в очевидному місці, де скупчуються стопи натовпу, під круглим числом або прямо за явним рівнем. Там лежить ліквідність, і ціну іноді спеціально заганяють туди хибним проколом. Стоп із запасом за рівнем знижує шанс потрапити під такий винос.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке айсберг-ордер і як читати крупного гравця за обсягом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Айсберг це велика заявка, нарізана на видимі порції, у якої в склянці стирчить лише верхівка, а основний обсяг прихований. Склянку можна підробити, а обсяг фіксує вже виконані угоди, тому крупний капітал надійніше шукати за сплеском обсягу без руху ціни на сильному рівні.',
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
      '@id': 'https://arapov.trade/uk/freestudying/order-types#howto',
      name: 'Як розібратися в типах біржових ордерів',
      description:
        'Покроковий розбір усіх видів заявок: від ринкового і лімітного до стоп-лосса, трейлінг-стопа та прихованих ордерів крупного капіталу',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Розберіться, що таке ордер і які вони бувають',
          text: 'Ордер це команда брокеру купити або продати актив на заданих умовах: ринковий виконується одразу, лімітний за вашою ціною, стоп спрацьовує за тригером.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Порівняйте ринковий і лімітний ордер',
          text: 'Ринковий дає швидкість ціною прослизання і сам рухає ціну на обсязі, а лімітний дає контроль ціни, і саме ним працює крупний капітал.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Опануйте стоп-ордер і стоп-лімітний',
          text: 'Стоп-ордер спить до рівня і стає ринковим, а стоп-лімітний контролює ціну, але ризикує не виконатися в різкому русі.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ставте стоп-лосс за структурним рівнем',
          text: 'Захисний стоп ставлять за структурним рівнем із запасом і від нього рахують обсяг при ризику близько одного-двох відсотків депозиту.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Не віддавайте стоп туди, де його тримає натовп',
          text: 'Стопи натовпу скупчуються за очевидними рівнями і стають ліквідністю для крупного капіталу, тому свій стоп ховають із запасом.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Читайте крупного капіталу за обсягом, а не за склянкою',
          text: 'Айсберг і алгоритмічні заявки ховають реальний розмір у склянці, але обсяг підробити не можна, тому крупного шукають за сплеском обсягу на рівні.',
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
          name: 'Ордер',
          description:
            'Заявка брокеру на купівлю або продаж активу за певними правилами; від виду ордера залежить ціна і швидкість виконання.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ринковий ордер',
          description:
            'Розпорядження брокеру негайно купити або продати актив за найкращою доступною в цей момент ціною.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-ордер',
          description:
            'Відкладена заявка із заданою стоп-ціною, що до спрацювання спить, а на дотику рівня перетворюється на ринковий ордер.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лімітний ордер',
          description:
            'Відкладена заявка з двох цін: стоп-ціна вмикає ордер, а ліміт-ціна виставляє лімітну заявку, що виконується тільки за вашою ціною або кращою.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лосс',
          description:
            'Захисний ордер, який автоматично закриває позицію при досягненні ціною заздалегідь установленого рівня збитку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Трейлінг-стоп',
          description:
            'Рухомий стоп-лосс, який підтягується слідом за ціною в міру руху угоди в плюс і захищає вже набраний прибуток.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Айсберг-ордер',
          description:
            'Велика біржова заявка, розкладена на низку дрібних, у якої в склянці видно лише малу частку, а основний обсяг прихований.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Алгоритмічні ордери',
          description:
            'Великі заявки, що виконуються за заданим алгоритмом і ріжуться на частини, щоб купити чи продати великий обсяг, не показавши ринку справжній розмір.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
