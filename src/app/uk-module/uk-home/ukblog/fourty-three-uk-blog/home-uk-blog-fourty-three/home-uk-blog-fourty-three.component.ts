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
  selector: 'app-home-uk-blog-fourty-three',
  templateUrl: './home-uk-blog-fourty-three.component.html',
  styleUrl: './home-uk-blog-fourty-three.component.scss',
})
export class HomeUkBlogFourtyThreeComponent implements OnInit {
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
      'Торгова система: як побудувати та оптимізувати | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке торгова система, з чого вона складається, як її зібрати, протестувати та оптимізувати, не підганяючи під історію.',
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
          headline: 'Торгова система з нуля: план, бектест і щоденник трейдера',
          description:
            'Що таке торгова система, з чого вона складається, як її зібрати, протестувати та оптимізувати, не підганяючи під історію.',
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
            '@id': 'https://arapov.trade/uk/freestudying/trading-system',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/tradingsystem.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Торгові системи',
          keywords:
            'торгова система, торговий план, бектест, щоденник трейдера, перевірка стратегії, демо-рахунок, управління ризиком',
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
          name: 'Що таке торгова система простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це набір заздалегідь заданих правил: коли входити в угоду, коли виходити і яким ризиком ризикувати. Її завдання зробити середній результат на дистанції позитивним і прибрати хаотичні рішення на емоціях. Без системи торгівля перетворюється на орлянку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим торговий план відрізняється від системи?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Система це сам метод і сигнал входу. План це ваші особисті правила навколо неї: який ризик на угоду, що торгуєте, а що пропускаєте, коли в ринок краще взагалі не входити. Система відповідає на питання як, план на питання як саме ви себе поводите.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як перевірити торгову систему перед реальними грошима?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Спершу бектест на історії, потім перевірка вперед. Прожену правила по минулих даних, потім обовʼязково на нових даних, яких система не бачила, на демо чи маленькому реальному рахунку. Дистанція близько сотні угод показує реальну перевагу з урахуванням витрат.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке переоптимізація в бектесті?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це підгонка параметрів стратегії під історію до ідеальної кривої. У підсумку стратегія описує минуле, а не знаходить робочу перевагу, і на нових даних розсипається. Чим точніше вона сидить на історії, тим гірше зазвичай працює далі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Навіщо потрібен щоденник трейдера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Щоб бачити свої повторювані помилки збоку й прибирати їх. Памʼять ненадійна: вдалі угоди памʼятаються, провальні забуваються. Щоденник прибирає цей самообман і показує реальну статистику, якщо записувати причину входу та емоції, а не лише результат.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яка торгова система краща?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У моєму досвіді найпростіша з тих, що дають перевагу. Чим більше в системі умов і фільтрів, тим важче їй слідувати. Робоча, але дотримувана система завжди бʼє ідеальну, але кинуту при першому тиску ринку.',
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
      '@id': 'https://arapov.trade/uk/freestudying/trading-system#howto',
      name: 'Як зібрати й перевірити торгову систему',
      description:
        'Покроковий розбір: від розуміння, навіщо потрібна система, до її складу, плану, бектесту, перевірки вперед і щоденника трейдера',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, навіщо потрібна торгова система',
          text: 'Торгова система це заздалегідь задані правила входу, виходу й ризику, які роблять середній результат на дистанції позитивним.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Зберіть систему з входу, виходу й управління ризиком',
          text: 'Робоча система збирається з умови входу, умов виходу й правил управління ризиком.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Запишіть особисті правила в торговий план',
          text: 'Торговий план це письмові особисті правила навколо системи: ризик, дисципліна і те, що ви торгуєте, а що пропускаєте.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Перевірте систему бектестом без підгонки',
          text: 'Бектест проганяє правила по минулій історії, а захист від підгонки це розділення даних на настроювальну й перевірочну частини.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Зробіть перевірку вперед на демо',
          text: 'Після бектесту систему перевіряють вперед на нових даних і близько сотні угод, краще спершу на демо-рахунку.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Ведіть щоденник трейдера й розбирайте помилки',
          text: 'Щоденник трейдера на дистанції вскриває повторювані помилки, які памʼять сама ховає.',
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
          name: 'Торгова система',
          description:
            'Це сукупність заздалегідь заданих правил, які визначають, за яких умов відкривати й закривати угоду і скільки при цьому ризикувати.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий план',
          description:
            'Це письмовий набір правил, за якими ви торгуєте: які інструменти, за яких умов, де вхід, де стоп, де ціль і який ризик.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Бектест',
          description:
            'Це перевірка торгової стратегії на історичних даних ринку з метою оцінити, чи був у неї прибуток у минулому і наскільки стабільно вона працювала.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Щоденник трейдера',
          description:
            'Це структуровані записи всіх здійснених угод із зазначенням причин входу й виходу, результату та емоційного стану, які допомагають знаходити й виправляти повторювані помилки.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
