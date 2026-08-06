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
  selector: 'app-home-uk-blog-fourty-two',
  templateUrl: './home-uk-blog-fourty-two.component.html',
  styleUrl: './home-uk-blog-fourty-two.component.scss',
})
export class HomeUkBlogFourtyTwoComponent implements OnInit {
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
      'Стилі трейдингу: скальпінг, дейтрейдинг, свінг | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Стилі трейдингу простими словами: скальпінг, внутрішньоденна, свінг і позиційна торгівля. Чим відрізняються і кому який стиль підходить.',
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
            'Стилі торгівлі: скальпінг, дейтрейдинг і свінг — що обрати початківцю',
          description:
            'Стилі трейдингу простими словами: скальпінг, внутрішньоденна, свінг і позиційна торгівля. Чим відрізняються і кому який стиль підходить.',
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
            '@id': 'https://arapov.trade/uk/freestudying/trading-styles',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/trading-styles.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Трейдинг для початківців',
          keywords: 'стилі торгівлі, скальпінг, дейтрейдинг, свінг-трейдинг',
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
          name: 'Який стиль торгівлі обрати початківцю?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "За моїм досвідом спокійніше почати зі середньострокового свінгу. Рішення приймаються без поспіху, не треба весь день сидіти біля екрана, а емоцій менше. Швидкий темп б'є по ще не закріпленій дисципліні, і початківець легко скочується в імпульсивну торгівлю. До дейтрейдингу і тим паче скальпінгу розумніше прийти вже підготовленим.",
          },
        },
        {
          '@type': 'Question',
          name: 'Чим скальпінг відрізняється від дейтрейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Темпом і розміром руху. Скальпер сидить на секундах і хвилинах і робить десятки угод заради мікрорухів у пунктах. Дейтрейдер тримає угоду годинами, ловить рух більший і здійснює від однієї до кількох угод на день, але до закриття виходить з усіх позицій.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке свінг-трейдинг простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це стиль, за якого позицію тримають від кількох днів до кількох тижнів і забирають цілий розмах руху, а не кожне дрібне коливання. Працюють на старших таймфреймах, частіше на денному і чотиригодинному графіку, де видно картину, а не шум. Стиль спокійний і підходить зайнятим людям, але потребує терпіння.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому комісія така небезпечна при скальпінгу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Тому що комісія і спред сидять у кожній угоді, а на дрібному русі забирають величезну частку прибутку, аж до половини. Помножте на десятки угод на день, і математичне очікування йде в мінус. Без витрат шанси були б приблизно 50 на 50, але саме вони найчастіше і зливають рахунок скальпера.',
          },
        },
        {
          '@type': 'Question',
          name: 'У чому головний плюс дейтрейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У відсутності нічних ризиків: раз усі позиції закриваються до кінця дня, трейдера не зачіпають нічні розриви ціни і новини, що виходять, поки ринок закритий. Мінус же це високе навантаження на увагу і психіку, бо рішення доводиться приймати швидко і часто протягом усього дня.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим позиційна торгівля відрізняється від свінгу та інвестицій?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Горизонтом і опорою. Свінг це дні й тижні на технічному аналізі, а позиційна торгівля це місяці й роки передусім на фундаменталі. Від інвестицій її відрізняє активність: позиційний трейдер виходить, коли ламається ідея угоди, а не тримає актив безстроково. Часу вона потребує найменше з усіх стилів, але надовго заморожує капітал.',
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
      '@id': 'https://arapov.trade/uk/freestudying/trading-styles#howto',
      name: 'Як розібратися в стилях торгівлі і обрати свій',
      description:
        'Покроковий розбір теми та її практичне застосування в торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Розберіться, які бувають стилі торгівлі',
          text: 'Стилі різняться передусім горизонтом угоди: від секунд у скальпінгу до тижнів у свінгу.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: "Зрозумійте, чому скальпінг з'їдає комісія",
          text: 'На дрібному русі фіксована комісія і спред забирають величезну частку результату, утягуючи очікування нижче нуля.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Порівняйте дейтрейдинг і свінг за навантаженням і часом',
          text: 'Дейтрейдинг закриває день без нічних ризиків, але вантажить психіку, а свінг спокійніший, але потребує терпіння.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Виберіть стиль під себе, почавши зі спокійного',
          text: 'Початківцю спокійніше стартувати зі середньострокового свінгу і прийти до швидкого темпу вже з дисципліною.',
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
          name: 'Скальпінг',
          description:
            'Стиль торгівлі, за якого угода живе секунди або хвилини, а трейдер забирає зовсім дрібний рух ціни в пунктах, здійснюючи за день десятки, а то й сотні угод.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Дейтрейдинг',
          description:
            'Стиль внутрішньоденної торгівлі, за якого трейдер відкриває і закриває всі позиції протягом одного торгового дня, не лишаючи їх на ніч.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Свінг-трейдинг',
          description:
            'Стиль торгівлі, за якого трейдер утримує позиції від кількох днів до кількох тижнів, прагнучи забрати середньостроковий рух ринку від одного розвороту до іншого.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Позиційна торгівля',
          description:
            'Стиль торгівлі з утриманням позицій від кількох місяців до кількох років, що спирається передусім на фундаментал і потребує мінімум часу біля екрана.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Алготрейдинг',
          description:
            'Торгівля за правилами, зашитими в програму, яка виконує угоди автоматично; визначається не горизонтом угоди, а способом виконання.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
