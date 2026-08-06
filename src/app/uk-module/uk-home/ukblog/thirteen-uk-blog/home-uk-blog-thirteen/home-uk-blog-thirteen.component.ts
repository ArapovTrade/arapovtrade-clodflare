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
  selector: 'app-home-uk-blog-thirteen',
  templateUrl: './home-uk-blog-thirteen.component.html',
  styleUrl: './home-uk-blog-thirteen.component.scss',
})
export class HomeUkBlogThirteenComponent implements OnInit {
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
      'Безстрокові ф’ючерси та маржинальна торгівля в крипті | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Що таке безстрокові ф’ючерси, кредитне плече та маржинальна торгівля в крипті, до чого тут фандинг і чому велике плече веде до ліквідації.',
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
            'Безстрокові фʼючерси і маржа в крипті: що це, фандинг і як не зловити ліквідацію',
          description:
            'Що таке безстрокові ф’ючерси, кредитне плече та маржинальна торгівля в крипті, до чого тут фандинг і чому велике плече веде до ліквідації.',
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
            '@id':
              'https://arapov.trade/uk/freestudying/crypto-perpetuals-margin',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/crypto-perpetuals-margin.png',
            width: 1200,
            height: 630,
          },
          articleSection: 'Криптовалюта',
          keywords:
            'безстрокові фʼючерси, перпетуал, фандинг, кредитне плече, маржа, ліквідація, криптовалюти',
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
          name: 'Що таке безстроковий фʼючерс простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це контракт на ціну активу без дати експірації, який можна тримати скільки завгодно. У звичайного фʼючерса є строк, до якого його ціна сходиться зі спотом, а в безстрокового строку немає, і поряд зі спотом його тримає фандинг. Торгують такі контракти з плечем, тому головний ризик тут не сам інструмент, а розмір плеча.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке фандинг (funding rate)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фандинг це періодичні виплати між трейдерами, найчастіше кожні вісім годин. Коли перпетуал торгується дорожче спота, лонги платять шортам, коли дешевше, навпаки. Це не комісія біржі, а розрахунок між самими сторонами, який тримає ціну контракту поряд з ринком.',
          },
        },
        {
          '@type': 'Question',
          name: 'За якою ціною настає ліквідація?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Залежить від плеча. Грубо, при плечі x100 вистачає руху близько одного відсотка проти вас, при x50 близько двох, при x20 близько пʼяти. Що вище плече, то ближче рівень ліквідації до ціни входу і то легше вибити позицію звичайною ринковою хитавицею.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чим відрізняється ізольована і крос-маржа?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'При ізольованій маржі під ризиком тільки застава конкретної позиції, і ліквідація зачепить лише її. При крос-маржі заставою служить весь баланс рахунку, і одна невдала угода здатна потягти за собою все. Новачку безпечніша ізольована: вона обмежує втрату однією угодою.',
          },
        },
        {
          '@type': 'Question',
          name: 'Яке плече використовувати новачку?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Що менше, то далі рівень ліквідації і то спокійніше переживаються звичайні коливання. Високе плече не підвищує шанс заробити, воно лише присуває ліквідацію впритул до входу. Я тримаю плече низьким і ризик на угоду невеликим, у районі одного-двох відсотків від депозиту, і завжди зі стопом.',
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
      '@id':
        'https://arapov.trade/uk/freestudying/crypto-perpetuals-margin#howto',
      name: 'Як розібратись і застосувати: безстрокові фʼючерси і маржа в крипті та як не зловити ліквідацію',
      description:
        'Покроковий розбір теми та її практичне застосування в торгівлі',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, що таке безстроковий фʼючерс і чому в нього немає строку',
          text: 'Безстроковий фʼючерс — це похідний контракт на актив без дати експірації, який трейдер може утримувати необмежений час.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Розберіться, як фандинг тримає ціну перпетуала поряд зі спотом',
          text: 'Фандинг — це періодичні виплати між сторонами угоди, які біржа розраховує кілька разів на день, найчастіше кожні вісім годин, а на частині бірж і частіше.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Зрозумійте, як маржа і плече множать і прибуток, і збиток',
          text: 'Маржинальна торгівля це угоди на позикові кошти біржі, де ваші власні гроші служать заставою, її й називають маржею.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Навчіться рахувати ліквідацію і тримати її на відстані',
          text: 'Ліквідація — це примусове закриття позиції біржею, коли застави перестає вистачати для підтримання відкритої угоди з плечем.',
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
          name: 'Безстроковий фʼючерс',
          description:
            'Безстроковий фʼючерс — це похідний контракт на актив без дати експірації, який трейдер може утримувати необмежений час.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Фандинг',
          description:
            'Фандинг — це періодичні виплати між сторонами угоди, які біржа розраховує кілька разів на день, найчастіше кожні вісім годин.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідація',
          description:
            'Ліквідація — це примусове закриття позиції біржею, коли застави перестає вистачати для підтримання відкритої угоди з плечем.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
