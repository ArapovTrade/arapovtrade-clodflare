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
  selector: 'app-home-uk-blog-thirty-eight',
  templateUrl: './home-uk-blog-thirty-eight.component.html',
  styleUrl: './home-uk-blog-thirty-eight.component.scss',
})
export class HomeUkBlogThirtyEightComponent implements OnInit {
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
      'Проп-трейдинг: що це і як пройти челендж | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке проп-трейдинг, як влаштований челендж проп-фірми, її правила, виплати та підводні камені торгівлі на чужому капіталі.',
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
          headline: 'Проп-трейдинг: що це таке і як пройти челендж проп-фірми',
          description:
            'Що таке проп-трейдинг, як влаштований челендж проп-фірми, її правила, виплати та підводні камені торгівлі на чужому капіталі.',
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
            '@id': 'https://arapov.trade/uk/freestudying/prop-trading',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/prop-trading.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Трейдинг для початківців',
          keywords: 'проп-трейдинг',
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
          name: 'Що таке проп-трейдинг простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Ви ведете угоди на капітал проп-фірми, а не на свій, і ділите з нею прибуток. Доступ до цього капіталу відкривається після платного відбору, челенджу, де треба набрати цільовий прибуток і не пробити ліміти просадки. Своя прибуткова система при цьому все одно обов'язкова: чужий капітал її не замінює.",
          },
        },
        {
          '@type': 'Question',
          name: 'Скільки коштує челендж проп-фірми і чи можна пройти його безкоштовно?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Участь платна, найчастіше це кілька сотень доларів за спробу залежно від розміру рахунку. Безкоштовно пройти відбір у справжніх фірм не можна: внесок і є їхній фільтр та частина бізнес-моделі. Якщо вам обіцяють капітал без жодної перевірки, це привід насторожитися.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому більшість зливає челендж?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Не через погані входи, а через порушення лімітів: пробивають денну втрату або загальну просадку, бо підвищують ризик після прибутку й намагаються відігратися після збитку. Челендж проходить дисципліна й контроль ризику, а не вгадування ринку.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке funded-акаунт і чим він відрізняється від челенджу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Funded-акаунт це рахунок, який ви отримуєте вже після успішного челенджу і з якого можна виводити свою частку прибутку. Челендж це іспит, funded це робота: ліміти просадки нікуди не діваються, і порушення правил так само легко відбирає фінансування, як і на відборі.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи варто початківцю йти в проп чи краще торгувати на своєму депозиті?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Якщо прибуткової системи ще немає, проп нічого не вирішить: ви просто заплатите за челендж і зіллєте його тими самими помилками. Спершу має сенс вийти в плюс на невеликому своєму рахунку, а проп підключати як спосіб масштабувати вже працюючий підхід, а не як спосіб його знайти.',
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
      '@id': 'https://arapov.trade/uk/freestudying/prop-trading#howto',
      name: 'Як розібратися й застосовувати: проп-трейдинг і як пройти челендж проп-фірми',
      description:
        'Покроковий розбір теми та її практичне застосування в торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Розберіться, що таке проп-трейдинг і звідки у фірми капітал',
          text: 'Проп-трейдинг це модель, при якій трейдер торгує грошима проп-фірми і ділить з нею підсумковий прибуток у погодженій пропорції.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Зрозумійте правила челенджу: денний ліміт, загальна просадка і ризик на угоду',
          text: 'Челендж проходить не точність входів, а контроль ризику: головне не пробити денну втрату або загальну просадку.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дізнайтеся, як працює funded-акаунт, виплати і сплит прибутку',
          text: 'Funded-акаунт це рахунок після челенджу, з якого виводять частку прибутку.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Вирішіть, іти в проп чи торгувати на своєму депозиті',
          text: 'Проп масштабує вже працюючу систему, але не створює її: без прибуткового підходу туди рано.',
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
          name: 'Проп-трейдинг',
          description:
            'Модель, при якій трейдер веде угоди на гроші проп-фірми і ділить з нею підсумковий прибуток у погодженій пропорції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Проп-челендж',
          description:
            'Платний відбір, на якому трейдер має набрати цільовий прибуток і не пробити встановлені ліміти просадки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Funded-акаунт',
          description:
            'Фінансований рахунок, який трейдер отримує після успішного челенджу і з якого вже можна виводити свою частку прибутку.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
