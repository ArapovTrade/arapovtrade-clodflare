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
  selector: 'app-home-uk-blog-fifty-six',
  templateUrl: './home-uk-blog-fifty-six.component.html',
  styleUrl: './home-uk-blog-fifty-six.component.scss',
})
export class HomeUkBlogFiftySixComponent implements OnInit {
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
    this.titleService.setTitle('Стратегія пробою рівня | Arapov.trade');
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Як торгувати пробій рівня: визначення ключових зон, підтвердження обсягом, хибні пробої і де ставити стоп. Стратегія для новачків і профі.',
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
            'Пробій рівня: як відрізнити справжній від хибного і де входити',
          description:
            'Як торгувати пробій рівня: визначення ключових зон, підтвердження обсягом, хибні пробої і де ставити стоп. Стратегія для новачків і профі.',
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
            '@id': 'https://arapov.trade/uk/freestudying/breakout-strategy',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/breakout-strategy.jpeg',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технічний аналіз',
          keywords:
            'пробій рівня, хибний пробій, ретест, обсяг, підтримка та опір, стоп-лосс',
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
          name: 'Що таке пробій рівня простими словами?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Це момент, коли ціна проходить крізь зону підтримки або опору, яку до цього багато разів не могла подолати. Але сам вихід за рівень ще нічого не означає: крупний капітал часто спершу вибиває чужі стопи хибним рухом, а вже потім іде по-справжньому.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як відрізнити справжній пробій від хибного?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Головний фільтр це обсяг. Справжній пробій майже завжди йде зі зростанням обсягу, а вихід за рівень на млявому обсязі це перший дзвіночок хибного руху. Додайте перевірку закріплення за рівнем і розворотний сигнал на ретесті, наприклад пін-бар.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому ціна повертається після пробою?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Бо часто це не пробій, а збір ліквідності великим гравцем. За очевидним рівнем стоять стопи й ордери натовпу. Ціну заводять туди, вибивають ці ордери, і проти них крупний капітал спокійно набирає позицію за вигідною ціною, а потім розвертає ринок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Де ставити стоп при торгівлі пробою?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'За екстремум відкату або прокола, тобто за найдальшу точку руху, плюс невеликий запас на спред. Так стоп короткий і логічний: повернення ціни туди скасовує сценарій. Ціль ставлять на наступному імпульсному рівні, що дає співвідношення ризику до прибутку від 1:2.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна входити прямо в момент пробою?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'За моїм досвідом ні. У момент пробою волатильність висока, і легко влетіти на хибному русі. Стійкіше дочекатися ретесту, тобто відкату до пробитого рівня, і пін-бара на зрослому обсязі, і тільки тоді входити в напрямі пробою з коротким стопом.',
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
      '@id': 'https://arapov.trade/uk/freestudying/breakout-strategy#howto',
      name: 'Як торгувати пробій рівня',
      description:
        'Покроковий розбір пробою рівня: як відрізнити справжній від хибного і як входити на ретесті',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Зрозумійте, що таке пробій і що рівень це зона',
          text: 'Пробій рівня це момент, коли ціна проходить крізь зону підтримки або опору, яку до цього багато разів не могла подолати.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Відрізняйте справжній пробій від хибного за обсягом',
          text: 'Фільтр це обсяг: справжній пробій майже завжди йде зі зростанням обсягу, хибний його позбавлений.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Прочитайте хибний пробій як збір ліквідності',
          text: 'Хибний пробій крупний капітал влаштовує, щоб зібрати стопи натовпу і набрати проти них свою позицію.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Входьте не на пробої, а на ретесті з пін-баром',
          text: 'Вхід роблять не в момент пробою, а на ретесті, тобто на відкаті до пробитого рівня з розворотним сигналом.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Ставте короткий стоп і рахуйте співвідношення ризику',
          text: 'Стоп ставлять за екстремум відкату або прокола, а ціль на наступному імпульсному рівні.',
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
          name: 'Пробій рівня',
          description:
            'Момент, коли ціна проходить крізь зону підтримки або опору, яку до цього багато разів не могла подолати.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій',
          description:
            'Короткочасний вихід ціни за значущий рівень зі швидким поверненням назад, що створює оманливе враження нового тренду.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ретест',
          description:
            'Повторний підхід ціни до щойно пробитого рівня, який служить точкою входу в напрямі пробою.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
