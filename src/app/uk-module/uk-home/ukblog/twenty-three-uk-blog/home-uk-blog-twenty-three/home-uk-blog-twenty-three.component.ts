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
  selector: 'app-home-uk-blog-twenty-three',
  templateUrl: './home-uk-blog-twenty-three.component.html',
  styleUrl: './home-uk-blog-twenty-three.component.scss',
})
export class HomeUkBlogTwentyThreeComponent implements OnInit {
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
    this.titleService.setTitle('Об’ємний аналіз ринку | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Як працює об’ємний аналіз ринку: профіль обсягу, кластери, дельта і чому обсяг — первинна причина руху ціни.',
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
          headline: "Об'ємний аналіз ринку: повний гайд із читання об'ємів",
          description:
            'Як працює об’ємний аналіз ринку: профіль обсягу, кластери, дельта і чому обсяг — первинна причина руху ціни.',
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
            '@id': 'https://arapov.trade/uk/freestudying/volume-analysis',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/volmarketanalisys.webp',
            width: 1200,
            height: 630,
          },
          articleSection: "Об'ємний аналіз",
          keywords:
            "об'ємний аналіз, об'єми торгів, зусилля і результат, Вайкофф, Volume Profile, POC, Market Profile, пікові рівні об'єму",
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
          name: "Що таке об'ємний аналіз простими словами?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Це читання ринку за кількістю угод, а не лише за ціною. Об'єм показує, скільки реально торгували за бар. Якщо за рухом ціни стоїть великий об'єм, значить у ринку є гроші, а якщо об'єм сухий, руху вірити небезпечно.",
          },
        },
        {
          '@type': 'Question',
          name: 'Що означає принцип зусилля-результат?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Об'єм це зусилля, рух ціни це результат. Велике зусилля має давати великий рух. Якщо об'єм величезний, а ціна стоїть на місці, значить зустрічна сторона поглинає ринок, і це частий сигнал до розвороту.",
          },
        },
        {
          '@type': 'Question',
          name: "Як об'єм підтверджує тренд?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Зростаючий тренд зі зростаючим об'ємом підтверджений, покупці додають. Якщо ціна зростає, а об'єм падає, інтерес гасне і можлива корекція. Високий об'єм на пробої рівня говорить про те, що пробій справжній.",
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке Volume Profile і POC?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Volume Profile показує, скільки об'єму пройшло на кожному ціновому рівні, а не за час. POC це рівень з максимальним об'ємом, точка найбільшого інтересу учасників. Такі зони часто працюють як сильна підтримка і опір.",
          },
        },
        {
          '@type': 'Question',
          name: "Чому на форексі нема реальних об'ємів?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Форекс це позабіржовий ринок без єдиного центру, тому загальний об'єм угод там не рахується. Доступний лише тиковий об'єм, число змін ціни за час. Він пов'язаний з реальним об'ємом, але з похибкою, тож це орієнтир, а не точні дані.",
          },
        },
        {
          '@type': 'Question',
          name: "Чи можна торгувати тільки за об'ємом?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "З мого досвіду ні. Об'єм не дає сигналів сам по собі, він підтверджує або скасовує те, що видно за рівнями й фазою ринку. Найкраще він працює у зв'язці з рівнями, а не замість них.",
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
      '@id': 'https://arapov.trade/uk/freestudying/volume-analysis#howto',
      name: "Як читати ринок за об'ємом",
      description:
        "Покроковий розбір об'ємного аналізу: від читання зусилля і результату до входу за реакцією ціни",
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: "Зрозумійте, що вимірює об'єм",
          text: "Об'єм це кількість контрактів або лотів, що реально змінили власника за бар, і важливе не саме число, а його динаміка до сусідніх барів.",
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Читайте зусилля і результат',
          text: "Порівнюйте об'єм бара (зусилля) з тим, як далеко пішла ціна (результат): великий об'єм при слабкому ході значить, що хтось великий поглинає потік.",
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: "Визначайте силу тренду за об'ємом",
          text: "Зростаючий тренд на зростаючому об'ємі здоровий, а зростання ціни на падаючому об'ємі сигналить про ослаблення і можливий розворот.",
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Читайте дефіцит попиту і пропозиції',
          text: "Причина падіння це дефіцит попиту, коли великий капітал перестає купувати, а причина зростання дефіцит пропозиції; об'єм-хмарочос на барах показує шлях найменшого опору.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Знаходьте пікові рівні та POC',
          text: "За Volume Profile шукайте ціни з максимальним наторгованим об'ємом, POC і зону вартості, де був активний великий капітал.",
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Читайте зону вартості за Market Profile',
          text: 'Market Profile показує ринок як аукціон: де ціна справедлива, а де дорого чи дешево відносно зони вартості.',
        },
        {
          '@type': 'HowToStep',
          position: 7,
          name: 'Будуйте вхід за реакцією ціни',
          text: 'Розмічайте зони на старшому таймфреймі, а вхід беріть на молодшому, за реакцією ціни на рівні, а не за фактом торкання.',
        },
        {
          '@type': 'HowToStep',
          position: 8,
          name: "Беріть чесний об'єм",
          text: "Реальний об'єм дивіться на біржових ф'ючерсах із клірингом, наприклад на CME, а не тиковий форексний чи мальований крипти.",
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
          name: "Об'ємний аналіз",
          description:
            'Метод читання ринку за кількістю угод, що пройшли за період, а не лише за рухом ціни.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Принцип зусилля і результату',
          description:
            "Правило Вайкоффа, за яким об'єм вважається прикладеним зусиллям, а рух ціни його результатом, і ці дві величини завжди звіряють між собою.",
        },
        {
          '@type': 'DefinedTerm',
          name: "Піковий рівень об'єму",
          description:
            "Ціновий рівень, на якому пройшов максимальний об'єм торгів за вибраний період; там був активний великий капітал, тому він працює як сильна підтримка або опір.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description:
            "Спосіб організації даних про ціну, час і об'єм у вигляді розподілу, який показує, на яких цінах ринок провів найбільше часу і угод.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дефіцит попиту',
          description:
            'Це ситуація, коли великий капітал перестає купувати на поточних цінах і його попит зникає, через що ціну продавлюють решта продавців; дзеркальний дефіцит пропозиції стає причиною зростання.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
