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
  selector: 'app-home-uk-blog-thirty-nine',
  templateUrl: './home-uk-blog-thirty-nine.component.html',
  styleUrl: './home-uk-blog-thirty-nine.component.scss',
})
export class HomeUkBlogThirtyNineComponent implements OnInit {
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
      'Управління ризиками в трейдингу | Arapov.trade',
    );

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    this.meta.updateTag({
      name: 'description',
      content:
        'Управління ризиками і капіталом: розмір позиції, ризик на угоду, стоп-лосс і чому саме ризик-менеджмент зберігає депозит на дистанції.',
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
            'Ризик-менеджмент у трейдингу: як зберегти капітал і не злити депозит',
          description:
            'Управління ризиками і капіталом: розмір позиції, ризик на угоду, стоп-лосс і чому саме ризик-менеджмент зберігає депозит на дистанції.',
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
            '@id': 'https://arapov.trade/uk/freestudying/risk-management',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/capitalmanagement.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Ризик-менеджмент',
          keywords:
            'ризик-менеджмент, управління капіталом, розмір позиції, лот, стоп-лос, співвідношення ризик/прибуток, математичне сподівання, просадка, складний відсоток',
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
          name: 'Що таке ризик-менеджмент у трейдингу простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Правила про те, скільки ставити в угоду і де з неї виходити, щоб смуга збитків не обнулила рахунок. Половин дві: ризик-менеджмент малим ризиком і стопом охороняє депозит, а мані-менеджмент через розрахунок обсягу і роботу з прибутком його піднімає. Без першої друга втрачає сенс.',
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки відсотків депозиту можна ризикувати в одній угоді?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Один-два відсотки рахунку на угоду. Винна дисперсія: мінуси приходять серіями по пʼять-десять поспіль навіть у робочій системі. На десяти відсотках ризику така серія зносить депозит, на відсотку-двох лише трохи просаджує, і торгівля йде далі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як розрахувати розмір позиції і лот під ризик?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Від ризику і стопа, а не на око. Грошовий ризик ділять на стоп у пунктах і множать на ціну пункта. Наприклад, ризик двісті доларів, стоп пʼятдесят пунктів, пункт десять доларів виводять на 0,4 лота. Ризик і стоп фіксують першими, лот рахують останнім.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому співвідношення 1:2 вважається мінімумом?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'На 1:2 досить вигравати близько третини угод, щоб лишатися в плюсі, а третину перемог узяти до снаги. Тримати більше половини стабільно майже ніхто не вміє, тому 1:1 для більшості збиткове. На 1:3 вистачає вже й чверті вдалих входів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Навіщо потрібен стоп-лос, якщо він фіксує збиток?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стоп це не збиток, а заздалегідь оплачене право продовжувати торгувати. Маленький плановий мінус дешевший за завислу збиткову позицію, що зʼїдає місяці роботи. Тому його й ставлять одразу при вході, не зсуваючи в бік збитку, як і фіксований ризик на угоду.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що важливіше: точний вхід чи захист капіталу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У моєму підході захист капіталу. Через дисперсію збитки йдуть смугами, і при великому ризику навіть тямуща система гасне раніше, ніж відіграє своє. Управління ризиком тримає рахунок надійніше, ніж влучність окремо взятого входу.',
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
      '@id': 'https://arapov.trade/uk/freestudying/risk-management#howto',
      name: 'Як вибудувати ризик-менеджмент і управління капіталом',
      description:
        'Покроковий розбір управління капіталом: від вибору ризику на угоду до розрахунку обсягу, стопа, співвідношення і математичного сподівання системи',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Розберіться, з чого складається управління капіталом',
          text: 'Управління капіталом це набір правил, які визначають частку рахунку в кожній угоді і бережуть депозит від втрат.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Зрозумійте, чому втрачає більшість',
          text: 'Депозит найчастіше вбиває завищений ризик без системи на тлі відʼємного математичного сподівання ринку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Тримайте ризик один-два відсотки на угоду',
          text: 'Ризик один-два відсотки депозиту на угоду обирають не з обережності, а через дисперсію.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Розрахуйте розмір позиції і лот від ризику і стопа',
          text: 'Обсяг позиції не вгадують, його виводять з грошового ризику і відстані до стопа.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ставте стоп-лос одразу при вході',
          text: 'Стоп це не втрата, а заздалегідь оплачене право лишитися в грі.',
        },
        {
          '@type': 'HowToStep',
          position: 6,
          name: 'Закладайте співвідношення ризик/прибуток від 1:2 і перевіряйте сподівання',
          text: 'Співвідношення ризик/прибуток це важіль, яким ви виводите математичне сподівання з мінуса в плюс.',
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
          name: 'Управління капіталом',
          description:
            'Набір правил, які визначають частку рахунку в кожній угоді і бережуть депозит від втрат.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дисперсія',
          description:
            'Нерівномірність, з якою збиткові угоди розподіляються в часі: вони йдуть не по одній, а серіями.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Лот',
          description:
            'Стандартизована одиниця обсягу угоди, яка задає, якою кількістю активу ви торгуєте в одній позиції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Співвідношення ризик/прибуток',
          description:
            'Відношення того, чим ви ризикуєте в угоді, до того, що розраховуєте на ній заробити.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Математичне сподівання',
          description: 'Середній результат однієї угоди на довгій дистанції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Складний відсоток',
          description:
            'Нарахування доходу не тільки на вкладений капітал, а й на вже накопичений прибуток.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
