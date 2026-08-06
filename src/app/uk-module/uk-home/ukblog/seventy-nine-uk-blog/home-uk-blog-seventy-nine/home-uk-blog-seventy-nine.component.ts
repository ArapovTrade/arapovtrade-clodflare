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
  selector: 'app-home-uk-blog-seventy-nine',
  templateUrl: './home-uk-blog-seventy-nine.component.html',
  styleUrl: './home-uk-blog-seventy-nine.component.scss',
})
export class HomeUkBlogSeventyNineComponent {
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
      'Психологія усереднення в трейдингу: пастка для початківців | Arapov.trade',
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Психологія усереднення в трейдингу: чому ця стратегія небезпечна, які психологічні пастки змушують трейдерів усереднювати та як уникнути втрати депозиту.',
    });

    this.meta.updateTag({ name: 'datePublished', content: '2025-04-10' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/psychologyofaveraging.webp',
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
          headline:
            'Психологія усереднення в трейдингу: пастка для початківців',
          description:
            'Психологія усереднення в трейдингу: чому ця стратегія небезпечна та як уникнути втрати депозиту.',
          image:
            'https://arapov.trade/assets/img/content/psychologyofaveraging.webp',
          datePublished: '2025-04-15T00:00:00Z',
          dateModified: '2026-04-15T00:00:00Z',
          author: {
            '@id': 'https://arapov.trade/ru#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/psychologyofaveraging',
          },
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
      '@id': 'https://arapov.trade/ru#person',
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
      url: 'https://arapov.trade/ru',
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
          name: 'Що таке усереднення в трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Усереднення — це докупівля активу при падінні ціни для зниження середньої ціни входу. Трейдер сподівається, що при розвороті ринку зможе вийти з меншими збитками або прибутком.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому усереднення небезпечне?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Усереднення збільшує обсяг позиції та потенційні збитки. Ринок може падати довше, ніж у трейдера вистачить капіталу, що призводить до повної втрати депозиту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які психологічні причини штовхають на усереднення?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Основні причини: страх визнати помилку, надія на розворот, ілюзія контролю, бажання відігратися та ефект неповернутих витрат.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як уникнути усереднення?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Використовуйте стоп-лоси, обмежуйте ризик на угоду до 1-2%, дотримуйтесь торгового плану та приймайте збитки як частину трейдингу.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що робити замість усереднення?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Фіксуйте збитки за стоп-лосом, торгуйте за трендом, ведіть торговий щоденник та шукайте нові точки входу замість нарощування збиткових позицій.',
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
      name: 'Як позбутися звички усереднювати',
      description:
        'Покроковий план подолання психологічної пастки усереднення в трейдингу.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Прийміть збитки як норму',
          text: 'Усвідомте, що збиткові угоди — частина трейдингу. Фіксація невеликого збитку краще нарощування позиції в надії на розворот.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Встановіть стоп-лос',
          text: 'Перед входом визначте рівень виходу при збитку та не переносіть його. Стоп-лос захищає від катастрофічних втрат.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Обмежте ризик на угоду',
          text: 'Ризикуйте не більше 1-2% депозиту на одну угоду. Це виключає необхідність усереднення для порятунку позиції.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Ведіть торговий щоденник',
          text: 'Записуйте всі угоди та емоції. Аналіз виявить патерни, що штовхають на усереднення, та допоможе їх усунути.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Торгуйте за трендом',
          text: 'Слідуйте напрямку ринку замість спроб ловити розвороти. Це знижує ймовірність потрапляння в глибокі просадки.',
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
      name: 'Глосарій термінів усереднення',
      description:
        'Ключові терміни психології трейдингу та управління ризиками',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Усереднення',
          description:
            'Докупівля активу при падінні ціни для зниження середньої ціни входу',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Просадка',
          description: 'Зниження вартості торгового рахунку від максимуму',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стоп-лос',
          description:
            'Ордер автоматичного закриття позиції при досягненні заданого збитку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Маржин-кол',
          description:
            'Примусове закриття позицій при нестачі коштів на рахунку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Аверсія до втрат',
          description:
            'Психологічна схильність уникати втрат сильніше, ніж прагнути до прибутку',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ілюзія контролю',
          description:
            'Хибне відчуття впливу на результат подій через свої дії',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ефект неповернутих витрат',
          description: 'Схильність продовжувати дію через вже вкладені ресурси',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Ризик-менеджмент',
          description: 'Система управління ризиками в торгівлі',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Торговий план',
          description:
            'Документ з правилами входу, виходу та управління капіталом',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Тільт',
          description: 'Емоційний стан, що веде до імпульсивних рішень',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
