import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-uk-blog-onehundred-eleven',
  templateUrl: './home-uk-blog-onehundred-eleven.component.html',
  styleUrl: './home-uk-blog-onehundred-eleven.component.scss',
})
export class HomeUkBlogOnehundredElevenComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
    // this.setHowToSchema();
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
      'Чому на обвалі біткоїна вибиває стопи | Arapov.trade',
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Каскадні ліквідації, маржин-кол і зняття ліквідності на обвалі біткоїна: чому вибиває стопи і зливаються депозити, кого вилітає першим і як захистити рахунок.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2026-06-11' });

    this.meta.updateTag({ name: 'dateModified', content: '2026-06-11' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

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
          '@id': 'https://arapov.trade/uk/freestudying/bitcoin-crash-stops',
          headline: 'Чому на обвалі біткоїна вибиває стопи',
          description:
            'Каскадні ліквідації, маржин-кол і зняття ліквідності на обвалі біткоїна: чому вибиває стопи і зливаються депозити, кого вилітає першим і як захистити рахунок.',
          image:
            'https://arapov.trade/assets/img/content/bitcoin-crash-stops.png',
          datePublished: '2026-06-11T00:00:00Z',
          dateModified: '2026-06-11T00:00:00Z',

          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
            name: 'Arapov Trade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id':
              'https://arapov.trade/uk/freestudying/bitcoin-crash-stops.png',
          },
          articleSection: 'Навчання трейдингу',
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
      '@id': 'https://arapov.trade/uk/freestudying/spread#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Чому на падінні біткоїна масово вибиває стопи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Перед розворотом ціну часто навмисно проколюють за рівень, де стоять стопи натовпу, щоб зібрати ці заявки. Плюс на плечі просадка швидко доходить до примусового закриття. Тож стопи вибиває масово, а потім ринок нерідко розвертається.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке маржин-кол і ліквідація простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Маржин-кол це сигнал, що застави не вистачає для утримання позиції, і треба поповнити рахунок або скоротити обсяг. Ліквідація це примусове закриття позиції, коли забезпечення згорає. Що більше плече, то ближче обидві події.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому стоп вибиває, а потім ціна йде в мій бік?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: ' Це зняття ліквідності: ринок пірнає за очевидний рівень, збирає стопи натовпу і розвертається. Тому стоп ховають трохи далі рівня, а не впритул до нього, куди цілиться кожен.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який ризик тримати, щоб пережити обвал?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Поширений орієнтир це 1-2 відсотки депозиту на угоду і мінімальне плече. За такого ризику навіть різке падіння  і серія стопів поспіль не обнуляють рахунок. Точну цифру підбирають під свій депозит.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи варто усереднюватися, коли біткоїн  падає?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: ' Усереднення проти падаючого тренду небезпечне: добір у мінус перетворює невеликий збиток на великий, а на плечі веде до ліквідації. Надійніше зафіксувати стоп і  дочекатися реакції ціни на рівні, а не відкуповувати кожен мінус.',
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
      '@id': 'https://arapov.trade/uk/freestudying/spread#howto',
      name: 'Як знизити торгові витрати на спреді',
      description:
        'Покрокове керівництво з мінімізації впливу спреду на результати торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Порівняйте брокерів',
          text: 'Проаналізуйте спреди кількох брокерів на інструментах, що вас цікавлять. Порівнюйте середні значення, а не лише мінімальні.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Оберіть оптимальний час',
          text: 'Торгуйте під час перетину європейської та американської сесій, коли ліквідність максимальна, а спреди мінімальні.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Використовуйте лімітні ордери',
          text: 'Замість ринкових ордерів застосовуйте лімітні для контролю ціни входу та зниження впливу спреду.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підключіть рібейт-програму',
          text: 'Зареєструйтеся в програмі лояльності брокера або рібейт-сервісі для повернення частини торгових витрат.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Уникайте торгівлі на новинах',
          text: 'Відстежуйте економічний календар та не відкривайте позиції безпосередньо перед виходом важливих даних.',
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
      '@id': 'https://arapov.trade/uk/freestudying/spread#glossary',
      name: 'Глосарій термінів зі спреду',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Спред',
          description:
            'Різниця між ціною купівлі (Ask) та ціною продажу (Bid) фінансового інструменту',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Bid',
          description:
            'Ціна попиту — максимальна ціна, за яку покупці готові придбати актив',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ask',
          description:
            'Ціна пропозиції — мінімальна ціна, за яку продавці згодні продати актив',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фіксований спред',
          description:
            'Спред з незмінним значенням незалежно від ринкових умов',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Плаваючий спред',
          description:
            'Спред, що динамічно змінюється залежно від ліквідності та волатильності ринку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рібейт',
          description:
            'Повернення частини спреду або комісії трейдеру за здійснені угоди',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маркетмейкер',
          description:
            'Учасник ринку, що забезпечує ліквідність шляхом постійного котирування цін купівлі та продажу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'ECN-брокер',
          description:
            'Брокер з прямим доступом до міжбанківської ліквідності через електронну комунікаційну мережу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Пункт (піпс)',
          description:
            'Мінімальна зміна ціни валютної пари, зазвичай четвертий знак після коми',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description:
            'Здатність активу швидко продаватися за ціною, близькою до ринкової',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
