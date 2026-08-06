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
  selector: 'app-home-uk-blog-sixty-six',
  templateUrl: './home-uk-blog-sixty-six.component.html',
  styleUrl: './home-uk-blog-sixty-six.component.scss',
})
export class HomeUkBlogSixtySixComponent {
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
      'Об`ємний Аналіз у Трейдингу: Рівні Об`єму та Точки Входу | Ігор Арапов',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Об`ємний аналіз у трейдингу: як знаходити рівні максимального об`єму, використовувати Volume Profile та POC для точних входів. Повний посібник з прикладами.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-02-11' }); this.meta.updateTag({ name: 'dateModified', content: '2026-06-04' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/peakvolumelevels.webp',
    });

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
          '@id':
            'https://arapov.trade/uk/freestudying/peakvolumelevels#article',
          headline: "Об'ємний Аналіз у Трейдингу: Рівні Об'єму та Точки Входу",
          description:
            "Об'ємний аналіз у трейдингу: як знаходити рівні максимального об'єму, використовувати Volume Profile та POC для точних входів.",
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/peakvolumelevels1.png',
            width: 1200,
            height: 630,
          },
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            '@id': 'https://arapov.trade/#organization',
          },
          datePublished: '2024-01-15T10:00:00+00:00',
          dateModified: '2026-06-04T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/peakvolumelevels',
          },
          articleSection: 'Навчання трейдингу',
          keywords: [
            "об'ємний аналіз",
            "рівні об'єму",
            'Volume Profile',
            'POC',
            'Point of Control',
            'трейдинг',
            'Smart Money',
          ],
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
        'https://t.me/ArapovTrade'
      ],
       jobTitle: ['Незалежний дослідник', 'трейдер', 'автор і засновник arapov.trade'],
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
      '@id': 'https://arapov.trade/uk/freestudying/peakvolumelevels#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Що таке об'ємний аналіз у трейдингу?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Об'ємний аналіз — це методика вивчення ринкової активності через кількість укладених угод на різних цінових рівнях. Він дозволяє бачити, де великі гравці накопичували або розподіляли позиції, формуючи ключові зони підтримки та опору.",
          },
        },
        {
          '@type': 'Question',
          name: 'Як Volume Profile допомагає у торгівлі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Volume Profile візуалізує розподіл торгового об'єму за ціновими рівнями, а не за часом. Це дозволяє трейдеру побачити, на яких саме цінах відбувалася найбільша активність, і використовувати ці рівні для планування угод.",
          },
        },
        {
          '@type': 'Question',
          name: 'Що означає POC у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "POC (Point of Control) — це ціновий рівень з найбільшим торговим об'ємом за обраний період. Він відображає справедливу ціну активу та часто слугує магнітом для ціни, виступаючи як сильна підтримка або опір.",
          },
        },
        {
          '@type': 'Question',
          name: "Чи працює об'ємний аналіз на форексі?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: "На форексі немає централізованого об'єму, але тикові дані та об'єми від окремих брокерів дають корисну інформацію. Для точнішого аналізу трейдери використовують ф'ючерси на валюти, де об'єм біржовий.",
          },
        },
        {
          '@type': 'Question',
          name: 'Які платформи підтримують Volume Profile?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Volume Profile доступний у TradingView, ATAS, Sierra Chart, Ninja Trader та інших професійних платформах. Більшість із них пропонують безкоштовні версії з базовим функціоналом об'ємного аналізу.",
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
      '@id': 'https://arapov.trade/uk/freestudying/peakvolumelevels#howto',
      name: "Як використовувати об'ємний аналіз для пошуку точок входу",
      description:
        "Покрокова інструкція з аналізу ринкових об'ємів для визначення оптимальних точок входу в угоду",

      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Налаштуйте Volume Profile',
          text: 'Відкрийте графік та додайте індикатор Volume Profile. Оберіть тип профілю: сесійний для інтрадею, фіксований для аналізу конкретного діапазону.',
          image:
            'https://arapov.trade/assets/img/content/peakvolumelevels1.png',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Знайдіть POC та Value Area',
          text: "Визначте рівень максимального об'єму (POC) та межі Value Area — зони, де пройшло 70% усіх торгів.",
          image:
            'https://arapov.trade/assets/img/content/peakvolumelevels2.webp',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Оцініть контекст ринку',
          text: 'Визначте, чи перебуває ринок у тренді або в консолідації. У тренді шукайте відкати до POC, у флеті — торгуйте від меж Value Area.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Аналізуйте реакцію ціни',
          text: "Спостерігайте за поведінкою ціни біля об'ємних рівнів. Відскок підтверджує рівень, пробій з об'ємом — продовження руху.",
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Відкрийте позицію з чітким планом',
          text: "Входьте в угоду з визначеним стоп-лоссом за найближчим об'ємним рівнем та тейк-профітом на наступному значущому рівні.",
          image:
            'https://arapov.trade/assets/img/content/peakvolumelevels3.png',
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
      '@id': 'https://arapov.trade/uk/freestudying/peakvolumelevels#glossary',
      name: "Глосарій об'ємного аналізу",
      description: "Основні терміни об'ємного аналізу для трейдерів",
      inLanguage: 'uk',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Volume Profile',
          description:
            "Індикатор розподілу торгового об'єму за ціновими рівнями.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Point of Control (POC)',
          description:
            "Ціновий рівень з максимальним об'ємом торгів за період.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area',
          description: "Ціновий діапазон, де пройшло 70% торгового об'єму.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area High (VAH)',
          description: 'Верхня межа зони вартості, рівень опору.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Value Area Low (VAL)',
          description: 'Нижня межа зони вартості, рівень підтримки.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Delta Volume',
          description: "Різниця між об'ємом покупок та продажів.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Footprint Charts',
          description: "Кластерні графіки розподілу об'ємів всередині свічки.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Smart Money',
          description: 'Великі інституційні учасники ринку.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Market Profile',
          description: "Метод аналізу розподілу часу та об'єму за цінами.",
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ліквідність',
          description: 'Скупчення ордерів на певному ціновому рівні.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
