import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../../../servises/articles.service';

import { ThemeservService } from '../../../../../servises/themeserv.service';
import { artickle } from '../../../../../servises/articles.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-uk-blog-onehundred-two',
  templateUrl: './home-uk-blog-onehundred-two.component.html',
  styleUrl: './home-uk-blog-onehundred-two.component.scss',
})
export class HomeUkBlogOnehundredTwoComponent implements OnInit {
  constructor(
    private meta: Meta,
    private titleService: Title,
    private artickleServ: ArticlesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private themeService: ThemeservService,
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
      'Смуги Боллінджера | Повний посібник з індикатора'
    );
    this.meta.updateTag({
      name: 'description',
      content:
        'Смуги Боллінджера: повний посібник з індикатора. Налаштування, стратегії торгівлі, стиснення та розширення смуг, пробої та відскоки.',
    });
    this.meta.updateTag({ name: 'datePublished', content: '2025-01-30' });

  this.meta.updateTag({ name: 'dateModified', content: '2026-06-04' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

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
          headline: 'Смуги Боллінджера: Повний посібник з торгівлі',
          description:
            'Смуги Боллінджера: повний посібник з індикатора. Налаштування, стратегії торгівлі, стиснення та розширення смуг, пробої та відскоки.',
          image: 'https://arapov.trade/assets/img/content/bollingerbands1.jpg',
          author: {
            '@id': 'https://arapov.trade/uk#person',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Pair Trade',
            logo: {
              '@type': 'ImageObject',
              url: 'https://arapov.trade/assets/img/favicon.ico',
            },
          },
          datePublished: '2025-06-25T00:00:00+02:00',
          dateModified: '2026-06-04T00:00:00Z',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://arapov.trade/uk/freestudying/bollingerbands',
          },
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
          name: 'Що таке смуги Боллінджера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Смуги Боллінджера — це індикатор волатильності, що складається з трьох ліній: середньої (SMA 20), верхньої та нижньої смуг, розташованих на відстані двох стандартних відхилень від середньої. Розроблений Джоном Боллінджером у 1980-х роках.',
          },
        },
        {
          '@type': 'Question',
          name: 'Які стандартні налаштування смуг Боллінджера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стандартні налаштування: період SMA — 20, множник стандартного відхилення — 2. Для короткострокової торгівлі використовують період 10, для довгострокової — 50. Множник 2.5-3 для рідкісніших сигналів.',
          },
        },
        {
          '@type': 'Question',
          name: 'Що означає стиснення смуг Боллінджера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Стиснення (Squeeze) відбувається, коли смуги звужуються до мінімальних значень, вказуючи на низьку волатильність. Це сигнал про майбутній сильний рух ціни, хоча напрямок пробою заздалегідь невідомий.',
          },
        },
        {
          '@type': 'Question',
          name: 'Як торгувати відскоки від смуг Боллінджера?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'У боковому ринку ціна відскакує від верхньої та нижньої смуг. Купівля при дотику нижньої смуги з підтвердженням, продаж при дотику верхньої. Стоп-лос за межами смуги, ціль — середня лінія або протилежна смуга.',
          },
        },
        {
          '@type': 'Question',
          name: 'Чи можна використовувати смуги Боллінджера як рівні підтримки та опору?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Так, смуги виступають динамічними рівнями підтримки та опору. Середня лінія часто слугує підтримкою у висхідному тренді та опором у низхідному. Однак у сильних трендах ціна може рухатися вздовж смуги.',
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
      name: 'Як використовувати смуги Боллінджера в торгівлі',
      description:
        'Покроковий посібник із застосування смуг Боллінджера для пошуку торгових сигналів',
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Додайте індикатор на графік',
          text: 'Відкрийте торгову платформу, виберіть Bollinger Bands зі списку індикаторів. Стандартні налаштування: період 20, відхилення 2. Індикатор відобразиться поверх графіка ціни.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Визначте поточний режим ринку',
          text: 'Оцініть ширину смуг: широкі смуги вказують на високу волатильність і тренд, вузькі — на консолідацію. Це визначає вибір стратегії торгівлі.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Шукайте стиснення смуг',
          text: 'Відстежуйте моменти звуження смуг до мінімуму. Стиснення передує сильному руху. Підготуйтеся до входу у напрямку пробою.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Аналізуйте дотики смуг',
          text: 'Спостерігайте за поведінкою ціни при дотику верхньої або нижньої смуги. У боковику — це зони розвороту, у тренді — можливі точки продовження.',
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Використовуйте середню лінію',
          text: 'Середня лінія (SMA 20) слугує динамічною підтримкою/опором. Відкати до середньої у тренді — потенційні точки входу. Пробій середньої — сигнал зміни настрою.',
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
      name: 'Термінологія смуг Боллінджера',
      description: 'Ключові поняття для розуміння індикатора Bollinger Bands',
      hasDefinedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Смуги Боллінджера',
          description:
            'Індикатор волатильності, що складається із середньої лінії та двох смуг на відстані стандартних відхилень',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Середня смуга',
          description:
            'Проста ковзна середня (зазвичай 20-періодна), центральна лінія індикатора',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Верхня смуга',
          description:
            'Середня лінія плюс два стандартних відхилення, зона потенційної перекупленості',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Нижня смуга',
          description:
            'Середня лінія мінус два стандартних відхилення, зона потенційної перепроданості',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стиснення (Squeeze)',
          description:
            'Звуження смуг, що вказує на низьку волатильність та майбутній сильний рух',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Розширення смуг',
          description:
            'Збільшення відстані між смугами при зростанні волатильності',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Прогулянка смугою',
          description:
            'Рух ціни вздовж верхньої або нижньої смуги у сильному тренді',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Стандартне відхилення',
          description:
            'Статистична міра розкиду цін відносно середнього значення',
        },
      ],
    };

    this.addJsonLdSchema(data);
  }
}
