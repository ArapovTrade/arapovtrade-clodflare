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
  selector: 'app-home-uk-twenty-four',
  templateUrl: './home-uk-twenty-four.component.html',
  styleUrl: './home-uk-twenty-four.component.scss',
})
export class HomeUkTwentyFourComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
    private artickleServ: ArticlesService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
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
      'Рівні Фібоначчі у трейдингу: повний посібник | ArapovTrade'
    );
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({
      name: 'description',
      content:
        'Дізнайтеся, як використовувати рівні Фібоначчі у трейдингу. Корекція, розширення, золотий перетин — побудова, стратегії та практичні приклади.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-04-18' });this.meta.updateTag({ name: 'dateModified', content: '2026-04-15' });
    this.meta.updateTag({
      property: 'og:image',
      content: '/assets/img/content/economicstate.webp',
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
        () => Math.random() - 0.5
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
      a.titleUkr.toLowerCase().includes(this.searchQuery.toLowerCase())
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
      (a) => a.linkUkr == path
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
      (a) => a.linkUkr == path
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
      'script[type="application/ld+json"]'
    );

    scripts.forEach((script) => {
      try {
        const json = JSON.parse(script.textContent || '{}');

        // Массив, объект-граф или одиночный объект
        const candidates =
          json['@graph'] ?? (Array.isArray(json) ? json : [json]);

        const shouldRemove = candidates.some(
          (entry: any) =>
            entry['@type'] && typesToRemove.includes(entry['@type'])
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
            'Рівні Фібоначчі у трейдингу: повний посібник із застосування',
          description:
            'Детальний посібник з рівнів Фібоначчі. Корекційні рівні (23.6%, 38.2%, 50%, 61.8%, 78.6%), розширення, стратегії торгівлі та практичні приклади на реальних ринках.',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'ArapovTrade',
            url: 'https://arapov.trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-04-15T00:00:00Z',
         dateModified: '2026-04-15T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/fibonaccilevels',
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://arapov.trade/assets/img/content/economicstate.webp',
            width: 1200,
            height: 630,
          },
          articleSection: 'Технічний аналіз',
          keywords:
            'рівні Фібоначчі, корекція, розширення, золотий перетин, трейдинг',
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
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Що таке рівні Фібоначчі у трейдингу?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рівні Фібоначчі — це інструмент технічного аналізу, заснований на математичній послідовності чисел Фібоначчі. Ключові рівні (23.6%, 38.2%, 50%, 61.8%, 78.6%) використовуються для визначення зон підтримки та опору, прогнозування глибини корекцій та пошуку точок входу в ринок.',
          },
        },
        {
          '@type': 'Question',
          name: 'Який рівень Фібоначчі найважливіший?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рівень 61.8%, відомий як золотий перетин, вважається найбільш значущим. Він часто виступає сильною зоною підтримки або опору. Також важливі рівні 50% (психологічний) та 38.2% (перша значуща корекція). Вибір рівня залежить від сили тренду та ринкового контексту.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як правильно побудувати рівні Фібоначчі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Для побудови рівнів Фібоначчі оберіть значущі екстремуми — локальний максимум та мінімум цінового руху. У висхідному тренді протягніть інструмент від мінімуму до максимуму, у низхідному — від максимуму до мінімуму. Платформа автоматично розрахує та відобразить корекційні рівні.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що таке розширення Фібоначчі?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Розширення Фібоначчі використовуються для визначення цілей руху ціни після пробою ключових рівнів. Основні рівні розширення: 127.2% (перша ціль), 161.8% (ключова ціль для фіксації прибутку), 261.8% та 423.6% (для високоволатильних ринків). Вони допомагають встановлювати тейк-профіти.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чому рівні Фібоначчі працюють?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Рівні Фібоначчі працюють завдяки масовому використанню трейдерами, що створює ефект самоздійснюваного пророцтва. Багато учасників ринку розміщують ордери на цих рівнях, посилюючи їх значущість. Також числа Фібоначчі відображають природні пропорції, що зустрічаються в природі та ринкових структурах.',
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
      name: 'Як торгувати за рівнями Фібоначчі',
      description:
        'Покроковий посібник із застосування рівнів Фібоначчі для прибуткової торгівлі на фінансових ринках.',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Визначте тренд та значущі екстремуми',
          text: 'Знайдіть чіткий імпульсний рух на графіку. Визначте локальний мінімум та максимум цього руху. Для висхідного тренду це буде swing low та swing high, для низхідного — навпаки.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Побудуйте рівні корекції Фібоначчі',
          text: 'Оберіть інструмент Fibonacci Retracement на торговій платформі. У висхідному тренді протягніть лінію від мінімуму до максимуму. Платформа автоматично відобразить рівні 23.6%, 38.2%, 50%, 61.8% та 78.6%.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Дочекайтеся корекції до ключового рівня',
          text: 'Спостерігайте за відкатом ціни до рівнів Фібоначчі. Найбільш значущі зони для входу — 38.2%, 50% та 61.8%. Рівень 61.8% (золотий перетин) вважається оптимальним для входу в напрямку тренду.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Підтвердіть сигнал додатковими інструментами',
          text: 'Шукайте підтвердження: свічкові патерни (пін-бар, поглинання), збіг з горизонтальними рівнями або ковзними середніми, сигнали індикаторів RSI або MACD. Кластер кількох факторів посилює сигнал.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Встановіть стоп-лосс та ціль прибутку',
          text: 'Розмістіть стоп-лосс за рівнем 78.6% або за локальним екстремумом. Використовуйте рівні розширення Фібоначчі (161.8%, 261.8%) для визначення цілей прибутку. Співвідношення ризику до прибутку має бути мінімум 1:2.',
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
      name: 'Глосарій термінів рівнів Фібоначчі',
      description:
        "Основні терміни та визначення, пов'язані з рівнями Фібоначчі в технічному аналізі",
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Послідовність Фібоначчі',
          description:
            'Математична послідовність чисел (0, 1, 1, 2, 3, 5, 8, 13...), де кожне число є сумою двох попередніх. Співвідношення між числами формують ключові рівні.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Золотий перетин (61.8%)',
          description:
            'Ключовий рівень корекції Фібоначчі, що отримується діленням числа на наступне в послідовності. Вважається найбільш значущим рівнем підтримки та опору.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Корекція Фібоначчі (Retracement)',
          description:
            'Інструмент для визначення потенційних рівнів відкату ціни після імпульсного руху. Основні рівні: 23.6%, 38.2%, 50%, 61.8%, 78.6%.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Розширення Фібоначчі (Extension)',
          description:
            'Інструмент для прогнозування цілей руху ціни після пробою. Основні рівні: 127.2%, 161.8%, 261.8%, 423.6%.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень 38.2%',
          description:
            'Перший значущий рівень корекції, часто використовуваний для входу в сильних трендах. Неглибокий відкат вказує на силу основного руху.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень 50%',
          description:
            'Психологічно важливий рівень, хоча не є частиною послідовності Фібоначчі. Ціна часто відкочується на половину попереднього руху.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Рівень 78.6%',
          description:
            'Глибокий рівень корекції, після якого висока ймовірність розвороту тренду. Використовується для розміщення стоп-лосів.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Кластер рівнів',
          description:
            'Зона, де декілька технічних рівнів збігаються (Фібоначчі, горизонтальні рівні, ковзні середні), посилюючи значущість даної області.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Імпульсний рух',
          description:
            'Сильний спрямований рух ціни, від якого будуються рівні Фібоначчі для визначення потенційних зон корекції.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Хибний пробій рівня',
          description:
            'Ситуація, коли ціна тимчасово пробиває рівень Фібоначчі, але потім повертається, створюючи пастку для трейдерів.',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
